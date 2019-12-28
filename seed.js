// Set environment variables
require('dotenv').config()

// Load config data
const config = require('./config/config.js');

const { setupDbConnection } = require('./app/middleware/db');
setupDbConnection(config.get('db'));

require('./db/seeds/development/01_categories');
