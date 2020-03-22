const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const {
  buildErrObject,
  buildSuccObject,
  handleError
} = require('../middleware/utils');

exports.approve = async (schema, data) => {
  const validate = ajv.compile(schema);
  return new Promise((resolve, reject) => {
    const valid = validate(data);
    if (valid) {
      resolve();
    } else {
      reject(buildErrObject(422, ajv.errorsText(validate.errors)));
    }
  });
};

const OBJECT_ID_REGEX = '^[a-f\\d]{24}$';

exports.regexes = {
  name: "^[\\w ,.'-]+$",
  slug: '^[\\w-]+$',
  safeChars: "^[\\w.~()'!*:@,;+? -]*$",

  bannerId: OBJECT_ID_REGEX,
  highlightId: OBJECT_ID_REGEX,
  planId: OBJECT_ID_REGEX,
  representativeId: OBJECT_ID_REGEX,
  verificationId: OBJECT_ID_REGEX
};
