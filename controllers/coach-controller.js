const coachServices = require('../services/coach-services')

const coachController = {
  getTraineesData: (req, res, next) => {
    coachServices.getTraineesData(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getTraineesDate: (req, res, next) => {
    coachServices.getTraineesDate(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getTraineesShip: (req, res, next) => {
    coachServices.getTraineesShip(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getTraineesByDate: (req, res, next) => {
    coachServices.getTraineesByDate(req, (err, data) =>
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
