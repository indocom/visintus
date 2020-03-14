const fs = require('fs');
const ejs = require('ejs');

const config = require('../../config');
const emailer = require('../middleware/emailer');
const emailTemplatesDir = __dirname + '/../views/mailers/application_mailer/';

exports.checkoutItinerary = async (orderInfo, itinerary) => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + 'checkout_itinerary.ejs',
      'ascii'
    );

    for (var i = 0; i < itinerary.length; i++) {
      itinerary[i].link =
        config.get('host.frontend') + '/categories/' + itinerary[i].slug;
    }

    console.log(orderInfo, itinerary);

    const data = {
      from: 'PINUS Visit <no-reply@pi-nus.org>',
      to: orderInfo.email,
      subject: 'Visit Itinerary',
      html: ejs.render(file, { orderInfo, itinerary })
    };

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};
