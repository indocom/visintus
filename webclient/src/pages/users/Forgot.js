import React, { useState } from 'react';
import useMutation from 'hooks/useMutation';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [{ response, error }, upsertData] = useMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    await upsertData({
      method: 'post',
      endpoint: '/users/forgot-password',
      data: { user: { email } },
      needAuthorization: false
    });

    if (!error) {
      setIsActive(true);
    }
  };

  return (
    <div className="container">
      <h5 className="grey-text text-darken-3">Forget Password</h5>
      <form className="grey lighten-4" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <button className="btn z-depth-0">Reset Password</button>
        </div>
      </form>
      <Link to="/signup">Create new account! &nbsp;</Link>
      <div style={{ minHeight: 30 }}></div>
      {isActive && (
        <>
          <div>
            We have sent an email with reset instructions to your registered
            email, if it exists in our database.
          </div>
          <div>
            Didn't receive? &nbsp;
            <span
              onClick={handleSubmit}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Click here
            </span>{' '}
            to resend email!
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
