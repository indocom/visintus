const mongoose = require('mongoose');
const validator = require('validator');

const UserAccessSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'EMAIL_IS_NOT_VALID'
    }
  }
});

module.exports = UserAccessSchema;
