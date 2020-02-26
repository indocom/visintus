const initState = {
  authError: null,
  isLoggedIn: false,
  token: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      };

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
        isLoggedIn: true,
        token: action.payload
      };

    case 'LOGOUT_SUCCESS':
      console.log('logout success');
      return {
        ...state,
        authError: null,
        isLoggedIn: false,
        token: null
      };

    case 'LOGOUT_ERROR':
      console.log('logout error');
      return {
        ...state,
        authError: 'Logout failed'
      };

    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
