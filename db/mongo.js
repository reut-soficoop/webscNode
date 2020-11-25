const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const connectionUrl = process.env.DB_URI

function connectToMongo() {
  return mongoose.connect(connectionUrl, { useUnifiedTopology: true,  useNewUrlParser: true})
    .then((client) => {
      console.log('connected to mongo!')
    })
    .catch(error => {
      console.error('couldnt connect to mongo', error)
    })
}

module.exports = {
  connectToMongo,
}
