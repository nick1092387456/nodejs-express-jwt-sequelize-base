const userServices = {
  getUsers: (req, callback) => {
    try {
      return callback(null, {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      })
    } catch (err) {
      return callback(err)
    }
  },
}

module.exports = userServices
