const multer = require('multer')
const util = require('util')

//multer setting
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { id } = req.user
    cb(null, `./public/Users/${id}`)
  },
  filename: function (req, file, cb) {
    try {
      cb(null, file.originalname)
    } catch (err) {
      return cb(err, null)
    }
  },
})

const fileFilter = (req, file, cb) => {
  const avaliableType = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'audio/mp4a-latm',
    'audio/mpeg',
    'application/zip',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/xml',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'text/plain',
    'video/quicktime',
    'video/mp4',
    'video/x-flv',
    'video/x-msvideo',
    'video/x-ms-wmv',
  ]

  if (avaliableType.indexOf(file.mimetype) === -1) {
    cb(
      '圖片僅接受 Jpeg、Jpg、Png。 影音:mp4、mpeg、mov、flv、wmv、avi。應用:zip、pdf、doc、docx、xls、xlsx、csv'
    )
  }

  cb(null, true)
}

const uploadFiles = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array('myFiles')

const userFileUpload = util.promisify(uploadFiles)

module.exports = userFileUpload
