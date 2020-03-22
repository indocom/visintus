const Highlight = require('../models/highlight.js');

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

exports.getAllHighlights = async (req, res) => {
  Highlight.find()
    .select('image_url description hyperlink')
    .lean()
    .then(highlights => handleSuccess(res, buildSuccObject(highlights)))
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.createHighlight = async (req, res) => {
  var newHighlight = new Highlight({
    image_url: req.body.highlight.image_url,
    description: req.body.highlight.description,
    hyperlink: req.body.highlight.hyperlink
  });

  newHighlight
    .save()
    .then(highlight =>
      handleSuccess(res, buildSuccObject('New highlight created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updateHighlight = async (req, res) => {
  Highlight.updateOne({ _id: req.params.highlightId }, req.body.highlight)
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Highlight updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'Highlight not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deleteHighlight = async (req, res) => {
  Highlight.deleteOne({ _id: req.params.highlightId })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Highlight deleted'));
      else handleError(res, buildErrObject(422, 'Highlight not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};
