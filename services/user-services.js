const jwt = require('jsonwebtoken')
const {
  signUpValidation,
  signInValidation,
  userEditValidation,
  passwordCheck,
  passwordEditValidation,
} = require('../tools/validator')
const {
  translateGender,
  translateDuty,
  translateSport,
} = require('../tools/translator')
const bcrypt = require('bcryptjs')
const db = require('../models')
const {
  User,
  Role,
  BaatInbody,
  BaatGripStrength,
  BaatCmj,
  BaatImtp,
  BaatWingateTest,
} = db

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
          sport,
          privateCheck,
        } = req.body
        const genderENG = translateGender(gender)
        if (!genderENG)
          return callback(null, { status: 'error', message: '無效的性別輸入!' })
        const dutyENG = translateDuty(duty)
        if (!dutyENG)
          return callback(null, { status: 'error', message: '無效的職責輸入!' })
        const sportENG = translateSport(sport)
        if (!sportENG)
          return callback(null, {
            status: 'error',
            message: '無效的運動項目輸入!',
          })
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
          sport: sportENG,
          privateCheck,
        })
        return callback(null, { status: 'success', message: '註冊成功!' })
      } else {
        return callback(null, {
          status: false,
          message: result.message || '註冊失敗，請重新輸入',
        })
      }
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
  getCurrentUsers: async (req, callback) => {
    try {
      const roles = await Role.findByPk(req.user.id, {
        raw: true,
        attributes: [
          'baat',
          'snc',
          'ssta',
          'ssta2',
          'src',
          'spc',
          'sptc',
          'coach',
          'athlete',
          'analyst',
        ],
      })
      const entriesRoles = Object.entries(roles)
      const rolesFormatted = entriesRoles.reduce(
        (acc, cur) => {
          if (
            cur[0] === 'coach' ||
            cur[0] === 'athlete' ||
            cur[0] === 'analyst'
          ) {
            Object.assign(acc.duty, Object.fromEntries([cur]))
            return acc
          } else {
            return Object.assign(acc, Object.fromEntries([cur]))
          }
        },
        { duty: {} }
      )
      return callback(null, {
        status: 'success',
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
          roles: rolesFormatted,
        },
      })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getUserRoles: async (req, callback) => {
    try {
      const id = Object.keys(req.query)[0]
      const roles = await Role.findByPk(id, {
        raw: true,
        attributes: [
          'baat',
          'snc',
          'ssta',
          'ssta2',
          'src',
          'spc',
          'sptc',
          'coach',
          'athlete',
          'analyst',
        ],
      })
      const entriesRoles = Object.entries(roles)
      const rolesFormatted = entriesRoles.reduce(
        (acc, cur) => {
          if (
            cur[0] === 'coach' ||
            cur[0] === 'athlete' ||
            cur[0] === 'analyst'
          ) {
            Object.assign(acc.duty, Object.fromEntries([cur]))
            return acc
          } else {
            return Object.assign(acc, Object.fromEntries([cur]))
          }
        },
        { duty: {} }
      )

      return callback(null, { status: 'success', roles: rolesFormatted })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
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
          'sport',
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
  getBaat: async (req, callback) => {
    try {
      let userData = await User.findByPk(req.params.id, {
        attributes: [],
        include: [
          {
            model: BaatInbody,
            as: 'Baat_Inbody',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: BaatGripStrength,
            as: 'Baat_GripStrength',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: BaatCmj,
            as: 'Baat_cmj',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: BaatImtp,
            as: 'Baat_imtp',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: BaatWingateTest,
            as: 'Baat_wingate_test',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
        ],
      })

      if (!userData) {
        return callback(null, {
          status: 'error',
          message: '找不到使用者,已返回至您的個人檔案！',
        })
      }

      return callback(null, {
        status: 'success',
        data: userData,
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  putUser: async (req, callback) => {
    try {
      //驗證輸入資料格式
      const inputValidateResult = userEditValidation(req.body)
      if (!inputValidateResult) {
        return callback({
          status: 'error',
          message: inputValidateResult.message,
        })
      }
      //更新文字資料
      const { name, gender, sport, birthday, description } = req.body
      const user = await User.findByPk(req.params.id)
      const genderENG = translateGender(gender)
      const sportENG = translateSport(sport)
      await user.update({
        name,
        gender: genderENG,
        sport: sportENG,
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
    try {
      const { userId, password } = req.body
      const result = await passwordEditValidation(req.body)
      if (!result.success) {
        return callback(null, { status: 'error', message: result.message })
      }
      const user = await User.findByPk(userId)
      await user.update({
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      })
      return callback(null, { status: 'success', message: '更新完成' })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  passwordInputCheck: async (req, callback) => {
    try {
      const result = await passwordCheck(req.body)
      if (result.success) {
        return callback(null, { status: 'success', message: '密碼驗證成功' })
      } else {
        return callback(null, { status: 'error', message: result.message })
      }
    } catch (err) {
      return callback({ status: 'error', message: '密碼驗證錯誤' })
    }
  },
}

module.exports = userServices
