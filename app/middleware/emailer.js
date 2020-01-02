const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const i18n = require('i18n');
const User = require('../models/user');
const { itemAlreadyExists } = require('../middleware/utils');

/* Sends email */

const sendEmail = async (data, callback) => {
  const auth = {
      
  }
}
