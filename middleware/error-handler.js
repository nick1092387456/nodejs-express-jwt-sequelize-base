module.exports = {
  generalErrorHandler(err, req, res) {
    if (err instanceof Error) {
      res.status(401).json(err)
      return
    } else {
      console.log(err)
      res.status(500).end()
      return
    }
  },
}
