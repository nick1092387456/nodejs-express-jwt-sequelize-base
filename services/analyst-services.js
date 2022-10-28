const fs = require('fs')
const path = require('path')
const parser = require('../tools/csvParser')
const writer = require('../tools/csvWriter')
const db = require('../models')
const { User, Baat_user_ship } = db

const directoryPath = path.resolve(process.cwd(), `./public/Labs/baat/template`)

const analystServices = {
  getTemplate: async (req, callback) => {
    try {
      const files = await fs.readdirSync(directoryPath)
      const nameList = files.map((item) => item.split('.csv')[0])
      if (!files) {
        throw new Error({
          status: 'error',
          message: '資料庫中沒有檔案，請先聯絡管理員上傳範本',
        })
      }
      const tagList = await files.reduce(async (accp, cur, idx) => {
        const fileName = nameList[idx]
        const data = await parser(fileName, './public/Labs/baat/template/')
        let acc = await accp //reduce是整個函式遞迴需要使用await等待前一次的自己執行完畢
        return (acc = await { ...acc, [fileName]: data[0] })
      }, {})

      return callback(null, {
        status: 'success',
        data: { filesList: nameList, tagsList: tagList },
      })
    } catch (err) {
      return callback(err)
    }
  },
  postTemplate: async (req, callback) => {
    try {
      const { label, fileName } = req.body
      const data = label.map((item) => ({ title: item.name }))
      const result = await writer(
        fileName,
        data,
        './public/Labs/baat/template/'
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
      if (!req.body.fileName || !req.file || !req.body.detect_at) {
        return callback(null, {
          status: 'error',
          message: '請選擇要上傳的CSV資料、類型、檢測日期',
        })
      }

      if (req.file) {
        const dbModelName = {
          body_composition: 'BaatInbody',
          grip_strength: 'BaatGripStrength',
          CMJ: 'baat_cmj',
          IMTP: 'baat_imtp',
          wingate_test: 'baat_wingate_test',
        }
        const dbColumnName = {
          body_composition: 'Baat_inbody_id',
          grip_strength: 'Baat_grip_strength_id',
          CMJ: 'baat_cmj_id',
          IMTP: 'baat_imtp_id',
          wingate_test: 'baat_wingate_test_id',
        }

        const { fileName, detect_at } = req.body
        const date = new Date(detect_at)
        const csvData = await parser(fileName, './public/Labs/baat/')
        const key = csvData[0]
        const value = csvData.slice(1)
        await Promise.all(
          value.map(async (_value) => {
            const id = _value[0]
            const user = await User.findOne({
              where: { idNumber: id },
              raw: true,
            })
            for (let i = 0, j = _value.length; i < j; i++) {
              const result = await db[dbModelName[fileName]].create({
                key: key[i],
                value: _value[i],
                detect_at: date,
                created_at: new Date(),
                updated_at: new Date(),
              })

              await Baat_user_ship.create({
                [dbColumnName[fileName]]: result.id,
                user_id: user ? user.id : id,
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
    }
  },
  reviewTemplate: async (req, callback) => {
    try {
      const fileName = Object.keys(req.query)[0]
      const data = await parser(fileName, './public/Labs/baat/')

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
      // const { templateName } = req.query
      const fileName = Object.keys(req.query)[0]
      const filePath = await path.resolve(
        process.cwd(),
        `./public/Labs/baat/template/${fileName}.csv`
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
      return callback(err)
    }
  },
}

module.exports = analystServices
