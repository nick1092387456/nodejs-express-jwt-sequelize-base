const express = require('express')
const router = express.Router()
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

//admin
router.post('/admin/signin', adminController.signIn)
router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)

//users
router.get('/get_current_user', authenticated, userController.getCurrentUsers)
router.get('/getUser/:id', authenticated, userController.getUser)
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

//error handle
router.use('/', generalErrorHandler)

module.exports = router
