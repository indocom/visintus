const convict = require('convict');
const yaml = require('js-yaml');

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.safeLoad });

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  host: {
    doc: 'Server URL',
    format: '*',
    default: 'http://localhost:3000',
    env: 'HOST'
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },

  db: {
    url: {
      doc: 'Database URL',
      format: '*',
      default: 'mongodb://visintus:visintus@localhost:27017',
      env: 'DB_URL'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'visintus'
    }
  },

  fileStorage: {
    images: {
      doc: 'File storage location for images',
      format: '*',
      default: __dirname + '/../../data/images',
      env: 'IMAGES_STORAGE'
    }
  },

  user: {
    accessTokenExp: {
      doc: 'Expiration time for access token in seconds',
      format: 'int',
      default: 60 * 60 // 1 hour
    },
    refreshTokenExp: {
      doc: 'Expiration time for refresh token in seconds',
      format: 'int',
      default: 60 * 60 * 24 * 5 // 5 days
    },
    resetPasswordTokenExp: {
      doc: 'Expiration time for reset password token in seconds',
      format: 'int',
      default: 60 * 60 * 24 * 2 // 2 days
    }
  },

  crypto: {
    aes128cbc: {
      secret: {
        doc: 'Secret for aes128cbc',
        format: function check(val) {
          if (!/^[a-fA-F0-9]{32}$/.test(val)) {
            throw new Error('Should be a 32 character hex key');
          }
        },
        default: '770A8A65DA156D24EE2A093277530142',
        env: 'CRYPTO_AES128CBC_SECRET'
      }
    }
  },

  jwt: {
    secret: {
      doc: 'Secret to generate JWT',
      format: function check(val) {
        if (!/^[a-fA-F0-9]{64}$/.test(val)) {
          throw new Error('Should be a 64 character hex key');
        }
      },
      default:
        '508cf2a154dfd4e182237f6dcd436b4ea4255d5eea379ee80bd07f6a3ee1039f',
      env: 'JWT_SECRET'
    }
  },

  mailgun: {
    apiKey: {
      doc: 'API key for mailgun',
      format: '*',
      default: '',
      env: 'MAILGUN_API_KEY'
    },
    domain: {
      doc: 'Domain name for mailgun',
      format: '*',
      default: '',
      env: 'MAILGUN_DOMAIN_NAME'
    }
  },

  maildev: {
    host: {
      doc: 'Host name for maildev',
      format: 'ipaddress',
      default: '127.0.0.1'
    },
    port: {
      doc: 'Port number for maildev',
      format: 'port',
      default: 1025
    }
  }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(__dirname + '/environments/' + env + '.yaml');

// Perform validation
config.validate({ allowed: 'strict' });
module.exports = config;
