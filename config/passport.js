const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

//Local strategy for test
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      User.findOne({ where: { email } }).then((user) => {
        try {
          if (!user) {
            return cb(null, false)
          }
          if (!bcrypt.compareSync(password, user.password))
            return cb(null, false)
          return cb(null, user)
        } catch (err) {
          cb(err, false)
        }
      })
    }
  )
)

const jwtOption = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
passport.use(
  new JWTStrategy(jwtOption, async (jwtPayload, cb) => {
    try {
      const user = await User.findByPk(jwtPayload.id)
      if (!user) {
        return cb(null, false)
      }
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  })
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findByPk(id).then((user) => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport
