var mongoose = require('mongoose');

var PlanSchema = new mongoose.Schema({
  name: {
    type      : String, 
    required  : true 
  },
  description : String, 
});

module.exports = PlanSchema;
