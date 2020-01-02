const mongoose = require('mongoose');
const ForgotPasswordSchema = require('../../db/schemas/forgotPassword');

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);

