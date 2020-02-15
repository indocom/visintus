const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const config = require('../../config/config');
const User = require('../models/user');

/* create transporter */
const createTransporter = () => {
  if (config.get('env') === 'production') {
    return nodemailer.createTransport(
      mg({
        auth: {
          api_key: config.get('mailgun.api_key'),
          domain: config.get('mailgun.domain')
        }
      })
    );
  } else {
    return nodemailer.createTransport({
      host: config.get('maildev.host'),
      port: config.get('maildev.port'),
      ignoreTLS: true
    });
  }
};

/* Prepares to send email */
exports.sendMail = (data, callback) => {
  const transporter = createTransporter();

  transporter.sendMail(data, (err, info, response) => {
    if (err) {
    }
    return callback(err, info, response);
  });

  const data = {
    user,
    subject,
    htmlMessage
  };

  sendEmail(data, messageSent => {
    messsageSent
      ? console.log(`Email SENT to: ${user.email}`)
      : console.log(`Email FAILED to: ${user.email}`);
  });
};
