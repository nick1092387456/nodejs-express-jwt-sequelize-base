const jwt = require('jsonwebtoken')
const { signUpValidation, signInValidation } = require('../tools/helper')

const userServices = {
  signUp: async (req, callback) => {
    try {
      const result = await signUpValidation(req.body)
      if (result.status === '200')
        return callback(null, { status: 'success', message: '註冊成功!' })
      return callback(result)
    } catch (err) {
      return callback(err)
    }
  },
  signIn: async (req, callback) => {
    try {
      const result = await signInValidation(req.body)
      if (result.status == '200') {
        const payload = { id: result.id }
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
