const mongoose = require('mongoose');
const slugify = require('slugify');

const Category = require('../models/category');

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

exports.createCategory = async (req, res) => {
  var newCategory = new Category({
    name: req.body.category.name,
    slug: slugify(req.body.category.name),
    logo_url: req.body.category.logo_url,
    description: req.body.category.description,
    banners: [],
    plans: [],
    representatives: []
  });

  newCategory
    .save()
    .then(category =>
      handleSuccess(res, buildSuccObject('New category created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updateCategory = async (req, res) => {
  updatedFields = req.body.category;
  updatedFields.slug = slugify(updatedFields.name);

  Category.updateOne({ slug: req.params.slug }, updatedFields)
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Category updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deleteCategory = async (req, res) => {
  Category.deleteOne({ slug: req.params.slug })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Category deleted'));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getCategoryList = async (req, res) => {
  Category.find()
    .select('-_id name slug logo_url')
    .lean()
    .then(categoryList => handleSuccess(res, buildSuccObject(categoryList)))
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getCategoryInfo = async (req, res) => {
  Category.findOne({ slug: req.params.slug })
    .select('-_id name slug logo_url description banners plans representatives')
    .lean()
    .then(category => {
      if (category) handleSuccess(res, buildSuccObject(category));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getPlansInfo = async (req, res) => {
  const categories = req.body.categories;
  const queries = [];

  for (slug in categories) {
    queries.push({
      slug: slug,
      'plans._id': {
        $in: categories[slug].map(id => mongoose.Types.ObjectId(id))
      }
    });
  }

  Category.aggregate([
    { $project: { name: 1, slug: 1, plans: 1 } },
    { $unwind: '$plans' },
    { $match: { $or: queries } },
    {
      $group: {
        _id: '$slug',
        name: { $first: '$name' },
        slug: { $first: '$slug' },
        plans: { $push: '$plans' }
      }
    },
    { $project: { _id: 0 } }
  ])
    .then(result => {
      var resultObj = {};
      result.forEach(element => {
        resultObj[element.slug] = {
          name: element.name,
          plans: element.plans
        };
      });

      handleSuccess(res, buildSuccObject(resultObj));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};
