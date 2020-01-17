const mongoose = require('mongoose');
const UserAccessSchema = require('../../db/schemas/userAccess');

module.exports = mongoose.model('UserAccess', UserAccessSchema);
