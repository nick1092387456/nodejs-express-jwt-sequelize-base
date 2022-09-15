const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

async function signUpValidation(body) {
  try {
    const { name, email, password, passwordCheck } = body
    if (!name || !email || !password || !passwordCheck)
      throw {
        status: '400',
        message: '所有欄位皆需要填寫!',
        data: { email, name, password },
      }
    if (name && name.length > 50)
      throw {
        status: '400',
        message: '名稱需小於50字',
        data: { email, name, password },
      }
    if (password !== passwordCheck) {
      throw {
        status: '400',
        message: '兩次密碼輸入不相同',
        data: { email, name, password },
      }
    }
    const isRegistered = await User.findOne({
      where: { email },
    })
    if (isRegistered) {
      throw {
        status: '409',
        message: '信箱已被註冊',
        data: { email, name, password },
      }
    }
    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
    })
    return { status: '200', message: '註冊成功' }
  } catch (err) {
    return err
  }
}

async function signInValidation(body) {
  try {
    const { email, password } = body
    if (!email || !password)
      throw {
        status: '401',
        message: '所有欄位都必須填寫!',
        data: { email, password },
      }
    const user = await User.findOne({ where: { email } })
    if (!user)
      throw {
        status: '401',
        message: 'email未註冊',
        data: { email, password },
      }
    if (!bcrypt.compareSync(password, user.password))
      throw {
        status: '401',
        message: '帳號或密碼錯誤',
        data: { email, password },
      }
    const result = user.toJSON()
    delete result.password
    return { status: '200', message: '登入成功!', data: result }
  } catch (err) {
    return err
  }
}

module.exports = {
  signUpValidation,
  signInValidation,
}
