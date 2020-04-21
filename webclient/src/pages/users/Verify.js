import React from 'react';
import queryString from 'query-string';
import ErrorPage from '../404';

import { client } from '~/utils/client';
import { API_VERIFY } from '~/constants/api-url';

function Verify(props) {
  const { email, id } = queryString.parse(props.location.search);
  const data = {
    user: {
      email,
      verificationId: id
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();

    postVerify(data);
  };

  return email && id ? (
    <div className="container center">
      <div style={{ minHeight: 50 }}></div>
      <h3>You're almost there!</h3>
      <h6>
        We just need to verify your email address before you can book a visit
        with us! <br />
        <br />
        Just smash that button below and BOOM, you're good to go.
      </h6>
      <div style={{ minHeight: 30 }}></div>
      <div className="btn" onClick={handleSubmit}>
        Verify my email!
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
}

function postVerify(data) {
  client(API_VERIFY, {
    body: data,
    redirectTo: '/login',
    showSuccess: true
    // showError: true
  });
}
export default Verify;
