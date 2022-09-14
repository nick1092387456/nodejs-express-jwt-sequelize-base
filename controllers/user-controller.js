const userServices = require('../services/user-services')

const userController = {
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  signIn: (req, res, next) => {
    console.log(req.body)
    userServices.signIn(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getUsers: (req, res, next) => {
    userServices.getUsers(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
}

module.exports = userController
