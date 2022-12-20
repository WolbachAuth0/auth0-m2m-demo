require('dotenv').config()
const express = require('express')
const app = express()
const { notFound, errorHandler } = require('./controllers/errors')
// middleware ...
app.use(express.json())

// API routes
app.use('/api', require('./routes/hello'))

// handle 404 not found
app.use(notFound)

// handle all other errors
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`)
})

module.exports = app
