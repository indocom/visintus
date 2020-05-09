import { queryCache } from 'react-query';

import { client, localStorageKey } from './client';
import {
  API_LOGIN,
  API_VERIFY,
  API_RESET_PSWD,
  API_FORGOT_PSWD,
  API_WHOAMI,
  API_REGISTER
} from '~/constants/api-url';
import { LOGIN } from '~/constants/url';

function handleUserResponse({ token, ...user }) {
  window.localStorage.setItem(localStorageKey, token);
  console.log(user);
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
  localStorage.removeItem(localStorageKey);
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
  return window.localStorage.getItem(localStorageKey);
}

function isLoggedIn() {
  return Boolean(getToken());
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
  isLoggedIn
};
