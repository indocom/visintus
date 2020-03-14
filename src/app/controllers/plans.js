const Category = require('../models/category');
const Plan = require('../models/plan');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

/********************
 * Public functions *
 ********************/

exports.createPlan = async (req, res) => {
  var newPlan = new Plan({
    name: req.body.plan.name,
    description: req.body.plan.description
  });

  Category.updateOne(
    { slug: req.params.slug },
    {
      $push: {
        plans: newPlan
      }
    }
  )
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('New plan added'));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updatePlan = async (req, res) => {
  Category.updateOne(
    { slug: req.params.slug, 'plans._id': req.params.planId },
    {
      $set: {
        'plans.$.name': req.body.plan.name,
        'plans.$.description': req.body.plan.description
      }
    }
  )
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Plan updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'Not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deletePlan = async (req, res) => {
  Category.updateOne(
    { slug: req.params.slug },
    {
      $pull: {
        plans: { _id: req.params.planId }
      }
    }
  )
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Plan removed'));
        else handleError(res, buildErrObject(422, 'Plan not found'));
      } else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};
