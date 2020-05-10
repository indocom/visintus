import { queryCache } from 'react-query';

import { client, LOCAL_STORAGE_KEY } from './client';
import {
  API_LOGIN,
  API_VERIFY,
  API_RESET_PSWD,
  API_FORGOT_PSWD,
  API_WHOAMI,
  API_REGISTER
} from '~/constants/api-url';
import { LOGIN } from '~/constants/url';
import { ADMIN_ROLE, SUPERADMIN_ROLE } from '~/constants/user-roles';

const roles = [ADMIN_ROLE, SUPERADMIN_ROLE];

function handleUserResponse({ token, ...user }) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);

  // redirect user to homepage
  window.location.replace('/');
  return user;
}

// return either a user object or null
function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client(API_WHOAMI).then(data => data.user);
}

function login({ email, password }) {
  return client(API_LOGIN, { body: { user: { email, password } } }).then(
    handleUserResponse
  );
}

function register({ name, email, password }) {
  return client(API_REGISTER, {
    body: { user: { name, email, password } }
  }).then(handleUserResponse);
}

function logout() {
  queryCache.clear();
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);

  // refreshes the page for the user
  window.location.assign(window.location);
}

function verify(data) {
  client(API_VERIFY, {
    body: data,
    redirectTo: LOGIN,
    showSuccess: true
    // showError: true
  });
}

function reset(data, token) {
  client(API_RESET_PSWD, {
    body: data,
    headers: {
      Authorization: token
    },
    redirectTo: LOGIN,
    showSuccess: true
    // showError: true
  });
}

function forget(email) {
  client(API_FORGOT_PSWD, {
    body: {
      user: { email }
    }
    // showError: true
  });
}

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

function isLoggedIn() {
  return Boolean(getToken());
}

function isAdmin(user) {
  return user && roles.includes(user.role);
}

function isSuperAdmin(user) {
  return user && user.role === SUPERADMIN_ROLE;
}

export {
  login,
  register,
  logout,
  verify,
  reset,
  forget,
  getToken,
  getUser,
  isLoggedIn,
  isAdmin,
  isSuperAdmin
};
