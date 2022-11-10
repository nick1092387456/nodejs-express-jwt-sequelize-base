const db = require('../models')
const { Op } = require('sequelize')

const {
  User,
  BaatInbody,
  BaatGripStrength,
  BaatCmj,
  BaatImtp,
  BaatWingateTest,
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

      const result = user.reduce((acc, cur) => {
        for (let i = 0, j = careerData.length; i < j; i++) {
          if (cur.id === careerData[i].athlete_id) {
            return acc.concat({ ...cur, ...careerData[i] })
          }
        }
        return acc.concat({ ...cur })
      }, [])

      if (!user) {
        return callback(null, {
          status: 'error',
          message: '您目前沒有指導中的運動員',
        })
      }
      return callback(null, {
        status: 'success',
        message: '學員資料抓取成功',
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
      const { athleteId, labName } = req.body
      let traineesData = null

      if (labName === 'baat') {
        traineesData = await User.findByPk(athleteId, {
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
      }
      if (labName === 'snc') {
        traineesData = await User.findByPk(athleteId, {
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
      }

      if (!traineesData) {
        return callback(null, {
          status: 'error',
          message: '找不到資料或使用者',
        })
      }
      return callback(null, {
        status: 'success',
        data: traineesData,
      })
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
  getTraineesFabData: async (req, callback) => {
    try {
      const { lab, memberList } = req.body
      //todo: 依lab篩選inlcude實驗室套組
      console.log(lab)
      const result = await User.findAll({
        where: { id: memberList },
        attributes: ['id', 'name'],
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
      return callback(null, {
        status: 'success',
        message: '成功送出',
        data: result,
      })
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
}

module.exports = coachServices
