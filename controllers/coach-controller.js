const coachServices = require('../services/coach-services')

const coachController = {
  getTrainees: (req, res, next) => {
    coachServices.getTrainees(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
}

module.exports = coachController
