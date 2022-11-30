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
            body_composition: 'BaatInbody',
            grip_strength: 'BaatGripStrength',
            CMJ: 'BaatCmj',
            IMTP: 'BaatImtp',
            wingate_test: 'BaatWingateTest',
          }
          dbColumnName = {
            body_composition: 'baat_inbody_id',
            grip_strength: 'baat_grip_strength_id',
            CMJ: 'baat_cmj_id',
            IMTP: 'baat_imtp_id',
            wingate_test: 'baat_wingate_test_id',
          }
          dbRelateShipName = {
            body_composition: 'BaatUserShip',
            grip_strength: 'BaatUserShip',
            CMJ: 'BaatUserShip',
            IMTP: 'BaatUserShip',
            wingate_test: 'BaatUserShip',
          }
        } else if (lab === 'snc') {
          dbModelName = { Snc_inbodies: 'SncInbody' }
          dbColumnName = { Snc_inbodies: 'SncInbodyId' }
          dbRelateShipName = { Snc_inbodies: 'SncUserShip' }
        } else if (lab === 'spc') {
          dbModelName = { Spcs: 'Spc' }
          dbColumnName = { Spcs: 'SpcId' }
          dbRelateShipName = { Spcs: 'SpcUserShip' }
        } else if (lab === 'ssta') {
          dbModelName = {
            Ssta_inbodies: 'SstaInbody',
            Ssta_boat_2kms: 'SstaBoat2km',
            Ssta_boat_30s: 'SstaBoat30',
            Ssta_Bw: 'SstaBw',
            Ssta_football_20ms: 'SstaFootball20m',
            Ssta_Football_505: 'SstaFootball505',
            Ssta_football_lights: 'SstaFootballLight',
            Ssta_cycling_vo2s: 'SstaCyclingVo2',
          }
          dbColumnName = {
            Ssta_inbodies: 'SstaInbodyId',
            Ssta_boat_2kms: 'ssta_boat_2km_id',
            Ssta_boat_30s: 'ssta_boat_30_id',
            Ssta_Bw: 'ssta_bw_id',
            Ssta_football_20ms: 'ssta_football_20m_id',
            Ssta_football_505s: 'ssta_football_505_id',
            Ssta_football_lights: 'ssta_football_light_id',
            Ssta_cycling_vo2s: 'ssta_cycling_vo2_id',
          }
          dbRelateShipName = {
            Ssta_inbodies: 'SstaUserShip',
            Ssta_boat_2kms: 'SstaUserShip',
            Ssta_boat_30s: 'SstaUserShip',
            Ssta_Bw: 'SstaUserShip',
            Ssta_football_20ms: 'SstaUserShip',
            Ssta_football_505s: 'SstaUserShip',
            Ssta_football_lights: 'SstaUserShip',
            Ssta_cycling_vo2s: 'SstaUserShip',
          }
        } else if (lab === 'ssta2') {
          dbModelName = {
            Ssta2_lest: 'Ssta2LEST',
            Ssta2_uest: 'Ssta2UEST',
            Ssta2_sebt: 'Ssta2SEBT',
            Ssta2_fms: 'Ssta2FMS',
          }
          dbColumnName = {
            Ssta2_lest: 'ssta2_lest_id',
            Ssta2_uest: 'ssta2_uest_id',
            Ssta2_sebt: 'ssta2_sebt_id',
            Ssta2_fms: 'ssta2_fms_id',
          }
          dbRelateShipName = {
            Ssta2_lest: 'Ssta2UserShip',
            Ssta2_uest: 'Ssta2UserShip',
            Ssta2_sebt: 'Ssta2UserShip',
            Ssta2_fms: 'Ssta2UserShip',
          }
        }

        const { fileName, detect_at } = req.body
        const date = new Date(detect_at)
        const csvData = await parser(fileName, `./public/Labs/${lab}/`)
        const key = csvData[0]
        const value = csvData.slice(1)
        await Promise.all(
          value.map(async (_value) => {
            const id = _value[0]
            const user_id = await getUserId(id)
            for (let i = 0, j = _value.length; i < j; i++) {
              const result = await db[dbModelName[fileName]].create({
                key: key[i],
                value: _value[i],
                detect_at: date,
                created_at: new Date(),
                updated_at: new Date(),
              })
              await db[dbRelateShipName[fileName]].create({
                user_id,
                [dbColumnName[fileName]]: result.id,
                created_at: new Date(),
                updated_at: new Date(),
              })
            }
          })
        )

        return callback(null, { status: 'success', message: '資料上傳成功' })
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
      const foundData = await db.SrcUserShip.findOne({
        where: {
          [Op.and]: [
            { id_number: id_number },
            { detect_at: { [Op.gte]: detect_at } },
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
          detect_at,
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
        db.SrcUserShip.update(
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
      const { dbName, id_number, detect_at } = req.body
      const result = await db.SrcUserShip.findOne({
        where: {
          [Op.and]: [{ id_number }, { detect_at: { [Op.gte]: detect_at } }],
        },
      })
      if (result) {
        const srcData = await db[dbName].findByPk(result.src_id, { raw: true })
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
  uploadSsta2Template: async (req, callback) => {
    try {
      return callback(null, {
        status: 'success',
        message: '表單上傳成功',
      })
    } catch (err) {
      console.log(err)
      return callback(null, {
        status: 'success',
        message: '表單上傳失敗，請稍後再試',
      })
    }
  },
}

module.exports = analystServices
