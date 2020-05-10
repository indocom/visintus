import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '~/context/auth-context';
import { isLoggedIn } from '~/utils/auth-client';

function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const authClient = useAuth();

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    authClient.login(state);
  };

  if (isLoggedIn()) {
    window.location.replace('/');
    return;
  }

  return (
    <div className="container">
      <form className="grey lighten-4" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <input type="submit" value="Login" className="btn z-depth-0" />
      </form>
      <div style={{ height: 20 }} />
      <Link to="/signup">Do not have an account? &nbsp;</Link>
      <Link to="/forgot">Forgot password?</Link>
    </div>
  );
}

export default Login;
