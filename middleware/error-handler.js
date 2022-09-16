module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      console.log('instance error')
      res.status(401).json(err)
    } else {
      res.status(err.status).json(err)
    }
    next(err)
  },
}
