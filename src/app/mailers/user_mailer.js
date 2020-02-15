const fs = require('fs');
const ejs = require('ejs');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = './../views/mailers/user_mailer/';

/* Sends registration email */
exports.verifyRegistration = async user => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'verify_registration.ejs',
    'ascii'
  );

  const subject = 'Registration Confirmation';
  const htmlMessage = ejs.render(file, { user: user });
};

/* Sends reset password email */
exports.resetPassword = async user => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'reset_password.ejs',
    'ascii'
  );

  const subject = 'Reset Password Request';
  const htmlMessage = ejs.render(file, { user: user });
};
