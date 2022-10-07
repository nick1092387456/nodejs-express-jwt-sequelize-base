const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const passport = require('./config/passport')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

require('./routes')(app)
