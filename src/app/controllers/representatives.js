const Category = require('../models/category');
const Representative = require('../models/representative');

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

exports.createRepresentative = async (req, res) => {
  var newRepresentative = new Representative({
    name: req.body.representative.name,
    description: req.body.representative.description,
    photo_url: req.body.representative.photo_url
  });

  Category.updateOne(
    { slug: req.params.slug },
    {
      $push: {
        representatives: newRepresentative
      }
    }
  )
    .then(result => {
      if (result.n)
        handleSuccess(res, buildSuccObject('New representative added'));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updateRepresentative = async (req, res) => {
  Category.updateOne(
    {
      slug: req.params.slug,
      'representatives._id': req.params.representativeId
    },
    {
      $set: {
        'representatives.$.name': req.body.representative.name,
        'representatives.$.description': req.body.representative.description,
        'representatives.$.photo_url': req.body.representative.photo_url
      }
    }
  )
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Representative updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'Not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deleteRepresentative = async (req, res) => {
  Category.updateOne(
    { slug: req.params.slug },
    {
      $pull: {
        representatives: { _id: req.params.representativeId }
      }
    }
  )
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Representative removed'));
        else handleError(res, buildErrObject(422, 'Representative not found'));
      } else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};
