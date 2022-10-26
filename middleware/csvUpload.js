const multer = require('multer')

//multer setting
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Labs/baat/')
  },
  filename: function (req, file, cb) {
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
