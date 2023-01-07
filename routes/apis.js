const express = require('express')
const router = express.Router()
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')
const analystController = require('../controllers/analyst-controller')
const coachController = require('../controllers/coach-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { avatarUpload } = require('../middleware/avatarUpload')
const { csvUpload } = require('../middleware/csvUpload')
// const { userFileUpload } = require('../middleware/userFileUpload')

//admin
router.post('/admin/signin', adminController.signIn)
router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)
router.put(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.putUser
)
//analyst
router.get('/analyst/getTemplate', authenticated, analystController.getTemplate)
router.post(
  '/analyst/putTemplate',
  authenticated,
  analystController.putTemplate
)
const upload = csvUpload.single('file')
router.post(
  '/analyst/uploadTemplate',
  authenticated,
  function (req, res, next) {
    upload(req, res, (err) => {
      return err ? res.status(200).json(err) : next()
    })
  },
  analystController.uploadTemplate
)
router.get(
  '/analyst/reviewTemplate',
  authenticated,
  analystController.reviewTemplate
)
router.get(
  '/analyst/downloadTemplate',
  authenticated,
  analystController.downloadTemplate
)
router.post(
  '/analyst/sendSRCForm',
  authenticated,
  analystController.sendSRCForm
)
router.post(
  '/analyst/reviewSRCForm',
  authenticated,
  analystController.reviewSRCForm
)

//coach
router.post(
  '/coach/getTraineesData',
  authenticated,
  coachController.getTraineesData
)
router.post(
  '/coach/getTraineesDate',
  authenticated,
  coachController.getTraineesDate
)
router.get(
  '/coach/getTraineesByDate',
  authenticated,
  coachController.getTraineesByDate
)
router.get(
  '/coach/getTraineesShip',
  authenticated,
  coachController.getTraineesShip
)
router.post('/coach/addTrainees', authenticated, coachController.addTrainees)
router.put(
  '/coach/setStopTraining',
  authenticated,
  coachController.setStopTraining
)
router.post(
  '/coach/getTraineesFabData',
  authenticated,
  coachController.getTraineesFabData
)

//users
router.get('/getCurrentUser', authenticated, userController.getCurrentUsers)
router.get('/user', authenticated, userController.getUser)
router.put(
  '/user',
  authenticated,
  avatarUpload.single('avatar'),
  userController.putUser
)
router.post('/user/getBaat', authenticated, userController.getBaat)
router.post('/user/getSnc', authenticated, userController.getSnc)
router.post('/user/getSpc', authenticated, userController.getSpc)
router.post('/user/getSsta', authenticated, userController.getSsta)
router.post('/user/getSsta2', authenticated, userController.getSsta2)
router.post('/user/getSrc', authenticated, userController.getSrc)
router.get(
  '/user/getUserFileList',
  authenticated,
  userController.getUserFileList
)
router.get(
  '/user/downloadUserFile',
  authenticated,
  userController.downloadUserFile
)
router.put(
  '/user/editUserFileName',
  authenticated,
  userController.editUserFileName
)
router.delete(
  '/user/deleteUserFile/:fileName',
  authenticated,
  userController.deleteUserFile
)
// router.post(
//   '/user/uploadUserFile',
//   authenticated,
//   userFileUpload.array('myFiles'),
//   userController.uploadUserFile
// )
router.post(
  '/user/uploadUserFile',
  authenticated,
  userController.uploadUserFile
)

router.put('/user/passwordEdit', authenticated, userController.passwordEdit)
router.put(
  '/user/passwordInputCheck',
  authenticated,
  userController.passwordInputCheck
)
router.post('/signup', userController.signUp)
router.post('/sendVerifyEmail', userController.sendVerifyEmail)
router.post('/sendResetEmail', userController.sendResetEmail)
router.get('/verifyEmail', userController.verifyEmail)
router.put('/resetPassword', userController.resetPassword)
router.post('/signin', userController.signIn)
router.get('/getUserRoles', userController.getUserRoles)

//error handle
router.use('/', generalErrorHandler)

module.exports = router
