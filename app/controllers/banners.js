const Category  = require("../models/category");
const Banner    = require("../models/banner");

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

/*********************
 * Private functions *
 *********************/



/********************
 * Public functions *
 ********************/

exports.createBanner = async (req, res) => {
  var newBanner = new Banner({
    image_url: req.body.banner.image_url
  });

  Category.updateOne({ slug: req.params.slug }, {
    $push: {
      banners: newBanner
    }
  })
  .then(result => {
    if (result.n) handleSuccess(res, buildSuccObject('New banner added'));
    else handleError(res, buildErrObject(422, 'Category not found'));
  })
  .catch(error => handleError(res, buildErrObject(422, error.message)));
}

exports.deleteBanner = async (req, res) => {
  Category.updateOne({ slug: req.params.slug }, {
    $pull: {
      banners: { _id: req.params.bannerId }
    }
  })
  .then(result => {
    if (result.n) {
      if (result.nModified) handleSuccess(res, buildSuccObject('Banner removed'));
      else handleError(res,buildErrObject(422, 'Banner not found'));
    }
    else handleError(res, buildErrObject(422, 'Category not found'));
  })
  .catch(error => handleError(res, buildErrObject(422, error.message)));
}
