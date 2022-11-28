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
const fs = require('fs')
const path = require('path')
const upload = require('../middleware/userFileUpload')
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')

const userServices = {
  signUp: async (req, callback) => {
    try {
      const verifyCode = Object.keys(req.query)[0]
      const emailStatus = await db.EmailStatus.findOne({
        where: { verify_code: verifyCode },
      })
      const result = await signUpValidation(req.body)
      if (result.success && emailStatus.state === 'verified') {
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
          privacyAgreement,
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
        const userId = uuidv4()
        await db.User.create({
          id: userId,
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
        })

        Object.assign(privacyAgreement, { user_id: userId })
        await db.Role.create({ user_id: userId })
        await db.Privacy_consent_status.create(privacyAgreement)

        return callback(null, { status: 'success', message: '註冊成功!' })
      } else {
        return callback(null, {
          status: false,
          message: result.message || '註冊失敗，請重新輸入',
        })
      }
    } catch (err) {
      console.log(err)
      return callback(err)
    }
  },
  sendVerifyEmail: async (req, callback) => {
    try {
      const { email } = req.body
      const verifyCode = uuidv4()
      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        port: 25,
        secure: false,
        auth: {
          user: process.env.EMAIL_AC,
          pass: process.env.EMAIL_PS,
        },
      })
      const link = `${process.env.HOST}VerifyEmail?${verifyCode}`
      const mailOptions = {
        to: email,
        subject: '國立體育大學運動資料平台註冊信箱驗證信',
        html: `<p>請點擊連結完成認證 ${link} </p>`,
      }
      const checkEmailIsExist = await db.EmailStatus.findOne({
        where: {
          [Op.and]: [{ email }, { state: 'verifying' }],
        },
      })
      if (!checkEmailIsExist) {
        await db.EmailStatus.create({
          email,
          verify_code: verifyCode,
          state: 'verifying',
        })
        await smtpTransport.sendMail(mailOptions, function (error) {
          if (error) {
            throw new Error(error)
          } else {
            return callback(null, {
              status: 'success',
              message: '信箱認證信件已寄出，請檢查您的信箱',
            })
          }
        })
      } else {
        await db.EmailStatus.update(
          {
            verify_code: verifyCode,
          },
          {
            where: {
              [Op.and]: [{ email }, { state: 'verifying' }],
            },
          }
        )
        await smtpTransport.sendMail(mailOptions, function (error) {
          if (error) {
            throw new Error(error)
          } else {
            return callback(null, {
              status: 'success',
              message: '信箱認證信件已寄出，請檢查您的信箱',
            })
          }
        })
      }
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'error',
        message: '寄送失敗，請稍後再試',
      })
    }
  },
  sendResetEmail: async (req, callback) => {
    try {
      const { email } = req.body
      const userIsExist = await db.User.findOne({ where: { email } })
      if (!userIsExist) {
        return callback(null, {
          status: 'error',
          message: '使用者不存在',
        })
      }
      const verifyCode = uuidv4()
      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        port: 25,
        secure: false,
        auth: {
          user: process.env.EMAIL_AC,
          pass: process.env.EMAIL_PS,
        },
      })
      const link = `${process.env.HOST}ResetPassword?${verifyCode}`
      const mailOptions = {
        to: email,
        subject: '國立體育大學運動資料平台密碼重設信件',
        html: `<p>請點擊連結重設您的密碼 ${link} </p>`,
      }
      const checkEmailStatus = await db.ResetPasswordStatus.findOne({
        where: {
          [Op.and]: [{ email }, { state: 'verifying' }],
        },
      })
      if (!checkEmailStatus) {
        await db.ResetPasswordStatus.create({
          email,
          verify_code: verifyCode,
          state: 'verifying',
        })
        await smtpTransport.sendMail(mailOptions, function (error) {
          if (error) {
            throw new Error(error)
          } else {
            return callback(null, {
              status: 'success',
              message: '重設信件已寄出，請檢查您的信箱',
            })
          }
        })
      } else {
        await db.ResetPasswordStatus.update(
          {
            verify_code: verifyCode,
          },
          {
            where: {
              [Op.and]: [{ email }, { state: 'verifying' }],
            },
          }
        )
        await smtpTransport.sendMail(mailOptions, function (error) {
          if (error) {
            throw new Error(error)
          } else {
            return callback(null, {
              status: 'success',
              message: '確認信件已寄出，請檢查您的信箱',
            })
          }
        })
      }
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'error',
        message: '寄送失敗，請稍後再試',
      })
    }
  },
  verifyEmail: async (req, callback) => {
    try {
      const verifyCode = Object.keys(req.query)[0]
      const registerVerifyCodeIsExist = await db.EmailStatus.findOne({
        where: { verify_code: verifyCode },
      })
      const resetVerifyCodeIsExist = await db.ResetPasswordStatus.findOne({
        where: { verify_code: verifyCode },
      })

      if (registerVerifyCodeIsExist) {
        await db.EmailStatus.update(
          {
            state: 'verified',
          },
          { where: { verify_code: verifyCode } }
        )
        return callback(null, {
          status: 'success',
          data: verifyCode,
          message: '信箱驗證成功，已導向註冊頁',
        })
      }

      if (resetVerifyCodeIsExist) {
        const { email } = resetVerifyCodeIsExist
        await db.ResetPasswordStatus.update(
          {
            state: 'verified',
          },
          { where: { verify_code: verifyCode } }
        )
        return callback(null, {
          status: 'success',
          data: { verifyCode, email },
          message: '連結驗證成功，已導向重設頁面',
        })
      }

      return callback(null, {
        status: 'error',
        message: '連結失效，請重新申請',
      })
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'error',
        message: '操作失敗，請重新申請',
      })
    }
  },
  resetPassword: async (req, callback) => {
    try {
      const { email, password, verifyCode } = req.body
      const permissionIsValid = await db.ResetPasswordStatus.findOne({
        where: { verify_code: verifyCode },
      })
      if (!permissionIsValid) {
        return callback(null, {
          status: 'error',
          message: '權限失效',
        })
      }
      const user = await db.User.findOne({ where: { email } })
      if (user) {
        await user.update(
          { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) },
          { where: { email } }
        )
        return callback(null, {
          status: 'success',
          message: '密碼已重設，請重新登入',
        })
      }
      return callback(null, {
        status: 'error',
        message: '找不到使用者',
      })
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'error',
        message: '操作失敗，請重新申請',
      })
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
      const roles = await db.Role.findByPk(req.user.id, {
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
      const roles = await db.Role.findOne({
        where: { user_id: id },
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
        raw: true,
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
      const { id } = req.user
      const user = await db.User.findByPk(id, {
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
        ],
        include: [
          {
            model: db.User,
            as: 'coach',
            attributes: ['id', 'name', 'avatar'],
            through: { attributes: [] },
          },
          {
            model: db.User,
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
      const userData = await db.User.findByPk(req.user.id, {
        attributes: [],
        include: [
          {
            model: db.BaatInbody,
            as: 'Baat_Inbody',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.BaatGripStrength,
            as: 'Baat_GripStrength',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.BaatCmj,
            as: 'Baat_cmj',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.BaatImtp,
            as: 'Baat_imtp',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.BaatWingateTest,
            as: 'Baat_wingate_test',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
        ],
      })

      if (!userData) {
        return callback(null, {
          status: 'error',
          message: '找不到使用者資料',
        })
      }
      return callback(null, {
        status: 'success',
        data: userData,
      })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getSnc: async (req, callback) => {
    try {
      const userData = await db.User.findByPk(req.user.id, {
        attributes: [],
        include: [
          {
            model: db.SncInbody,
            as: 'Snc_inbody',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
        ],
      })
      if (!userData) {
        return callback(null, { status: 'error', message: '找不到使用者資料' })
      }
      return callback(null, { status: 'success', data: userData })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getSsta: async (req, callback) => {
    try {
      const userData = await db.User.findByPk(req.user.id, {
        attributes: [],
        include: [
          {
            model: db.SstaInbody,
            as: 'Ssta_inbody',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaBoat2km,
            as: 'Ssta_boat_2km',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaBoat30,
            as: 'Ssta_boat_30',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaBw,
            as: 'Ssta_bw',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaCyclingVo2,
            as: 'Ssta_cycling_vo2',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaFootball20m,
            as: 'Ssta_football_20m',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaFootball505,
            as: 'Ssta_football_505',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
          {
            model: db.SstaFootballLight,
            as: 'Ssta_football_light',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
        ],
      })
      if (!userData) {
        return callback(null, { status: 'error', message: '找不到使用者資料' })
      }
      return callback(null, { status: 'success', data: userData })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getSpc: async (req, callback) => {
    try {
      const userData = await db.User.findByPk(req.user.id, {
        attributes: [],
        include: [
          {
            model: db.Spc,
            as: 'Spc',
            attributes: ['id', 'key', 'value', 'detect_at'],
            through: { attributes: [] },
          },
        ],
      })
      if (!userData) {
        return callback(null, { status: 'error', message: '找不到使用者資料' })
      }
      return callback(null, { status: 'success', data: userData })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
    }
  },
  getSrc: async (req, callback) => {
    try {
      const userData = await db.User.findByPk(req.user.id, {
        attributes: [],
        include: [
          {
            model: db.Src,
            as: 'Src',
            attributes: ['id', 'data'],
            through: { attributes: [] },
          },
        ],
      })
      if (!userData) {
        return callback(null, { status: 'error', message: '找不到使用者資料' })
      }
      return callback(null, { status: 'success', data: userData })
    } catch (err) {
      console.log(err)
      return callback(null, { status: 'error', message: err })
    }
  },
  getUserFileList: async (req, callback) => {
    try {
      const { id } = req.user
      const isExists = await fs.existsSync(
        path.resolve(process.cwd(), `./public/Users/${id}`)
      )
      if (!isExists) {
        await fs.mkdirSync(path.resolve(process.cwd(), `./public/Users/${id}`))
      }
      const directoryPath = path.resolve(process.cwd(), `./public/Users/${id}`)
      const fileList = await fs.readdirSync(directoryPath)

      const result = await Promise.all(
        fileList.map(async (file) => {
          const filePath = directoryPath + `/${file}`
          const fileStat = await fs.statSync(filePath)
          const fileName = file.slice(0, -4)
          const fileExt = path.extname(filePath).slice(1)
          const fileSize = fileStat.size //bytes
          const fileCreateAt = fileStat.birthtimeMs //millisecond
          const fileUpdateAt = fileStat.ctimeMs //millisecond
          return {
            name: fileName,
            ext: fileExt,
            size: fileSize,
            createAt: fileCreateAt,
            updateAt: fileUpdateAt,
          }
        })
      )
      return callback(null, { status: 'success', data: result })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  downloadUserFile: async (req, callback) => {
    try {
      const fileName = Object.values(req.query)[0]
      const { id } = req.user
      const isExists = await fs.existsSync(
        path.resolve(process.cwd(), `./public/Users/${id}/${fileName}`)
      )
      if (!isExists) {
        return callback(null, { status: 'error', message: '找不到此檔案!' })
      }
      const filePath = await path.resolve(
        process.cwd(),
        `./public/Users/${id}/${fileName}`
      )
      return callback(null, {
        status: 'success',
        filePath,
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  editUserFileName: async (req, callback) => {
    try {
      const { fileName, editName } = req.body
      const { id } = req.user
      const isExists = await fs.existsSync(
        path.resolve(process.cwd(), `./public/Users/${id}/${fileName}`)
      )
      if (!isExists) {
        return callback(null, { status: 'error', message: '找不到此檔案!' })
      }
      const oldPath = await path.resolve(
        process.cwd(),
        `./public/Users/${id}/${fileName}`
      )
      const newPath = path.resolve(
        process.cwd(),
        `./public/Users/${id}/${editName}`
      )
      await fs.renameSync(oldPath, newPath)
      return callback(null, { status: 'success', message: '更新完成' })
    } catch (err) {
      return callback(err)
    }
  },
  deleteUserFile: async (req, callback) => {
    try {
      const { fileName } = req.params
      const { id } = req.user
      const isExists = await fs.existsSync(
        path.resolve(process.cwd(), `./public/Users/${id}/${fileName}`)
      )
      if (!isExists) {
        return callback(null, { status: 'error', message: '找不到此檔案!' })
      }
      const filePath = await path.resolve(
        process.cwd(),
        `./public/Users/${id}/${fileName}`
      )
      console.log('filePath: ', filePath)
      await fs.unlinkSync(filePath)
      return callback(null, { status: 'success', message: '刪除完成' })
    } catch (err) {
      return callback(err)
    }
  },
  uploadUserFile: async (req, res, callback) => {
    try {
      await upload(req, res)
      if (req.files.length)
        return callback(null, { status: 'success', message: '檔案上傳成功' })
      else return callback(null, { status: 'error', message: '檔案上傳失敗' })
    } catch (err) {
      return callback(null, { status: 'error', message: err })
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
      const user = await db.User.findByPk(req.user.id)
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
        const filePath = req.file.path
        const host = process.env.HOST
        const avatar = `${host}${filePath}`
        await user.update({ avatar })
      }
      return callback(null, { status: 'success', message: '更新完成' })
    } catch (err) {
      return callback({ status: 'error', message: '更新失敗，請稍後再試' })
    }
  },
  passwordEdit: async (req, callback) => {
    try {
      const { password } = req.body
      const userId = req.user.id
      const result = await passwordEditValidation(req.body)
      if (!result.success) {
        return callback(null, { status: 'error', message: result.message })
      }
      const user = await db.User.findByPk(userId)
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
      const result = await passwordCheck(req)
      if (result.success) {
        return callback(null, { status: 'success', message: '密碼驗證成功' })
      } else {
        return callback(null, { status: 'error', message: result.message })
      }
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: '密碼驗證錯誤' })
    }
  },
}

module.exports = userServices
