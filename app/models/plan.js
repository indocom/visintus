const mongoose = require('mongoose');
const PlanSchema = require('../../db/schemas/plan');

module.exports = mongoose.model('Plan', PlanSchema);
