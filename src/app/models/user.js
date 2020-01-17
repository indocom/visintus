const mongoose = require('mongoose');
const UserSchema = require('../../db/schemas/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const SALT_FACTOR = 5;

const hash = (user, salt, next) => {
  return bcrypt.hash(user.password, salt, (err, newHash) => {
    if (err) return next(error);
    user.password = newHash;
    return next();
  });
};

const genSalt = (user, SALT_FACTOR, next) => {
  return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    return hash(user, salt, next);
  });
};

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  return genSalt(this, SALT_FACTOR, next);
});

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    err ? cb(err) : cb(null, isMatch);
  });
};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
