const db = require('../models')

async function getUserId(id_number) {
  const user = await db.User.findOne({ where: { id_number } })
  if (user) {
    return user.id
  }
  return null
}

module.exports = { getUserId }
