const mongoose = require('mongoose')
const connectionUrl = 'mongodb+srv://reut:1234@cluster0.iiuta.mongodb.net/notes_app?retryWrites=true&w=majority'

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
