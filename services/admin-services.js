const jwt = require('jsonwebtoken')
const { signInValidation } = require('../tools/validator')
const db = require('../models')
const { User, Role } = db

const adminServices = {
  signIn: async (req, callback) => {
    try {
      const result = await signInValidation(req.body)
      if (!result.data.isAdmin)
        throw { status: '401', message: '您沒有管理員權限' }
      if (result.status === '200') {
        const payload = { id: result.data.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1d',
        })
        result.token = token
        return callback(null, result)
      }
      return callback(null, result)
    } catch (err) {
      return callback(err)
    }
  },
  getUsers: async (req, callback) => {
    try {
      const result = await User.findAll({
        attributes: ['id', 'name', 'email', 'duty', 'sport', 'privateCheck'],
        include: [
          {
            model: Role,
          },
        ],
      })
      return callback(null, {
        status: 'success',
        data: result,
      })
    } catch (err) {
      return callback({ status: '400', message: err })
    }
  },
}

module.exports = adminServices
