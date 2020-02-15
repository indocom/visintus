const fs = require('fs');
const ejs = require('ejs');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = './../views/mailers/application_mailer/';

exports.checkoutItinerary = async itinerary => {
  const file = fs.readFileSync(
    emailTemplatesDir + 'checkout_itinerary.ejs',
    'ascii'
  );

  const subject = 'Itinerary Confirmation';
  const htmlMessage = ejs.render(file, { user: user });
};
