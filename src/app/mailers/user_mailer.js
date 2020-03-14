const fs = require('fs');
const ejs = require('ejs');
const querystring = require('querystring');

const config = require('../../config');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = __dirname + '/../views/mailers/user_mailer/';

/* Sends registration email */
exports.verifyRegistration = async user => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + 'verify_registration.ejs',
      'ascii'
    );

    var verificationUrl =
      config.get('host.frontend') +
      '/verify' +
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
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};

/* Sends reset password email */
exports.resetPassword = async (user, token) => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + 'reset_password.ejs',
      'ascii'
    );

    var resetPasswordUrl =
      config.get('host.frontend') +
      '/reset' +
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
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};
