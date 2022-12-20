const router = require('express').Router()
const controller = require('../controllers/hello')
const auth = require('../middleware/auth')

module.exports = router

router
  .route('/heartbeat')
  .get(controller.hello)

router
  .route('/resource')
  .all(auth.verifyJWT)
  .get(
    auth.checkJWTPermissions(['read:resource']),
    controller.hello
  )
  .post(
    auth.checkJWTPermissions(['create:resource']),
    controller.hello
  )

router
  .route('/resource/:id')
  .all(auth.verifyJWT)
  .put(
    auth.checkJWTPermissions(['update:resource']),
    controller.hello
  )
  .delete(
    auth.checkJWTPermissions(['delete:resource']),
    controller.hello
  )
