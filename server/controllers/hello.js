const responseFormatter = require('../middleware/responseFormatter')

module.exports = {
  hello
}

function hello (req, res) {
  try {
    const status = 200
    const message = 'Hello from the API server !'
    const data = {
      endpoint: `You hit the ${req.method} ${req.originalUrl} endpoint.`
    }
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  } catch (error) {
    const err = JSON.stringify(error, Object.getOwnPropertyNames(error),null,2)
    console.log('error', err)
    const status = 500
    const message = error.message
    const data = err
    const json = responseFormatter(req, res, { status, message, data })
    res.status(status).json(json)
  }
}