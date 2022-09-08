const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userController = {
  getUsers: (req, res) => {
    return res.json('users')
  },
  signUp: async (req, res) => {
    try {
      const isRegistered = await User.findOne({
        where: { email: req.body.email },
      })
      if (isRegistered) {
        return res.json({ status: 'error', message: '信箱重複!' })
      } else {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync(10),
            null
          ),
        })
      }
    } catch (err) {
      res.json({ status: 'error', message: err })
    }
    return res.json({ status: 'success', message: '成功註冊帳號！' })
  },
}

module.exports = userController
