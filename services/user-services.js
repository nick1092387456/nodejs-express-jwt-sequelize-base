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
        let genderENG,
          dutyENG = ''
        if (gender === '男') genderENG = 'M'
        else if (gender === '女') genderENG = 'F'
        else throw new Error({ message: '無效的輸入' })
        if (duty === '教練') dutyENG = 'Coach'
        else if (duty === '運動員') dutyENG = 'Athlete'
        else if (duty === '資料管理員') dutyENG = 'Analyst'
        else throw new Error({ message: '無效的輸入' })
        await User.create({
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          name,
          description,
          avatar,
          idNumber,
          gender: genderENG,
          birthday,
          duty: dutyENG,
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
      return callback(null, {
        status: false,
        message: result.message || '登入失敗，請重新輸入',
      })
    } catch (err) {
      return callback(err)
    }
  },
  getCurrentUsers: (req, callback) => {
    try {
      return callback(null, {
        status: 'success',
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
        },
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  getUser: async (req, callback) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id, {
        attributes: [
          'id',
          'name',
          'email',
          'description',
          'avatar',
          'gender',
          'birthday',
          'duty',
          'private_check',
        ],
        include: [
          {
            model: User,
            as: 'coach',
            attributes: ['id', 'name', 'avatar'],
            through: { attributes: [] },
          },
          {
            model: User,
            as: 'athlete',
            attributes: ['id', 'name', 'avatar'],
            through: { attributes: [] },
          },
        ],
      })
      if (!user) {
        throw new Error({
          status: 'error',
          message: '找不到使用者,已返回至您的個人檔案！',
        })
      }
      return callback(null, {
        status: 'success',
        user: user.toJSON(),
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
}

module.exports = userServices
