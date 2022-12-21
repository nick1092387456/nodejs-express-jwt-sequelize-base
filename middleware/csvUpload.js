const multer = require('multer')
const db = require('../models')
const { Role } = db

//multer setting
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const analystId = req.user.id
    const analystRole = await getRole(analystId)
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

//reject file role
const fileFilter = async (req, file, cb) => {
  //檢查檔案類型
  try {
    if (file.mimetype !== 'text/csv') {
      // throw new Error({ status: 'error', message: '僅接受CSV類型檔案' })
      return cb({ status: 'error', message: '僅接受CSV類型檔案' })
    }
    cb(null, true)
  } catch (err) {
    console.log('你好你好你好你好')
    cb(err)
  }
}

async function getRole(analystId) {
  const analystRole = await Role.findOne({
    where: { user_id: analystId },
    raw: true,
    attributes: ['baat', 'snc', 'ssta', 'ssta2', 'spc', 'sptc'],
  }).then((roles) => Object.entries(roles).filter((item) => item[1])[0][0])
  return analystRole
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
