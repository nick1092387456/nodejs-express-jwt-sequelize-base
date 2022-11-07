const coachServices = require('../services/coach-services')

const coachController = {
  getTraineesData: (req, res, next) => {
    coachServices.getTraineesData(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getTrainees: (req, res, next) => {
    coachServices.getTrainees(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  toggleStatus: (req, res, next) => {
    coachServices.toggleStatus(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getTraineesFabData: (req, res, next) => {
    coachServices.getTraineesFabData(req, (err, data) => {
      err ? next(err) : res.status(200).json(data)
    })
  },
}

module.exports = coachController
