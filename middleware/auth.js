const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        throw { status: '401', message: '請先登入再使用' }
      }
      if (user) {
        req.user = user
        return next()
      }
    })(req, res, next)
  } catch (err) {
    next(err)
  }
}

const authenticatedAdmin = (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) return next()
      throw { status: 403, message: '你沒有管理員權限' }
    } else {
      throw { status: 401, message: '請先登入再使用' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin,
}
