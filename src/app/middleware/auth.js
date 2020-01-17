const crypto = require('crypto');
const algorithm = 'aes-256-ecb';
const secret = process.env.JWT_SECRET;

const { buildErrObject } = require('../middleware/utils.js');

/* Checks if password matches */
exports.checkPassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      if (!isMatch) {
        resolve(false);
      }
      resolve(true);
    });
  });
};

/* Encrypts text */
exports.encrypt = text => {
  const cipher = crypto.createCipher(algorithm, secret);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

/* Decrypts text */
exports.decrypt = text => {
  const decipher = crypto.createDecipher(algorithm, secret);
  try {
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (err) {
    return err;
  }
};
