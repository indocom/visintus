const mongoose = require('mongoose');
const RepresentativeSchema = require('../../db/schemas/representative');

module.exports = mongoose.model('Representative', RepresentativeSchema);
