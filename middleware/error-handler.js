module.exports = {
  generalErrorHandler(err, req, res) {
    if (err instanceof Error) {
      console.log('Error Handle 401')
      res.status(401).json(err)
      return
    } else {
      console.log('Error Handle 500')
      res.status(500).end()
      return
    }
  },
}
