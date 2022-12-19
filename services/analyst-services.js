const fs = require('fs')
const path = require('path')
const parser = require('../tools/csvParser')
const writer = require('../tools/csvWriter')
const { getUserId } = require('../tools/getUserId')
const db = require('../models')
const { Op } = require('sequelize')

const analystServices = {
  getTemplate: async (req, callback) => {
    try {
      const analystId = req.user.id
      const analystRole = await db.Role.findOne({
        where: { user_id: analystId },
        attributes: ['baat', 'snc', 'ssta', 'ssta2', 'src', 'spc', 'sptc'],
        raw: true,
      }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
      const directoryPath = path.resolve(
        process.cwd(),
        `./public/Labs/${analystRole}/template`
      )
      const files = await fs.readdirSync(directoryPath)
      const nameList = files.map((item) => item.split('.csv')[0])

      if (!files.length) {
        return callback(null, {
          status: 'error',
          message: '資料庫中沒有檔案，請先聯絡管理員上傳範本',
        })
      }
      const tagList = await files.reduce(async (accp, cur, idx) => {
        const fileName = nameList[idx]
        const data = await parser(
          fileName,
          `./public/Labs/${analystRole}/template/`
        )
        let acc = await accp //reduce是整個函式遞迴需要使用await等待前一次的自己執行完畢
        return (acc = await { ...acc, [fileName]: data[0] })
      }, {})

      return callback(null, {
        status: 'success',
        data: { filesList: nameList, tagsList: tagList },
      })
    } catch (err) {
      console.log('getTemplate error: ', err)
      return callback(null, {
        status: 'error',
        message: err,
      })
    }
  },
  putTemplate: async (req, callback) => {
    try {
      const analystId = req.user.id
      const analystRole = await db.Role.findOne({
        where: { user_id: analystId },
        raw: true,
        attributes: ['baat', 'snc', 'ssta', 'ssta2', 'src', 'spc', 'sptc'],
      }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
      const { label, fileName } = req.body
      const data = label.map((item) => ({ title: item.name }))
      const result = await writer(
        fileName,
        data,
        `./public/Labs/${analystRole}/template/`
      )
      if (!result.success) {
        return callback(null, { status: 'error', message: '資料更新失敗' })
      }
      return callback(null, { status: 'success', message: '資料更新成功' })
    } catch (err) {
      return callback(err)
    }
  },
  uploadTemplate: async (req, callback) => {
    try {
      const { lab } = req
      if (!req.body.fileName || !req.file || !req.body.detect_at) {
        return callback(null, {
          status: 'error',
          message: '請選擇要上傳的CSV資料、類型、檢測日期',
        })
      }
      if (req.file) {
        let dbModelName = {}
        let dbColumnName = {}
        let dbRelateShipName = {}
        if (lab === 'baat') {
          dbModelName = {
            身體組成: 'BaatInbody',
            雙手握力: 'BaatGripStrength',
            垂直爆發力: 'BaatCmj',
            等長肌爆發力: 'BaatImtp',
            '30秒無氧動力': 'BaatWingateTest',
          }
          dbColumnName = {
            身體組成: 'baat_inbody_id',
            雙手握力: 'baat_grip_strength_id',
            垂直爆發力: 'baat_cmj_id',
            等長肌爆發力: 'baat_imtp_id',
            '30秒無氧動力': 'baat_wingate_test_id',
          }
          dbRelateShipName = {
            身體組成: 'BaatUserShip',
            雙手握力: 'BaatUserShip',
            垂直爆發力: 'BaatUserShip',
            等長肌爆發力: 'BaatUserShip',
            '30秒無氧動力': 'BaatUserShip',
          }
        } else if (lab === 'snc') {
          dbModelName = { 身體組成: 'SncInbody' }
          dbColumnName = { 身體組成: 'SncInbodyId' }
          dbRelateShipName = { 身體組成: 'SncUserShip' }
        } else if (lab === 'spc') {
          dbModelName = { 諮商向度評分量表: 'Spc' }
          dbColumnName = { 諮商向度評分量表: 'SpcId' }
          dbRelateShipName = { 諮商向度評分量表: 'SpcUserShip' }
        } else if (lab === 'ssta') {
          dbModelName = {
            身體組成: 'SstaInbody',
            '2000公尺划船衝刺': 'SstaBoat2km',
            '30秒反向划船動作': 'SstaBoat30',
            爆發力蹲踞跳: 'SstaBw',
            '20公尺衝刺': 'SstaFootball20m',
            '5-0-5改變方向能力': 'SstaFootball505',
            燈光敏捷能力: 'SstaFootballLight',
            最大攝氧量: 'SstaCyclingVo2',
          }
          dbColumnName = {
            身體組成: 'SstaInbodyId',
            '2000公尺划船衝刺': 'ssta_boat_2km_id',
            '30秒反向划船動作': 'ssta_boat_30_id',
            爆發力蹲踞跳: 'ssta_bw_id',
            '20公尺衝刺': 'ssta_football_20m_id',
            '5-0-5改變方向能力': 'ssta_football_505_id',
            燈光敏捷能力: 'ssta_football_light_id',
            最大攝氧量: 'ssta_cycling_vo2_id',
          }
          dbRelateShipName = {
            身體組成: 'SstaUserShip',
            '2000公尺划船衝刺': 'SstaUserShip',
            '30秒反向划船動作': 'SstaUserShip',
            爆發力蹲踞跳: 'SstaUserShip',
            '20公尺衝刺': 'SstaUserShip',
            '5-0-5改變方向能力': 'SstaUserShip',
            燈光敏捷能力: 'SstaUserShip',
            最大攝氧量: 'SstaUserShip',
          }
        } else if (lab === 'ssta2') {
          dbModelName = {
            下肢肌力: 'Ssta2LEST',
            上肢肌力: 'Ssta2UEST',
            星狀偏移平衡_左: 'Ssta2SEBT_L',
            星狀偏移平衡_右: 'Ssta2SEBT_R',
            功能性動作: 'Ssta2FMS',
          }
          dbColumnName = {
            下肢肌力: 'ssta2_lest_id',
            上肢肌力: 'ssta2_uest_id',
            星狀偏移平衡_左: 'ssta2_sebt_l_id',
            星狀偏移平衡_右: 'ssta2_sebt_r_id',
            功能性動作: 'ssta2_fms_id',
          }
          dbRelateShipName = {
            下肢肌力: 'Ssta2UserShip',
            上肢肌力: 'Ssta2UserShip',
            星狀偏移平衡_左: 'Ssta2UserShip',
            星狀偏移平衡_右: 'Ssta2UserShip',
            功能性動作: 'Ssta2UserShip',
          }
        }

        const { fileName, detect_at } = req.body
        const date = new Date(detect_at).toISOString().substring(0, 10)
        const csvData = await parser(fileName, `./public/Labs/${lab}/`)
        const key = csvData[0]
        const value = csvData.slice(1)
        await Promise.all(
          value.map(async (_value) => {
            const id_number = _value[0]
            const user_id = await getUserId(id_number)
            //查詢資料
            const data = await db[dbRelateShipName[fileName]].findOne({
              where: {
                [Op.and]: [
                  { [dbColumnName[fileName]]: { [Op.ne]: null } },
                  { id_number: id_number },
                  {
                    detect_at: {
                      [Op.eq]: new Date(date),
                    },
                  },
                ],
              },
            })

            if (!data) {
              //"新增"資料
              for (let i = 0, j = _value.length; i < j; i++) {
                const result = await db[dbModelName[fileName]].create({
                  key: key[i],
                  value: _value[i],
                  detect_at: date,
                  created_at: new Date(),
                  updated_at: new Date(),
                })
                await db[dbRelateShipName[fileName]].create({
                  id_number,
                  user_id,
                  detect_at: date,
                  [dbColumnName[fileName]]: result.id,
                  created_at: new Date(),
                  updated_at: new Date(),
                })
              }
              return callback(null, {
                status: 'success',
                message: '資料上傳成功',
              })
            } else {
              //"更新"資料
              for (let i = 0, j = _value.length; i < j; i++) {
                const result = await db[dbRelateShipName[fileName]].findAll({
                  where: {
                    [Op.and]: [
                      { [dbColumnName[fileName]]: { [Op.ne]: null } },
                      { id_number: id_number },
                      {
                        detect_at: {
                          [Op.eq]: new Date(date),
                        },
                      },
                    ],
                  },
                  raw: true,
                })

                await db[dbModelName[fileName]].update(
                  {
                    key: key[i],
                    value: _value[i],
                    detect_at: date,
                    updated_at: new Date(),
                  },
                  {
                    where: { id: result[i][dbColumnName[fileName]] },
                  }
                )
              }

              return callback(null, {
                status: 'success',
                message: '資料更新成功',
              })
            }
          })
        )
      }
    } catch (err) {
      console.log(err)
      return callback(null, { status: 'error', message: err })
    }
  },
  reviewTemplate: async (req, callback) => {
    try {
      const analystId = req.user.id
      const analystRole = await db.Role.findOne({
        where: { user_id: analystId },
        raw: true,
        attributes: ['baat', 'snc', 'ssta', 'ssta2', 'src', 'spc', 'sptc'],
      }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
      const fileName = Object.keys(req.query)[0]
      const data = await parser(fileName, `./public/Labs/${analystRole}/`)

      const header = data[0]
      const content = data.slice(1)
      const headerParse = header.reduce((acc, cur) => {
        return (acc = acc.concat({ text: cur, value: cur }))
      }, [])
      const contentParse = content.map((item) => {
        return item.reduce((acc, cur, idx) => {
          return (acc = { ...acc, [header[idx]]: cur })
        }, {})
      })
      return callback(null, {
        status: 'success',
        headers: headerParse,
        content: contentParse,
      })
    } catch (err) {
      return callback(err)
    }
  },
  downloadTemplate: async (req, callback) => {
    try {
      const analystId = req.user.id
      const analystRole = await db.Role.findOne({
        where: { user_id: analystId },
        raw: true,
        attributes: ['baat', 'snc', 'ssta', 'ssta2', 'src', 'spc', 'sptc'],
      }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
      const fileName = Object.keys(req.query)[0]
      const filePath = await path.resolve(
        process.cwd(),
        `./public/Labs/${analystRole}/template/${fileName}.csv`
      )
      if (!filePath) {
        return callback(null, {
          status: 'error',
          message: '找不到檔案，請聯絡管理員上傳範本',
        })
      }
      return callback(null, {
        status: 'success',
        filePath,
        fileName,
      })
    } catch (err) {
      return callback(null, { status: 'success', message: err })
    }
  },
  sendSRCForm: async (req, callback) => {
    try {
      const srcJSON = req.body.srcData
      const srcData = JSON.parse(srcJSON)
      const id_number = srcData.id
      const user_id = await getUserId(id_number)
      const detect_at = new Date(srcData.testDate)
      const date = new Date(detect_at).toISOString().substring(0, 10)
      const foundData = await db.SrcUserShip.findOne({
        where: {
          [Op.and]: [
            { src_id: { [Op.ne]: null } },
            { id_number: id_number },
            { detect_at: { [Op.eq]: new Date(date) } },
          ],
        },
      })
      if (!foundData) {
        const result = await db.Src.create({
          data: srcData,
          created_at: new Date(),
          updated_at: new Date(),
        })

        await db.SrcUserShip.create({
          user_id,
          src_id: result.id,
          id_number,
          detect_at: date,
          created_at: new Date(),
          updated_at: new Date(),
        })

        return callback(null, {
          status: 'success',
          message: '表單上傳成功',
        })
      } else {
        await db.Src.update(
          {
            data: srcData,
            updated_at: new Date(),
          },
          { where: { id: foundData.src_id } }
        )
        await db.SrcUserShip.update(
          {
            updated_at: new Date(),
          },
          { where: { id: foundData.id } }
        )

        return callback(null, {
          status: 'success',
          message: '表單更新成功',
        })
      }
    } catch (err) {
      return callback(null, {
        status: 'success',
        message: '表單上傳失敗，請稍後再試',
      })
    }
  },
  reviewSRCForm: async (req, callback) => {
    try {
      const { id_number, detect_at } = req.body

      const result = await db.SrcUserShip.findOne({
        where: {
          [Op.and]: [{ id_number }, { detect_at: { [Op.gte]: detect_at } }],
        },
      })
      if (result) {
        const srcData = await db.Src.findByPk(result.src_id, {
          raw: true,
        })
        return callback(null, {
          status: 'success',
          data: srcData.data,
          message: '查詢成功',
        })
      } else {
        return callback(null, {
          status: 'success',
          message: '查無此資料',
        })
      }
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'success',
        message: '查詢錯誤，請稍後再試',
      })
    }
  },
}

module.exports = analystServices
