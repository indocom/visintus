const mongoose = require('mongoose')
const validator = require('validator')

const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'EMAIL_IS_NOT_VALID'
    },
    lowercase: true,
    required: true
  },
  verification: {
    type: String
  },
  used: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = ForgotPasswordSchema;
