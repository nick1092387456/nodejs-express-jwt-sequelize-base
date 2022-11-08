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
const coachController = require('../controllers/coach-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { avatarUpload } = require('../middleware/avatarUpload')
const { csvUpload } = require('../middleware/csvUpload')

//admin
router.post('/admin/signin', adminController.signIn)
router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)

//analyst
router.get('/analyst/getTemplate', authenticated, analystController.getTemplate)
router.post(
  '/analyst/putTemplate',
  authenticated,
  analystController.putTemplate
)
router.post(
  '/analyst/:id/uploadTemplate',
  authenticated,
  csvUpload.single('file'),
  analystController.uploadTemplate
)
router.get(
  '/analyst/:id/reviewTemplate',
  authenticated,
  analystController.reviewTemplate
)
router.get(
  '/analyst/downloadTemplate',
  authenticated,
  analystController.downloadTemplate
)
router.post(
  '/analyst/:id/sendSRCForm',
  authenticated,
  analystController.sendSRCForm
)

//coach
router.post(
  '/coach/:id/getTraineesData',
  authenticated,
  coachController.getTraineesData
)
router.get('/coach/:id/getTrainees', authenticated, coachController.getTrainees)
router.post(
  '/coach/:id/toggleStatus',
  authenticated,
  coachController.toggleStatus
)
router.post(
  '/coach/:id/getTraineesFabData',
  authenticated,
  coachController.getTraineesFabData
)

//users
router.get('/getCurrentUser', authenticated, userController.getCurrentUsers)
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
router.get('/getUserRoles', userController.getUserRoles)

//error handle
router.use('/', generalErrorHandler)

module.exports = router
