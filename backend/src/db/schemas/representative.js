var mongoose = require('mongoose');

var RepresentativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  photo_url: String
});

module.exports = RepresentativeSchema;
