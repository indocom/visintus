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

  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
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

  mailgun: {
    api_key: {
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
