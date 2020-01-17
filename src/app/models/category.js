const mongoose = require('mongoose');
const CategorySchema = require('../../db/schemas/category');

module.exports = mongoose.model('Category', CategorySchema);
