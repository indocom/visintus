import React, { useState } from 'react';
import queryString from 'query-string';
import M from 'materialize-css';

import { reset } from '~/utils/auth-client';

import ErrorPage from '../404';

function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const { email, token } = queryString.parse(props.location.search);

  const data = {
    user: {
      email,
      newPassword
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword !== checkpassword) {
      M.toast({
        html: '<div>Please enter the same password!</div>',
        classes: 'red rounded center top'
      });
      setCheckPassword('');
      setNewPassword('');
      return;
    }

    reset(data, token);
  };

  return email && token ? (
    <div className="container center">
      <div style={{ minHeight: 50 }}></div>
      <form className="grey lighten-4" onSubmit={handleSubmit}>
        <h4>Reset password</h4>
        <div className="input-field">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="checkPassword">Enter again your new password</label>
          <input
            type="password"
            id="checkPassword"
            onChange={e => setCheckPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <button className="btn z-depth-0">Reset Password</button>
        </div>
      </form>
      <div style={{ minHeight: 30 }}></div>
    </div>
  ) : (
    <ErrorPage />
  );
}

export default ResetPassword;
