const db = require('../models')
const {
  User,
  BaatInbody,
  BaatGripStrength,
  baat_cmj,
  baat_imtp,
  baat_wingate_test,
} = db

const coachServices = {
  getTrainees: async (req, callback) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id, {
        attributes: [],
        include: [
          {
            model: User,
            as: 'athlete',
            attributes: ['id', 'name', 'avatar'],
            through: { attributes: [] },
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
                model: baat_cmj,
                as: 'Baat_cmj',
                attributes: ['id', 'key', 'value', 'detect_at'],
                through: { attributes: [] },
              },
              {
                model: baat_imtp,
                as: 'Baat_imtp',
                attributes: ['id', 'key', 'value', 'detect_at'],
                through: { attributes: [] },
              },
              {
                model: baat_wingate_test,
                as: 'Baat_wingate_test',
                attributes: ['id', 'key', 'value', 'detect_at'],
                through: { attributes: [] },
              },
            ],
          },
        ],
      })
      if (!user) {
        throw new Error({
          status: 'error',
          message: '找不到使用者',
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

module.exports = coachServices
