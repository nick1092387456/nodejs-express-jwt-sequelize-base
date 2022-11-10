const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user)
        return res.json({ status: 'error', message: '請先登入再使用' })
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
      return res.json({ status: 'error', message: '您沒有權限觀看或編輯' })
    } else {
      return res.json({ status: 'error', message: '請先登入再使用' })
    }
  } catch (err) {
    next(err)
  }
}

const isSelfUser = (req, res, next) => {
  if (req.params.id !== req.user.id.toString()) {
    return res.json({ status: 'error', message: '您沒有權限觀看或編輯' })
  }
  next()
}
module.exports = {
  authenticated,
  authenticatedAdmin,
  isSelfUser,
}
