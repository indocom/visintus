import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import useMutation from '../hooks/useMutation';
import M from 'materialize-css';

function Verify(props) {
  const [{ response, error }, upsertData] = useMutation();
  const { email, id } = queryString.parse(props.location.search);
  const data = {
    user: {
      email,
      verificationId: id
    }
  };
  const handleSubmit = async e => {
    await upsertData({
      method: 'post',
      endpoint: '/users/verify',
      data,
      needAuthorization: false
    });
    if (!error) {
      M.toast({
        html: `<div>Your email has been verified. Please login again!</div>`,
        classes: 'teal rounded center top'
      });
      props.history.push('/login');
    }
  };

  return (
    <div className="container center">
      <div style={{ minHeight: 50 }}></div>
      <h3>You're almost there!</h3>
      <h6>
        We just need to verify your email address before you can book a visit
        with us! <br />
        Just smash that button below and BOOM, you're good to go.
      </h6>
      <div style={{ minHeight: 30 }}></div>
      <div className="btn" onClick={handleSubmit}>
        Verify my email!
      </div>
    </div>
  );
}

function ResetPassword(props) {
  console.log(props);
  const [newPassword, setNewPassword] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const [{ response, error }, upsertData] = useMutation();
  const { email, token } = queryString.parse(props.location.search);
  console.log(email, token);

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
    }

    await upsertData({
      method: 'post',
      endpoint: '/users/reset-password',
      data,
      auth: token,
      showToast: false
    });

    if (!error) {
      M.toast({
        html: `<div>Your password has changed. Please login again!</div>`,
        classes: 'teal rounded center top'
      });
      setTimeout(() => {
        props.history.push('/login');
      }, 1000);
    }
  };

  return (
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
  );
}

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
      needAuthorization: false,
      showToast: false
    });

    console.log(error);
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

export { Verify, ForgotPassword, ResetPassword };
