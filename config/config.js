var convict = require('convict');
const yaml = require('js-yaml');

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.safeLoad });

var config = convict({
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
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile(__dirname + '/environments/' + env + '.yaml');

// Perform validation
config.validate({allowed: 'strict'});
module.exports = config;
