const jwt = require('jsonwebtoken')
const {
  signUpValidation,
  signInValidation,
} = require('../tools/signInUpValidator')
const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userServices = {
  signUp: async (req, callback) => {
    try {
      const result = await signUpValidation(req.body)
      if (result.success) {
        const {
          email,
          password,
          name,
          description,
          avatar,
          idNumber,
          gender,
          birthday,
          duty,
          privateCheck,
        } = req.body
        await User.create({
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          name,
          description,
          avatar,
          idNumber,
          gender,
          birthday,
          duty,
          privateCheck,
        })
        return callback(null, { status: 'success', message: '註冊成功!' })
      }
      return callback(null, {
        status: false,
        message: result.message || '註冊失敗，請重新輸入',
      })
    } catch (err) {
      return callback(err)
    }
  },
  signIn: async (req, callback) => {
    try {
      const result = await signInValidation(req.body)
      if (result.success) {
        const payload = { id: result.data.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '30d',
        })
        result.token = token
        return callback(null, result)
      }
      return callback(result)
    } catch (err) {
      return callback(err)
    }
  },
  getCurrentUsers: (req, callback) => {
    try {
      return callback(null, {
        success: true,
        data: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
        },
      })
    } catch (err) {
      return callback({ success: '400', message: err })
    }
  },
}

module.exports = userServices
