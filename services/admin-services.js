const jwt = require('jsonwebtoken')
const { signInValidation } = require('../tools/validator')
const db = require('../models')

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
      const result = await db.User.findAll({
        attributes: ['id', 'name', 'email', 'duty', 'sport'],
        joinTableAttributes: [],
        include: [
          {
            model: db.Role,
            attributes: {
              exclude: [
                'UserId',
                'userId',
                'user_id',
                'id',
                'createdAt',
                'updatedAt',
              ],
            },
          },
          {
            model: db.Privacy_consent_status,
            attributes: {
              exclude: [
                'UserId',
                'userId',
                'user_id',
                'id',
                'createdAt',
                'updatedAt',
              ],
            },
          },
        ],
      })
      return callback(null, {
        status: 'success',
        data: result,
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  putUser: async (req, callback) => {
    try {
      const { id, name, email, duty, team, privacyStatus, roles } = req.body
      const roleList = [
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
      ]
      const privacyStatusList = [
        'baat_root',
        'snc_root',
        'ssta_root',
        'ssta2_root',
        'src_root',
        'spc_root',
        'sptc_root',
        'baat_coach',
        'snc_coach',
        'ssta_coach',
        'ssta2_coach',
        'src_coach',
        'spc_coach',
        'sptc_coach',
      ]

      const privacyData = privacyStatusList.reduce((acc, cur) => {
        return privacyStatus.indexOf(cur) > -1
          ? (acc = { ...acc, [cur]: true })
          : (acc = { ...acc, [cur]: false })
      }, {})

      const roleData = roleList.reduce((acc, cur) => {
        return roles.indexOf(cur) > -1
          ? (acc = { ...acc, [cur]: true })
          : (acc = { ...acc, [cur]: false })
      }, {})

      const user = await db.User.findByPk(id, {
        include: [
          {
            model: db.Role,
            attributes: {
              exclude: [
                'UserId',
                'userId',
                'user_id',
                'id',
                'createdAt',
                'updatedAt',
              ],
            },
          },
          {
            model: db.Privacy_consent_status,
            attributes: {
              exclude: [
                'UserId',
                'userId',
                'user_id',
                'id',
                'createdAt',
                'updatedAt',
              ],
            },
          },
        ],
      })

      if (user) {
        await user.update({
          id,
          name,
          email,
          duty,
          team,
        })

        const privacy = await db.Privacy_consent_status.findOne({
          where: { user_id: id },
          attributes: {
            exclude: ['UserId', 'userId', 'createdAt', 'updatedAt'],
          },
        })
        Object.assign(privacy, privacyData)
        privacy.save()

        const role = await db.Role.findOne({
          where: { user_id: id },
          attributes: {
            exclude: ['UserId', 'userId', 'createdAt', 'updatedAt'],
          },
        })
        Object.assign(role, roleData)
        role.save(roleData)
        return callback(null, { status: 'success', message: '更新成功' })
      } else {
        return callback(null, { status: 'success', message: '使用者不存在' })
      }
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
}

module.exports = adminServices
