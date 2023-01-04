const db = require('../models')
const { Op } = require('sequelize')

const lab_correspondence_ship = {
  baat: 'BaatUserShip',
  snc: 'SncUserShip',
  ssta: 'SstaUserShip',
  ssta2: 'Ssta2UserShip',
  src: 'SrcUserShip',
  spc: 'SpcUserShip',
  // sptc: 'SptcUserShip',
}

const lab_column_id = {
  baat: ['baat_inbody_id'],
  snc: ['snc_inbody_id'],
  ssta: ['ssta_inbody_id'],
  ssta2: ['ssta2_lest_id'],
  src: ['src_id'],
  spc: ['spc_id'],
  // sptc: ['sptc_id'],
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
      const coachId = req.user.id
      const athleteRecord = await db.CoachAthleteShip.findOne({
        where: { [Op.and]: [{ athleteId: athleteId }, { coachId: coachId }] },
        order: [['created_at', 'DESC']],
        limit: 1,
        raw: true,
      })
      let { start_at, stop_at } = athleteRecord
      if (!stop_at) stop_at = new Date()
      let traineesData = null

      if (labName === 'baat') {
        const { Baat_inbodies } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatInbody,
              as: 'Baat_inbodies',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_grip_strengths } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatGripStrength,
              as: 'Baat_grip_strengths',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_cmj } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatCmj,
              as: 'Baat_cmj',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_imtp } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatImtp,
              as: 'Baat_imtp',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_wingate_test } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatWingateTest,
              as: 'Baat_wingate_test',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_static_balance } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatStaticBalance,
              as: 'Baat_static_balance',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Baat_dynamic_balance } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.BaatDynamicBalance,
              as: 'Baat_dynamic_balance',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        traineesData = {
          Baat_inbodies,
          Baat_grip_strengths,
          Baat_cmj,
          Baat_imtp,
          Baat_wingate_test,
          Baat_static_balance,
          Baat_dynamic_balance,
        }
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
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
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
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
      }
      if (labName === 'ssta') {
        const { Ssta_inbody } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaInbody,
              as: 'Ssta_inbody',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_boat_2km } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaBoat2km,
              as: 'Ssta_boat_2km',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_boat_30 } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaBoat30,
              as: 'Ssta_boat_30',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_bw } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaBw,
              as: 'Ssta_bw',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_cycling_vo2 } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaCyclingVo2,
              as: 'Ssta_cycling_vo2',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_football_20m } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaFootball20m,
              as: 'Ssta_football_20m',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_football_505 } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaFootball505,
              as: 'Ssta_football_505',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta_football_light } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.SstaFootballLight,
              as: 'Ssta_football_light',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        traineesData = {
          Ssta_inbody,
          Ssta_boat_30,
          Ssta_boat_2km,
          Ssta_bw,
          Ssta_football_20m,
          Ssta_football_505,
          Ssta_football_light,
          Ssta_cycling_vo2,
        }
      }
      if (labName === 'ssta2') {
        const { Ssta2_fms } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2FMS,
              as: 'Ssta2_fms',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta2_lest } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2LEST,
              as: 'Ssta2_lest',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta2_sebt_l } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2SEBT_L,
              as: 'Ssta2_sebt_l',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta2_sebt_r } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2SEBT_R,
              as: 'Ssta2_sebt_r',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })
        const { Ssta2_uest } = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Ssta2UEST,
              as: 'Ssta2_uest',
              attributes: ['id', 'key', 'value', 'detect_at'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
            },
          ],
        })

        traineesData = {
          Ssta2_uest,
          Ssta2_lest,
          Ssta2_fms,
          Ssta2_sebt_r,
          Ssta2_sebt_l,
        }
      }
      if (labName === 'src') {
        traineesData = await db.User.findByPk(athleteId, {
          attributes: [],
          include: [
            {
              model: db.Src,
              as: 'Src',
              attributes: ['id', 'data'],
              through: { attributes: [] },
              where: {
                created_at: {
                  [Op.and]: [{ [Op.gte]: start_at }, { [Op.lte]: stop_at }],
                },
              },
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
      let { labName, athleteName, athlete_id, start_at, stop_at } = req.body
      const dateList = await Promise.all(
        start_at.map(async (_start_at, index) => {
          if (!stop_at[index]) stop_at[index] = new Date()
          const queryDate = await db[lab_correspondence_ship[labName]].findAll({
            where: {
              [Op.and]: [
                { [lab_column_id[labName]]: { [Op.not]: null } },
                { user_id: athlete_id },
                {
                  created_at: {
                    [Op.and]: [
                      { [Op.gte]: start_at[index] },
                      { [Op.lte]: stop_at[index] },
                    ],
                  },
                },
              ],
            },
            attributes: ['detect_at'],
            raw: true,
          })
          const dateFormated = queryDate.map((data) => {
            return new Date(data.detect_at).toISOString().substring(0, 10)
          })
          const dateRemoveDuplicate = dateFormated.filter(
            (date, index, arr) => {
              return arr.indexOf(date) === index
            }
          )
          const result = [{ header: athleteName }]
          dateRemoveDuplicate.map((date) => {
            result.push({
              name: `${athleteName} ${date}`,
              value: date,
            })
          })
          return result
        })
      )
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
      const { lab, athleteData, dateList } = req.body
      let result = []
      if (lab === 'baat') {
        await Promise.all(
          athleteData.map(async (athlete) => {
            await Promise.all(
              dateList.map(async (data) => {
                const Baat_inbodies = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatInbody,
                      as: 'Baat_inbodies',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_grip_strengths = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatGripStrength,
                      as: 'Baat_grip_strengths',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_cmj = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatCmj,
                      as: 'Baat_cmj',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_imtp = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatImtp,
                      as: 'Baat_imtp',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_wingate_test = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatWingateTest,
                      as: 'Baat_wingate_test',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_static_balance = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatStaticBalance,
                      as: 'Baat_static_balance',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                const Baat_dynamic_balance = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.BaatDynamicBalance,
                      as: 'Baat_dynamic_balance',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                result.push({
                  id: athlete.id,
                  name: athlete.name,
                  Baat_inbodies: Baat_inbodies[0].Baat_inbodies,
                  Baat_grip_strengths:
                    Baat_grip_strengths[0].Baat_grip_strengths,
                  Baat_cmj: Baat_cmj[0].Baat_cmj,
                  Baat_imtp: Baat_imtp[0].Baat_imtp,
                  Baat_wingate_test: Baat_wingate_test[0].Baat_wingate_test,
                  Baat_static_balance:
                    Baat_static_balance[0].Baat_static_balance,
                  Baat_dynamic_balance:
                    Baat_dynamic_balance[0].Baat_dynamic_balance,
                })
              })
            )
          })
        )
      }
      if (lab === 'snc') {
        await Promise.all(
          athleteData.map(async (athlete) => {
            await Promise.all(
              dateList.map(async (data) => {
                result = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SncInbody,
                      as: 'Snc_inbody',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
              })
            )
          })
        )
      }
      if (lab === 'spc') {
        await Promise.all(
          athleteData.map(async (athlete) => {
            await Promise.all(
              dateList.map(async (data) => {
                result = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Spc,
                      as: 'Spc',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
              })
            )
          })
        )
      }
      if (lab === 'ssta') {
        await Promise.all(
          athleteData.map(async (athlete) => {
            await Promise.all(
              dateList.map(async (data) => {
                const Ssta_inbody = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaInbody,
                      as: 'Ssta_inbody',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_boat_2km = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaBoat2km,
                      as: 'Ssta_boat_2km',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_boat_30 = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaBoat30,
                      as: 'Ssta_boat_30',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_bw = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaBw,
                      as: 'Ssta_bw',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_cycling_vo2 = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaCyclingVo2,
                      as: 'Ssta_cycling_vo2',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_football_20m = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaFootball20m,
                      as: 'Ssta_football_20m',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_football_505 = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaFootball505,
                      as: 'Ssta_football_505',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta_football_light = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.SstaFootballLight,
                      as: 'Ssta_football_light',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                result.push({
                  id: athlete.id,
                  name: athlete.name,
                  Ssta_inbody: Ssta_inbody[0].Ssta_inbody,
                  Ssta_boat_2km: Ssta_boat_2km[0].Ssta_boat_2km,
                  Ssta_boat_30: Ssta_boat_30[0].Ssta_boat_30,
                  Ssta_bw: Ssta_bw[0].Ssta_bw,
                  Ssta_cycling_vo2: Ssta_cycling_vo2[0].Ssta_cycling_vo2,
                  Ssta_football_20m: Ssta_football_20m[0].Ssta_football_20m,
                  Ssta_football_505: Ssta_football_505[0].Ssta_football_505,
                  Ssta_football_light:
                    Ssta_football_light[0].Ssta_football_light,
                })
              })
            )
          })
        )
      }
      if (lab === 'ssta2') {
        await Promise.all(
          athleteData.map(async (athlete) => {
            await Promise.all(
              dateList.map(async (data) => {
                const Ssta2_fms = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Ssta2FMS,
                      as: 'Ssta2_fms',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta2_lest = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Ssta2LEST,
                      as: 'Ssta2_lest',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta2_sebt_l = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Ssta2SEBT_L,
                      as: 'Ssta2_sebt_l',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta2_sebt_r = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Ssta2SEBT_R,
                      as: 'Ssta2_sebt_r',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })
                const Ssta2_uest = await db.User.findAll({
                  where: { id: athlete.id },
                  attributes: [],
                  include: [
                    {
                      model: db.Ssta2UEST,
                      as: 'Ssta2_uest',
                      attributes: ['id', 'key', 'value', 'detect_at'],
                      through: { attributes: [] },
                      where: {
                        detect_at: {
                          [Op.eq]: new Date(data.value),
                        },
                      },
                    },
                  ],
                })

                result.push({
                  id: athlete.id,
                  name: athlete.name,
                  Ssta2_fms: Ssta2_fms[0].Ssta2_fms,
                  Ssta2_lest: Ssta2_lest[0].Ssta2_lest,
                  Ssta2_sebt_l: Ssta2_sebt_l[0].Ssta2_sebt_l,
                  Ssta2_sebt_r: Ssta2_sebt_r[0].Ssta2_sebt_r,
                  Ssta2_uest: Ssta2_uest[0].Ssta2_uest,
                })
              })
            )
          })
        )
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
