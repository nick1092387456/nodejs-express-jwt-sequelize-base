const db = require('../models')
const { Op } = require('sequelize')

const lab_correspondence_ship = {
  baat: 'BaatUserShip',
  snc: 'SncUserShip',
  ssta: 'SstaUserShip',
  ssta2: 'Ssta2UserShip',
  src: 'SrcUserShip',
  spc: 'SpcUserShip',
  sptc: 'SptcUserShip',
}

const coachServices = {
  getTraineesShip: async (req, callback) => {
    try {
      const { id } = req.user

      const data = await db.CoachAthleteShip.findAll({
        where: { coach_id: id },
        attributes: ['athlete_id', 'start_at', 'stop_at', 'status', 'sport'],
        raw: true,
      })

      if (!data) {
        return callback(null, {
          status: 'error',
          message: '您目前沒有指導中的運動員',
        })
      }

      const result = await Promise.all(
        data.map(async (student) => {
          const studentData = await db.User.findByPk(student.athlete_id, {
            attributes: [
              'name',
              'email',
              'avatar',
              'gender',
              'birthday',
              'sport',
            ],
            raw: true,
          })
          return { ...student, ...studentData }
        })
      )

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
  getTraineesByDate: async (req, callback) => {
    try {
      const { sport } = req.user
      const date = Object.keys(req.query)[0]

      const user = await db.User.findAll({
        where: {
          [Op.and]: [
            { sport: sport },
            { duty: 'Athlete' },
            { created_at: { [Op.gte]: date } },
          ],
        },
        attributes: ['id', 'name', 'avatar'],
        raw: true,
      })
      if (!user) {
        return callback(null, {
          status: 'error',
          message: '您目前沒有指導中的運動員',
        })
      }
      return callback(null, {
        status: 'success',
        message: '學員資料抓取成功',
        user: user,
      })
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
  addTrainees: async (req, callback) => {
    try {
      const athlete_id_list = req.body.athletes
      const coach_id = req.user.id
      const sport = req.user.sport

      const recordExist = await Promise.all(
        athlete_id_list.map(async (athlete_id) => {
          //檢查是否受訓中
          const exist = await db.CoachAthleteShip.findOne({
            where: {
              [Op.and]: [
                {
                  coach_id,
                  athlete_id,
                  stop_at: { [Op.is]: null },
                },
              ],
            },
            raw: true,
          })
          if (exist) return exist

          //檢查是否有受訓紀錄，有的話會抓停訓日為開訓日
          const record = await db.CoachAthleteShip.findOne({
            where: {
              [Op.and]: [
                {
                  coach_id,
                  athlete_id,
                  stop_at: { [Op.not]: null },
                },
              ],
            },
            order: [['created_at', 'DESC']],
            raw: true,
          })

          if (record) {
            await db.CoachAthleteShip.create({
              coachId: coach_id,
              athleteId: athlete_id,
              start_at: record.stop_at,
              status: 'onTraining',
              sport,
            })
            return
          }

          if (!exist) {
            const thisYear = new Date().getFullYear()
            await db.CoachAthleteShip.create({
              coachId: coach_id,
              athleteId: athlete_id,
              start_at: new Date(thisYear, 0, 1),
              status: 'onTraining',
              sport,
            })
          }
        })
      )

      if (!recordExist.includes(undefined)) {
        return callback(null, {
          status: 'error',
          message: '新增清單中有已在受訓中的運動員',
          data: recordExist,
        })
      }

      return callback(null, {
        status: 'success',
        message: '運動員新增完畢',
        data: '',
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  setStopTraining: async (req, callback) => {
    try {
      const { athlete_id } = req.body
      const coach_id = req.user.id
      await db.CoachAthleteShip.update(
        { status: 'stopTraining', stop_at: new Date() },
        {
          where: {
            [Op.and]: [
              {
                athleteId: athlete_id,
                coachId: coach_id,
                status: 'onTraining',
              },
            ],
          },
        }
      )
      return callback(null, {
        status: 'success',
        message: '學員狀態已切換成停止訓練',
      })
    } catch (err) {
      return callback({ status: 'error', message: err })
    }
  },
  getTraineesData: async (req, callback) => {
    try {
      const { athleteId, labName } = req.body
      let traineesData = null

      if (labName === 'baat') {
        traineesData = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatInbody,
              as: 'Baat_inbodies',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.BaatGripStrength,
              as: 'Baat_grip_strengths',
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
      }
      if (labName === 'snc') {
        traineesData = await db.User.findByPk(athleteId, {
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
      if (labName === 'spc') {
        traineesData = await db.User.findByPk(athleteId, {
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
      }
      if (labName === 'ssta') {
        traineesData = await db.User.findByPk(athleteId, {
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
      }
      if (labName === 'ssta2') {
        traineesData = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2FMS,
              as: 'Ssta2_fm',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.Ssta2LEST,
              as: 'Ssta2_lest',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.Ssta2SEBT_L,
              as: 'Ssta2_sebt_l',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.Ssta2SEBT_R,
              as: 'Ssta2_sebt_r',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.Ssta2UEST,
              as: 'Ssta2_uest',
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
  getTraineesDate: async (req, callback) => {
    try {
      let { labName, athlete_id, start_at, stop_at } = req.body
      stop_at = stop_at.map((_stop_at) => {
        if (!_stop_at) return new Date()
      })
      const dateList = await db[lab_correspondence_ship[labName]].findAll({
        where: {
          [Op.and]: [
            { user_id: athlete_id },
            { created_at: { [Op.gte]: start_at[0] } },
            { created_at: { [Op.lte]: stop_at[0] } },
          ],
        },
        attributes: ['detect_at'],
        raw: true,
      })
      return callback(null, {
        status: 'success',
        data: dateList,
      })
    } catch (err) {
      console.log(err)
      return callback({ status: 'error', message: err })
    }
  },
  getTraineesFabData: async (req, callback) => {
    try {
      //todo:增加一個檢查memberList是否是req.user(coach)下的學生才能查資料
      const { lab, memberList } = req.body
      let result = null
      if (lab === 'baat') {
        result = await db.User.findAll({
          where: { id: memberList },
          attributes: ['id', 'name'],
          include: [
            {
              model: db.BaatInbody,
              as: 'Baat_inbodies',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
            {
              model: db.BaatGripStrength,
              as: 'Baat_grip_strengths',
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
      }
      if (lab === 'snc') {
        result = await db.User.findAll({
          where: { id: memberList },
          attributes: ['id', 'name'],
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
      if (lab === 'spc') {
        result = await db.User.findAll({
          where: { id: memberList },
          attributes: ['id', 'name'],
          include: [
            {
              model: db.Spc,
              as: 'Spc',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
            },
          ],
        })
      }
      if (lab === 'ssta') {
        result = await db.User.findAll({
          where: { id: memberList },
          attributes: ['id', 'name'],
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
      }

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
