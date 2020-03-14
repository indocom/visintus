const fs = require('fs');
const ejs = require('ejs');
const querystring = require('querystring');

const config = require('../../config');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = __dirname + '/../views/mailers/user_mailer/';

/* Sends registration email */
exports.verifyRegistration = async user => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'verify_registration.ejs',
    'ascii'
  );

  var verificationUrl = config.get('host.frontend') + '/verify';
  verificationUrl +=
    '?' +
    querystring.stringify({
      email: user.email,
      id: user.id
    });

  const data = {
    from: 'PINUS Visit <no-reply@pi-nus.org>',
    to: user.email,
    subject: 'Registration Confirmation',
    html: ejs.render(file, { user, verificationUrl })
  };

  emailer.sendMail(data, (err, info, response) => {
    console.log(err, info, response);
  });
};

/* Sends reset password email */
exports.resetPassword = async (user, token) => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'reset_password.ejs',
    'ascii'
  );

  var resetPasswordUrl = config.get('host.frontend') + '/reset';
  resetPasswordUrl +=
    '?' +
    querystring.stringify({
      email: user.email,
      token
    });

  const data = {
    from: 'PINUS Visit <no-reply@pi-nus.org>',
    to: user.email,
    subject: 'Reset Password Request',
    html: ejs.render(file, { user, resetPasswordUrl })
  };

  emailer.sendMail(data, (err, info, response) => {
    console.log(err, info, response);
  });
};
