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
  getTrainees2: (req, res, next) => {
    coachServices.getTrainees2(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  addTrainees: (req, res, next) => {
    coachServices.addTrainees(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  setStopTraining: (req, res, next) => {
    coachServices.setStopTraining(req, (err, data) =>
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
