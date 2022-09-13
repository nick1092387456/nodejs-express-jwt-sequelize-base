const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const jwt = require('jsonwebtoken')
const userServices = require('../services/user-services')

const userController = {
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
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
      res.json({ status: 'success', data: { token, user: userData } })
    } catch (err) {
      next(err)
    }
    // original................
    // 檢查必要資料
    // if (!req.body.email || !req.body.password) {
    //   return res.json({
    //     status: 'error',
    //     message: "required fields didn't exist",
    //   })
    // }
    // // 檢查 user 是否存在與密碼是否正確
    // let username = req.body.email
    // let password = req.body.password

    // User.findOne({ where: { email: username } }).then((user) => {
    //   if (!user)
    //     return res
    //       .status(401)
    //       .json({ status: 'error', message: 'no such user found' })
    //   if (!bcrypt.compareSync(password, user.password)) {
    //     return res
    //       .status(401)
    //       .json({ status: 'error', message: 'passwords did not match' })
    //   }

    //   // 簽發 token
    //   var payload = { id: user.id }
    //   var token = jwt.sign(payload, process.env.JWT_SECRET)
    //   return res.json({
    //     status: 'success',
    //     message: 'ok',
    //     token: token,
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //       isAdmin: user.isAdmin,
    //     },
    //   })
    // })
  },
  getUsers: (req, res, next) => {
    userServices.getUsers(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
}

module.exports = userController
