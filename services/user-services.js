const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const jwt = require('jsonwebtoken')

const userServices = {
  signUp: async (req, callback) => {
    try {
      if (req.body.password !== req.body.passwordCheck)
        throw '兩次密碼輸入不一致!'
      const isRegistered = await User.findOne({
        where: { email: req.body.email },
      })
      if (isRegistered) throw '信箱已被註冊!'
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        ),
      })
      return callback(null, { status: 'success', message: '成功註冊帳號！' })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  signIn: async (req, callback) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
      return callback(null, {
        status: 'success',
        data: { token, user: userData },
      })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getUsers: (req, callback) => {
    try {
      return callback(null, {
        status: 'success',
        data: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
        },
      })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
}

module.exports = userServices
