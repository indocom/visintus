var mongoose = require('mongoose');

var HighlightSchema = new mongoose.Schema({
  image_url: { 
    type: String,
    required: true
  },
  description: String,
  hyperlink: String
});

module.exports = HighlightSchema;
