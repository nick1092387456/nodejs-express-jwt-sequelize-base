const jwt = require('jsonwebtoken')
const {
  signUpValidation,
  signInValidation,
  userEditValidation,
} = require('../tools/validator')
const { translateGender, translateDuty } = require('../tools/translator')
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
        const genderENG = translateGender(gender)
        if (!genderENG) throw new Error({ message: '無效的輸入' })
        const dutyENG = translateDuty(duty)
        if (!dutyENG) throw new Error({ message: '無效輸入' })

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
          'idNumber',
          'avatar',
          'gender',
          'birthday',
          'duty',
          'privateCheck',
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
  putUser: async (req, callback) => {
    try {
      //檢查權限
      if (Number(req.params.id) !== Number(req.user.id)) {
        return callback({ status: 'error', message: '只能編輯自己的資料' })
      }
      //驗證輸入資料格式
      const inputValidateResult = userEditValidation(req.body)
      if (!inputValidateResult) {
        return callback({
          status: 'error',
          message: inputValidateResult.message,
        })
      }
      //更新文字資料
      const { name, gender, birthday, description } = req.body
      const user = await User.findByPk(req.params.id)
      const genderENG = translateGender(gender)
      await user.update({
        name,
        gender: genderENG,
        birthday,
        description,
      })
      //如果有上傳檔案，更新上傳檔案
      if (req.file) {
        const filePath = req.file.path.split('\\')[1]
        const avatar = `${req.protocol}://${req.headers.host}/avatars/${filePath}`
        await user.update({ avatar })
      }
      return callback(null, { status: 'success', message: '更新完成' })
    } catch (err) {
      return callback({ status: 'error', message: '更新失敗，請稍後再試' })
    }
  },
  passwordEdit: async (req, callback) => {
    console.log(req, callback)
  },
}

module.exports = userServices
