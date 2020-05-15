import React from 'react';
import { useAuth } from '~/context/auth-context';

function Signup(props) {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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
    authClient.register({
      name: state.firstName + ' ' + state.lastName,
      email: state.email,
      password: state.password
    });
  };

  return (
    <div className="container">
      <form className="grey lighten-4" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>

        <div className="input-field">
          <label htmlFor="firstName">FirstName</label>
          <input type="text" id="firstName" onChange={handleChange} />
        </div>

        <div className="input-field">
          <label htmlFor="lastName">LastName</label>
          <input type="text" id="lastName" onChange={handleChange} />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>

        <input type="submit" value="Sign Up" className="btn z-depth-0" />
      </form>
    </div>
  );
}

export default Signup;
