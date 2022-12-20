// const checkJWTScopes = require('express-jwt-authz')
const { expressjwt: jwt } = require("express-jwt")
const jwks = require('jwks-rsa')   

// JWT checker
const verifyJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUDIENCE,
  issuer: `https://${process.env.DOMAIN}/`,
  algorithms: ['RS256']
})


function debug (req, res, next) {
  console.log('auth: ', req.auth)
  next()
}

function checkJWTPermissions (expectedScopes) {
  return checkJWTScopes(expectedScopes, { checkAllScopes: true })
}

function checkJWTScopes (expectedScopes, { checkAllScopes = true }) {

  if (!Array.isArray(expectedScopes)) {
    throw new Error(
      'Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)'
    )
  }

  return (req, res, next) => {
    function error(res) {
      return next({
        statusCode: 403,
        error: 'Forbidden',
        message: 'Insufficient scope'
      })
    }

    if (expectedScopes.length === 0) {
      return next()
    }

    let scopes = req.auth.scope

    let allowed = checkAllScopes ?
      expectedScopes.every(scope => scopes.includes(scope)): 
      expectedScopes.some(scope => scopes.includes(scope));
    
    return allowed ? next() : error(res);
  }
}

module.exports = {
  verifyJWT,
  debug,
  checkJWTScopes,
  checkJWTPermissions
}