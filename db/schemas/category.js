var mongoose = require('mongoose');

var BannerSchema          = require('./banner');
var PlanSchema            = require('./plan');
var RepresentativeSchema  = require('./representative');

var CategorySchema = new mongoose.Schema({
  name: { 
    type      : String, 
    required  : true 
  },
  slug: {
    type      : String,
    required  : true,
    unique    : true
  },
  logo_url        : String,
  description     : String,
  banners         : [ BannerSchema ],
  plans           : [ PlanSchema ],
  representatives : [ RepresentativeSchema ]
});

module.exports = CategorySchema;
