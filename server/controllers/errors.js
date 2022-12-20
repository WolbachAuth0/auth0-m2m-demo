const responseFormatter = require('./../middleware/responseFormatter')

module.exports = {
  notFound,
  errorHandler
}

function errorHandler (err, req, res, next) {
  console.log('errorHandler: ', err)
  const status = err.statusCode || 500
  const message = err.message || 'Something Broke!'
  const data = err.error || err
  const json = responseFormatter(req, res, { status, message, data })
  res.status(status).json(json)
}

function notFound (req, res) {
  const status = 404
  const message = 'The requested resource was not found.'
  const data = {}
  const json = responseFormatter(req, res, { status, message, data })
  res.status(status).json(json)
}
