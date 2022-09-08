const express = require('express')
const app = express()
require('dotenv').config()
const passport = require('./config/passport')
const port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

require('./routes')(app)
