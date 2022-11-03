const db = require('../models')
const { Op } = require('sequelize')

const {
  User,
  BaatInbody,
  BaatGripStrength,
  baat_cmj,
  baat_imtp,
  baat_wingate_test,
  CoachAthleteShip,
} = db

const coachServices = {
  getTrainees: async (req, callback) => {
    try {
      const { sport } = req.user

      const user = await User.findAll({
        where: { [Op.and]: [{ sport: sport }, { duty: 'Athlete' }] },
        attributes: [
          'id',
          'name',
          'email',
          'avatar',
          'gender',
          'birthday',
          'sport',
          'privateCheck',
        ],
        raw: true,
      })

      const memberList = user.map((item) => item.id)

      const careerData = await CoachAthleteShip.findAll({
        where: { athlete_id: memberList },
        attributes: ['athlete_id', 'start_at', 'stop_at', 'status'],
        raw: true,
      })

      console.log('careerData: ', careerData)

      const result = user.reduce((acc, cur) => {
        for (let i = 0, j = careerData.length; i < j; i++) {
          if (cur.id === careerData[i].athlete_id) {
            return acc.concat({ ...cur, ...careerData[i] })
          }
        }
        return acc.concat({ ...cur })
      }, [])

      console.log('result: ', result)

      if (!user) {
        return callback(null, {
          status: 'error',
          message: '找不到使用者',
        })
      }
      return callback(null, {
        status: 'success',
        user: result,
      })
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
  toggleStatus: async (req, callback) => {
    try {
      const { coachId, id, start_at, stop_at, status } = req.body
      const athleteId = id
      const relation = await CoachAthleteShip.findOne({
        where: { [Op.and]: [{ coach_id: coachId }, { athlete_id: athleteId }] },
      })
      if (relation === null) {
        CoachAthleteShip.create({
          coachId: coachId,
          athleteId: athleteId,
          start_at: new Date(start_at),
          stop_at: new Date(stop_at),
          status: 'onTraining',
        })
        return callback(null, { status: 'success', message: '學員已新增' })
      }

      if (status === 'onTraining') {
        const updateResult = await relation.update({
          startAt: new Date(start_at),
          stopAt: new Date(stop_at),
          status: 'stopTraining',
        })
        return callback(null, {
          status: 'success',
          message: '狀態已更新成停止訓練',
          data: updateResult.status,
        })
      } else {
        const updateResult = await relation.update({
          startAt: new Date(start_at),
          stopAt: new Date(stop_at),
          status: 'onTraining',
        })
        return callback(null, {
          status: 'success',
          message: '狀態已更新成訓練中',
          data: updateResult.status,
        })
      }
    } catch (err) {
      console.log('toggleStatus err: ', err)
      return callback({ status: 'error', message: err })
    }
  },
  getTraineesData: async (req, callback) => {
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
