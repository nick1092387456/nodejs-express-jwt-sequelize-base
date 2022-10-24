const fs = require('fs')
const path = require('path')
const parser = require('../tools/csvParser')
const writer = require('../tools/csvWriter')

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
      if (!req.fileName || !req.file) {
        return callback(null, {
          status: 'error',
          message: '請選擇要上傳的CSV資料及類型',
        })
      }
      if (req.file) {
        return callback(null, { status: 'success', message: '資料上傳成功' })
      }
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = analystServices
