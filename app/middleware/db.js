const mongoose = require('mongoose');

const connect = (config) => {
  var uri = config.url + '/' + config.name;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => {
      console.log("*  DB connection: OK\n" + "*".repeat(10) + "\n");
    },
    (error) => {
      console.log("*  Error connecting to DB:\n" + `${error}\n` + "*".repeat(10) + "\n");
    }
  )
}

exports.setupDbConnection = (config) => {
  connect(config);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
  // db.on('disconnected', () => connect(config)); // try to reconnect
}
