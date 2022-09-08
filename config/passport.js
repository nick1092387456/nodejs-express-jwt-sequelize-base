const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

passport.use(
  new LocalStrategy(
    // customize user field
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    // authenticate user
    (req, email, password, cb) => {
      User.findOne({ where: { email } }).then((user) => {
        if (!user) return cb(null, false)
        bcrypt.compare(password, user.password).then((res) => {
          if (!res) return cb(null, false)
          return cb(null, user)
        })
      })
    }
  )
)

const jwtOption = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
passport.use(
  new JWTStrategy(jwtOption, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err))
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
