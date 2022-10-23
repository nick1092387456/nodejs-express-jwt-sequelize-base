'use strict'
const parser = require('../tools/csvParser')
const db = require('../models')
const { User } = db

const detectDate = new Date('2022-07-19')
async function transformCSV(queryInterface, csvFileName, table) {
  const data = await parser(csvFileName, './exampleCSV/')
  const key = data[0]
  const dataCount = data.length - 1
  let idName = ''
  if (table === 'Baat_inbodies') {
    idName = 'baat_inbody_id'
  } else {
    idName = table.slice(0, table.length - 1).toLowerCase() + '_id'
  }
  let baatId = 1
  for (let x = 0; x < dataCount; x++) {
    let idNumber = data[x + 1][0]
    let user = await User.findOne({
      where: { idNumber },
      raw: true,
    })
    for (let i = 0, j = key.length; i < j; i++) {
      await queryInterface.bulkInsert(
        table,
        [
          {
            key: key[i],
            value: data[x + 1][i],
            detect_at: detectDate,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
      )

      await queryInterface.bulkInsert('Baat_user_ships', [
        {
          [idName]: baatId,
          user_id: user.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      baatId += 1
    }
  }
}

module.exports = {
  up: async (queryInterface) => {
    await transformCSV(queryInterface, 'body_composition', 'Baat_inbodies')
    await transformCSV(queryInterface, 'grip_strength', 'Baat_grip_strengths')
    await transformCSV(queryInterface, 'CMJ', 'Baat_cmjs')
    await transformCSV(queryInterface, 'IMTP', 'Baat_imtps')
    await transformCSV(queryInterface, 'wingate_test', 'Baat_wingate_tests')
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('Baat_cmjs', null, {})
    queryInterface.bulkDelete('Baat_imtps', null, {})
    queryInterface.bulkDelete('Baat_wingate_tests', null, {})
    queryInterface.bulkDelete('Baat_grip_strengths', null, {})
    return queryInterface.bulkDelete('Baat_inbodies', null, {})
  },
}
