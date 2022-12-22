const db = require('../models')

async function syncUserData(id_number, user_id) {
  const shipList = [
    'BaatUserShip',
    'SncUserShip',
    'SpcUserShip',
    'SrcUserShip',
    'SstaUserShip',
    'Ssta2UserShip',
  ]
  await Promise.all(
    shipList.map(async (model) => {
      await db[model].update(
        {
          user_id,
        },
        { where: { id_number } }
      )
    })
  )
}

module.exports = { syncUserData }
