const mongoose = require('mongoose');

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', function() {
  console.log('*** MongoDB got connected ***');
  console.log(`Our Current Database Name : ${connection.db.databaseName}`);
  if (process.env.NODE_ENV !== 'PROD') {
    connection.db.dropDatabase(
      console.log(`${connection.db.databaseName} database dropped.`)
    );
  }
});
