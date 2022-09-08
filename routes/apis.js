const express = require('express')
const router = express.Router()
// const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')

router.get('/admin/users', adminController.getUsers)
//jwt signin
router.post('/users/signup', userController.signUp)
router.post(
  '/users/signin',
  // passport.authenticate('local', { session: false }),
  userController.signIn
)

module.exports = router
