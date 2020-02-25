const fs = require('fs');
const ejs = require('ejs');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = __dirname + '/../views/mailers/user_mailer/';

/* Sends registration email */
exports.verifyRegistration = async user => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'verify_registration.ejs',
    'ascii'
  );

  console.log(emailTemplatesDir);

  const data = {
    from: 'PINUS <no-reply@pi-nus.org>',
    to: user.email,
    subject: 'Registration Confirmation',
    html: ejs.render(file, { user })
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

  const data = {
    from: 'PINUS <no-reply@pi-nus.org>',
    to: user.email,
    subject: 'Reset Password Request',
    html: ejs.render(file, { user, token })
  };

  emailer.sendMail(data, (err, info, response) => {
    console.log(err, info, response);
  });
};
