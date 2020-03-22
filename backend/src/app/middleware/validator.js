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
      resolve(buildSuccObject('Input is valid!'));
    } else {
      reject(buildErrObject(422, ajv.errorsText(validate.errors)));
    }
  });
};

exports.regexes = {
  url:
    '^((http(s){0,1}://){0,1}([a-z|A-Z|0-9|.|-|_]){4,255}(:d{1,5}){0,1}){0,1}((/([a-z|A-Z|0-9|.|-|_]|%[A-F|a-f|0-9]{2}){1,255}){1,255}/{0,1}){0,1}(|/{0,1}?[a-z|A-Z|0-9|.|-|_]{1,255}=([a-z|A-Z|0-9|.|-|_|+|:]|%[A-F|a-f|0-9]{2}|&[a-z|A-Z]{2,12};){0,255}){0,1}((&[a-z|A-Z|0-9|.|-|_]{1,255}=([a-z|A-Z|0-9|.|-|_|+|:]|%[A-F|a-f|0-9]{2}|&[a-z|A-Z]{2,12};){0,255}){0,255})(/{0,1}|#([a-z|A-Z|0-9|.|-|_|+|:]|%[A-F|a-f|0-9]{2}|&[a-z|A-Z]{2,12};){0,255})$',
  slug: '^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?',
  objectID: "^[a-f\\d]{24}$"
};
