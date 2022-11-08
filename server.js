const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const cors = require('cors')
const passport = require('./config/passport')
const port = process.env.PORT || 3001
const path = require('path')

app.use(cors())
app.use('/avatars', express.static(path.join(__dirname, '/avatars')))
// app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

require('./routes')(app)
