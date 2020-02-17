const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    accessToken: {
      type: String
    },
    verification: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = UserSchema;
