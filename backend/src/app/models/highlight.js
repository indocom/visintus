const mongoose = require('mongoose');
const HighlightSchema = require('../../db/schemas/highlight');

module.exports = mongoose.model('Highlight', HighlightSchema);
