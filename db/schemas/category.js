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
    match     : /[a-z0-9-]+/,
    required  : [true, "Slug must be provided with only 'a'-'z', '0'-'9', and '-' characters."]
  },
  logo_url        : String,
  description     : String,
  banners         : [ BannerSchema ],
  plans           : [ PlanSchema ],
  representatives : [ RepresentativeSchema ]
});

module.exports = CategorySchema;
