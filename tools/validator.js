const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

async function signUpValidation(body) {
  try {
    const {
      email,
      password,
      passwordCheck,
      name,
      idNumber,
      gender,
      birthday,
      duty,
    } = body

    if (
      !email ||
      !password ||
      !passwordCheck ||
      !name ||
      !idNumber ||
      !gender ||
      !birthday ||
      !duty
    )
      return {
        success: false,
        message: '所有欄位皆需要填寫!',
      }
    if (name.length > 50)
      return {
        success: false,
        message: '姓名需小於50字',
      }
    if (!/[\u4E00-\u9FFFa-zA-Z]+/g.test(name))
      return {
        success: false,
        message: '姓名不可以有符號',
      }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/.test(password))
      return {
        success: false,
        message:
          '密碼輸入需 6~10 個由至少有一個數字、至少有一個小寫英文字母、至少有一個大寫英文字母。至少有一個「特殊符號」。',
      }
    if (password !== passwordCheck)
      return {
        success: false,
        message: '兩次密碼輸入不一致',
      }
    if (!/[A-Z](1|2|8|9)\d{8}/.test(idNumber))
      return {
        success: false,
        message: '身份證字號規格有誤',
      }
    if (!['教練', '運動員', '資料管理員'].includes(duty)) {
      return {
        success: false,
        message: '職位輸入錯誤',
      }
    }
    if (!['男', '女'].includes(gender)) {
      return {
        success: false,
        message: '性別輸入錯誤',
      }
    }
    const birthdayValidate = new Date(birthday)
    if (!(birthdayValidate instanceof Date && !isNaN(birthdayValidate))) {
      return {
        success: false,
        message: '日期格式有誤',
      }
    }
    const isRegistered = await User.findOne({
      where: { email },
    })
    if (isRegistered) {
      return {
        success: false,
        message: '信箱已註冊',
      }
    }
    const idNumberIsRegistered = await User.findOne({
      where: {
        idNumber,
      },
    })
    if (idNumberIsRegistered) {
      return {
        success: false,
        message: '身分證已註冊',
      }
    }
    return { success: true }
  } catch (err) {
    return err
  }
}

async function signInValidation(body) {
  try {
    const { email, password } = body
    if (!email || !password)
      return {
        success: false,
        message: '所有欄位都必須填寫!',
      }
    const user = await User.findOne({ where: { email } })
    if (!user)
      return {
        success: false,
        message: 'email未註冊',
      }
    if (!bcrypt.compareSync(password, user.password))
      return {
        success: false,
        message: '帳號或密碼錯誤',
      }
    const result = user.toJSON()
    delete result.password
    return { success: true, message: '登入成功!', data: result }
  } catch (err) {
    return err
  }
}

async function passwordCheck(body) {
  try {
    const { userId, password } = body
    if (!userId || !password) {
      return {
        success: false,
        message: '請輸入原密碼',
      }
    }
    const user = await User.findByPk(userId)
    if (!user) {
      return {
        success: false,
        message: '查無此使用者',
      }
    }
    if (!bcrypt.compareSync(password, user.password))
      return {
        success: false,
        message: '密碼錯誤',
      }
    return { success: true, message: '密碼驗證成功' }
  } catch (err) {
    return { success: false, message: err }
  }
}

async function userEditValidation(body) {
  try {
    const { name, gender, birthday } = body
    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/.text(password)) {
    //   return {
    //     success: false,
    //     message:
    //       '密碼輸入需 6~10 個由至少有一個數字、至少有一個小寫英文字母、至少有一個大寫英文字母。至少有一個「特殊符號」',
    //   }
    // }
    if (name.length > 50)
      return {
        success: false,
        message: '姓名需小於50字',
      }
    if (!/[\u4E00-\u9FFFa-zA-Z]+/g.test(name))
      return {
        success: false,
        message: '姓名不可以有符號',
      }
    if (!['男', '女'].includes(gender)) {
      return {
        success: false,
        message: '性別輸入錯誤',
      }
    }
    const birthdayValidate = new Date(birthday)
    if (!(birthdayValidate instanceof Date && !isNaN(birthdayValidate))) {
      return {
        success: false,
        message: '日期格式有誤',
      }
    }

    return { success: true }
  } catch (err) {
    return err
  }
}

async function passwordEditValidation(body) {
  try {
    const { password } = body
    if (!password) {
      return {
        success: false,
        message: '請輸入愈更改的密碼',
      }
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,10}$/.test(password))
      return {
        success: false,
        message:
          '密碼輸入需 6~10 個由至少有一個數字、至少有一個小寫英文字母、至少有一個大寫英文字母。至少有一個「特殊符號」。',
      }
    return { success: true, message: '密碼驗證成功' }
  } catch (err) {
    return { success: false, message: err }
  }
}

module.exports = {
  signUpValidation,
  signInValidation,
  userEditValidation,
  passwordCheck,
  passwordEditValidation,
}
