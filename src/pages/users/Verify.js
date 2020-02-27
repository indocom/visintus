import React from 'react';
import queryString from 'query-string';
import useMutation from '../../hooks/useMutation';

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
      needAuthorization: false,
      successMessage: 'Your email has been verified. Please login again!',
      pushTo: '/login'
    });
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

export default Verify;
