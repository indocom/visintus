const mongoose = require('mongoose');
const BannerSchema = require('../../db/schemas/banner');

module.exports = mongoose.model('Banner', BannerSchema);
