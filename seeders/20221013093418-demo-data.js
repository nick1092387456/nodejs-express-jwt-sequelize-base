'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

module.exports = {
  up: (queryInterface) => {
    // generate user seed
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          email: 'root@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: true,
          name: 'root',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A123456789',
          gender: 'M',
          birthday: faker.date.past(),
          duty: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'user1',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A223456789',
          gender: 'F',
          birthday: faker.date.past(),
          duty: 'Coach',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'user2',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A244456789',
          gender: 'F',
          birthday: faker.date.past(),
          duty: 'Athlete',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          email: 'user3@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'user3',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A255556789',
          gender: 'M',
          birthday: faker.date.past(),
          duty: 'Analyst',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
    // generate CoachAthleteShips seed
    return queryInterface.bulkInsert(
      'CoachAthleteShips',
      [
        {
          coach_id: 2,
          athlete_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  // 把 Users Table 中的資料清空，並且寫入 null
  down: (queryInterface) => {
    queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('CoachAthleteShips', null, {})
  },
}
