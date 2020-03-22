const initState = {
  authError: null,
  isLoggedIn: false,
  token: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        isLoggedIn: true,
        token: action.payload
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authError: null,
        isLoggedIn: false,
        token: null
      };

    case 'LOGOUT_ERROR':
      return {
        ...state,
        authError: 'Logout failed'
      };

    case 'SIGNUP_SUCCESS':
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
