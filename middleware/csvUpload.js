const multer = require('multer')
const db = require('../models')
const { Role } = db

//multer setting
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const analystId = req.user.id
    const analystRole = await Role.findByPk(analystId, {
      raw: true,
      attributes: ['baat', 'snc', 'ssta', 'ssta2', 'src', 'spc', 'sptc'],
    }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
    req.lab = analystRole
    cb(null, `./public/Labs/${analystRole}/`)
  },
  filename: async function (req, file, cb) {
    try {
      const obj = Object.assign({}, req.body)
      cb(null, obj.fileName + '.csv')
    } catch (err) {
      cb({ status: 'error', message: err })
    }
  },
})

//reject a file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true)
  } else {
    cb({ status: 'error', message: '僅接受CSV類型檔案' })
  }
}

const csvUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: fileFilter,
})

module.exports = {
  csvUpload,
}
