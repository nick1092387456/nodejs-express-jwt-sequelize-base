const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/users', userController.getUsers)

module.exports = router
