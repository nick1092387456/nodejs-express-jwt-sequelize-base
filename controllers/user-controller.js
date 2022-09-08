const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userController = {
  getUsers: (req, res) => {
    return res.json('users')
  },
  signUp: async (req, res) => {
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
    } catch (err) {
      return res.json({ status: 'error', message: err })
    }
    return res.json({ status: 'success', message: '成功註冊帳號！' })
  },
}

module.exports = userController
