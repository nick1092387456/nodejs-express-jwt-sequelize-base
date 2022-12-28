const userServices = require('../services/user-services')

const userController = {
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  sendVerifyEmail: (req, res, next) => {
    userServices.sendVerifyEmail(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  sendResetEmail: (req, res, next) => {
    userServices.sendResetEmail(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  verifyEmail: (req, res, next) => {
    userServices.verifyEmail(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  resetPassword: (req, res, next) => {
    userServices.resetPassword(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getCurrentUsers: (req, res, next) => {
    userServices.getCurrentUsers(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getUserRoles: (req, res, next) => {
    userServices.getUserRoles(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getBaat: (req, res, next) => {
    userServices.getBaat(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getSnc: (req, res, next) => {
    userServices.getSnc(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getSpc: (req, res, next) => {
    userServices.getSpc(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getSsta: (req, res, next) => {
    userServices.getSsta(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getSsta2: (req, res, next) => {
    userServices.getSsta2(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getSrc: (req, res, next) => {
    userServices.getSrc(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  getUserFileList: (req, res, next) => {
    userServices.getUserFileList(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  downloadUserFile: (req, res, next) => {
    userServices.downloadUserFile(req, (err, data) => {
      if (err) next(err)
      if (data.status === 'error') res.status(200).json(data)
      res.download(data.filePath)
    })
  },
  editUserFileName: (req, res, next) => {
    userServices.editUserFileName(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  deleteUserFile: (req, res, next) => {
    userServices.deleteUserFile(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  uploadUserFile: (req, res, next) => {
    userServices.uploadUserFile(req, res, (err, data) => {
      err ? next(err) : res.status(200).json(data)
    })
  },
  passwordEdit: (req, res, next) => {
    userServices.passwordEdit(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
  passwordInputCheck: (req, res, next) => {
    userServices.passwordInputCheck(req, (err, data) =>
      err ? next(err) : res.status(200).json(data)
    )
  },
}

module.exports = userController
