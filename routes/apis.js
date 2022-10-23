const express = require('express')
const router = express.Router()
const {
  authenticated,
  authenticatedAdmin,
  isSelfUser,
} = require('../middleware/auth')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')
const analystController = require('../controllers/analyst-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { avatarUpload } = require('../middleware/avatarUpload')

//admin
router.post('/admin/signin', adminController.signIn)
router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)

//analyst
router.get(
  '/analyst/:id/getTemplate',
  authenticated,
  analystController.getTemplate
)
router.post(
  '/analyst/:id/postTemplate',
  authenticated,
  analystController.postTemplate
)

//users
router.get('/get_current_user', authenticated, userController.getCurrentUsers)

router.get('/user/:id', authenticated, userController.getUser)

router.get(
  '/user/:id/getBaat',
  authenticated,
  isSelfUser,
  userController.getBaat
)
router.put(
  '/user/:id',
  authenticated,
  isSelfUser,
  avatarUpload.single('avatar'),
  userController.putUser
)
router.put(
  '/user/:id/passwordEdit',
  authenticated,
  isSelfUser,
  userController.passwordEdit
)
router.post(
  '/user/:id/passwordInputCheck',
  authenticated,
  isSelfUser,
  userController.passwordInputCheck
)
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

//error handle
router.use('/', generalErrorHandler)

module.exports = router
