var mongoose = require('mongoose');

var BannerSchema = new mongoose.Schema({
  image_url: { 
    type: String,
    required: true
  }
});

module.exports = BannerSchema;
