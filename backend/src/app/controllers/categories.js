const mongoose = require('mongoose');
const slugify = require('slugify');

const Category = require('../models/category');

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

const ApplicationMailer = require('../mailers/application_mailer');

/*********************
 * Private functions *
 *********************/

function convertRequestToMongoQuery(categories) {
  const queries = [];
  for (slug in categories) {
    queries.push({
      slug: slug,
      'plans._id': {
        $in: categories[slug].map(id => mongoose.Types.ObjectId(id))
      }
    });
  }
  return queries;
}

function queryPlanInfos(queries, projection) {
  return Category.aggregate([
    { $project: projection },
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
  ]);
}

/********************
 * Public functions *
 ********************/

exports.createCategory = async (req, res) => {
  const slug = slugify(req.body.category.name, {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true
  });

  var newCategory = new Category({
    name: req.body.category.name,
    slug,
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
    .catch(err => handleError(res, buildErrObject(422, err.message)));
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
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.deleteCategory = async (req, res) => {
  Category.deleteOne({ slug: req.params.slug })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Category deleted'));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getCategoryList = async (req, res) => {
  Category.find()
    .select('-_id name slug logo_url')
    .lean()
    .then(categoryList => handleSuccess(res, buildSuccObject(categoryList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getCategoryInfo = async (req, res) => {
  Category.findOne({ slug: req.params.slug })
    .select('-_id name slug logo_url description banners plans representatives')
    .lean()
    .then(category => {
      if (category) handleSuccess(res, buildSuccObject(category));
      else handleError(res, buildErrObject(422, 'Category not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getPlansInfo = async (req, res) => {
  const queries = convertRequestToMongoQuery(req.body.categories);

  if (queries.length == 0) {
    handleSuccess(res, buildSuccObject({}));
    return;
  }

  queryPlanInfos(queries, { name: 1, slug: 1, plans: 1 })
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
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.checkoutPlans = async (req, res) => {
  const queries = convertRequestToMongoQuery(req.body.categories);

  if (queries.length == 0) {
    handleSuccess(res, buildSuccObject({}));
    return;
  }

  queryPlanInfos(queries, { name: 1, slug: 1, plans: 1 })
    .then(result => {
      ApplicationMailer.checkoutItinerary(req.body.orderInfo, result)
        .then((info, response) => {
          handleSuccess(res, buildSuccObject('Your order has been recorded'));
        })
        .catch(err => handleError(res, buildErrObject(422, err.message)));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};
