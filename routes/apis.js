const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')

//admin
router.post(
  '/admin',
  passport.authenticate('local', { session: false }),
  adminController.signIn
)
router.get(
  '/admin',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)


//users
router.get('/users', authenticated, userController.getUsers)

//jwt signin
router.post('/signup', userController.signUp)
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  userController.signIn
)

module.exports = router
