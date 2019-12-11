const Category = require("../models/category");
const slugify = require('slugify');

const {
  handleError,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils.js');

/*********************
 * Private functions *
 *********************/



/********************
 * Public functions *
 ********************/

exports.createCategory = async (req, res) => {
  console.log(req.body);

  var authToken = req.body.authToken;

  var newCategory = new Category({
    name            : req.body.category.name,
    slug            : slugify(req.body.category.name),
    logo_url        : req.body.category.logo_url,
    description     : req.body.category.description,
    banners         : [],
    plans           : [],
    representatives : []
  });

  await newCategory.save((err, category) => {
    if (err) return handleError(res, buildErrObject(422, err));
    res.json(buildSuccObject('new category saved!'));
  });
}

exports.updateCategory = async (req, res) => {
  console.log(req.body);

  var authToken = req.body.authToken;


}

exports.deleteCategory = async (req, res) => {
  console.log(req.body);

  var authToken = req.body.authToken;

  var slug = req.params.slug;
  await Category.deleteOne({ slug: slug }, (err) => {
    if (err) return handleError(res, buildErrObject(422, err));
    res.json(buildSuccObject('category deleted!'));
  });
}

exports.getCategoryList = async (req, res) => {
  console.log(req.body);

  await Category.find({}, 'name slug logo_url', (err, categoryList) => {
    if (err) return handleError(res, buildErrObject(422, err));
    res.json(buildSuccObject(categoryList));
  });
}

exports.getCategoryInfo = async (req, res) => {
  console.log(req.body);

  var slug = req.params.slug;
  await Category.findOne({ slug: slug }, (err, category) => {
    if (err) return handleError(res, buildErrObject(422, err));
    res.json(buildSuccObject(category));
  });
}

exports.getPlansInfo = async (req, res) => {
  console.log(req.body);

}
