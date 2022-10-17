const multer = require('multer')

//multer setting
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './avatars/')
  },
  filename: function (req, file, cb) {
    try {
      cb(null, req.params.id + '_avatar.' + file.mimetype.split('/')[1])
    } catch (err) {
      cb({ status: 'error', message: err })
    }
  },
})

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb({ status: 'error', message: '僅接受Jpeg、png圖檔' })
  }
}

const avatarUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
})

module.exports = {
  avatarUpload,
}
