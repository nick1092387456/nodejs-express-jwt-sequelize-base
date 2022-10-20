'use strict'
const parser = require('../tools/csvParser')
const db = require('../models')
const { User } = db

const detectDate = new Date('2022-07-19')
async function transformCSV(queryInterface, csvFileName, table) {
  const data = await parser(csvFileName)
  const key = data[0]
  const dataCount = data.length - 1
  // let idName = ''
  // if (table === 'Baat_inbodies') {
  //   idName = 'Baat_inbody_id'
  // } else {
  //   idName = table.slice(0, table.length - 1).toLowerCase() + '_id'
  // }
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
          baat_id: baatId,
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
    await transformCSV(queryInterface, 'body_composition', 'Baats')
    // await transformCSV(queryInterface, 'grip_strength', 'Baat_grip_strengths')
    // await transformCSV(queryInterface, 'CMJ')
    // await transformCSV(queryInterface, 'IMTP')
    // await transformCSV(queryInterface, 'wingate_test')
  },

  down: async (queryInterface) => {
    // queryInterface.bulkDelete('Baat', null, {})
    // queryInterface.bulkDelete('Baat_grip_strengths', null, {})
    return queryInterface.bulkDelete('Baat', null, {})
  },
}
