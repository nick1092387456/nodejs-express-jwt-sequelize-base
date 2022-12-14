'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface) => {
    // generate user seed
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '12345678-1234-1234-1234-123456789001',
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
          id: '12345678-1234-1234-1234-123456789002',
          email: 'coach1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'coach1',
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
          id: '12345678-1234-1234-1234-123456789003',
          email: 'athlete1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'athlete1',
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
          id: '12345678-1234-1234-1234-123456789004',
          email: 'athlete2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'athlete2',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A266666789',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Athlete',
          sport: 'wrestling',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789005',
          email: 'coach2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'coach2',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A255556789',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Coach',
          sport: 'wrestling',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789006',
          email: 'analyst1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst1',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A171234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789007',
          email: 'analyst2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst2',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A172234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789008',
          email: 'analyst3@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst3',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A173234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789009',
          email: 'analyst4@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst4',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A174234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789010',
          email: 'analyst5@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst5',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A175234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789011',
          email: 'analyst6@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst6',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A176234567',
          gender: 'M',
          birthday: faker.date.birthdate(),
          duty: 'Analyst',
          sport: '',
          private_check: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '12345678-1234-1234-1234-123456789012',
          email: 'analyst7@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          is_admin: false,
          name: 'analyst7',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          id_number: 'A177234567',
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
    // return queryInterface.bulkInsert(
    //   'Coach_athlete_ships',
    //   [
    //     {
    //       coach_id: '12345678-1234-1234-1234-123456789002',
    //       athlete_id: '12345678-1234-1234-1234-123456789003',
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       coach_id: '12345678-1234-1234-1234-123456789002',
    //       athlete_id: '12345678-1234-1234-1234-123456789004',
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // )
  },

  // ??? Users Table ????????????????????????????????? null
  down: async (queryInterface) => {
    queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Coach_athlete_ships', null, {})
  },
}
