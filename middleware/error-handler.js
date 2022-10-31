module.exports = {
  generalErrorHandler(err, req, res) {
    if (err instanceof Error) {
      res.status(401).json(err)
      return
    } else {
      res.status(500).json(err)
      return
    }
  },
}
