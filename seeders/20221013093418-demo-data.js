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
          birthday: faker.date.birthdate(),
          duty: '',
          sport: '',
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
          birthday: faker.date.birthdate(),
          duty: 'Coach',
          sport: 'women_hockey',
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
          birthday: faker.date.birthdate(),
          duty: 'Athlete',
          sport: 'women_hockey',
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
          id_number: 'A266666789',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Athlete',
          sport: 'women_hockey',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          email: 'user4@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'user4',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A255556789',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
    // generate Coach_athlete_ships seed
    return queryInterface.bulkInsert(
      'Coach_athlete_ships',
      [
        {
          coach_id: 2,
          athlete_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          coach_id: 2,
          athlete_id: 4,
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
    return queryInterface.bulkDelete('Coach_athlete_ships', null, {})
  },
}