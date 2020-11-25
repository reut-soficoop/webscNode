const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser')
const notesRouter = require('./routers/notes')
const usersRouter = require('./routers/users')
const publicDirectoryPath = path.join(__dirname, './public')
const {connectToMongo} = require('./db/mongo')

app.use(bodyParser.json())
app.use(express.static(publicDirectoryPath))
// app.use((req, res, next) => {
//   console.log('http request arrived!')
//   next()
// })
// app.use(morgan('combined'))
app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.get('*', (req,res) => res.sendFile(path.join(publicDirectoryPath, './404.html')))

connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}).catch(error => console.log('error!', error))

