const analystServices = require('../services/analyst-services')

const analystController = {
  getTemplate: (req, res, next) => {
    analystServices.getTemplate(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  postTemplate: (req, res, next) => {
    analystServices.postTemplate(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  uploadTemplate: (req, res, next) => {
    analystServices.uploadTemplate(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  reviewTemplate: (req, res, next) => {
    analystServices.reviewTemplate(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  downloadTemplate: (req, res, next) => {
    analystServices.downloadTemplate(req, (err, data) => {
      if (err) next(err)
      res.download(data.filePath)
    })
  },
}

module.exports = analystController
