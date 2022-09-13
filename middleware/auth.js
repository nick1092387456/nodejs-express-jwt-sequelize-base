const passport = require('../config/passport')

// const authenticated = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err || !user)
//       return res.status(401).json({ status: 'error', message: 'unauthorized' })
//     if (user) {
//       // res.status(200).json({ status: 'success', message: '驗證成功' })
//       return next()
//     }
//   })(req, res, next)
// }

const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  console.log(`authenticatedAdmin : ${req.user}`)
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

module.exports = {
  authenticated,
  authenticatedAdmin,
}
