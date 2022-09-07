const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')

router.get('/users', userController.getUsers)
router.get('/admin/users', adminController.getUsers)

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router
