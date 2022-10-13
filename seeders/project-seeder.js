'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')

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
          isAdmin: true,
          name: 'root',
          description: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          idNumber: 'A123456789',
          gender: 'M',
          birthday: faker.date.past(),
          duty: 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          isAdmin: false,
          name: 'user1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          isAdmin: false,
          name: 'user2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
      // generate coachStudentShips seed
      queryInterface.bulkInsert(
        'CoachStudentShips',
        [
          {
            coachId: 1,
            studentId: 2,
            sport: "women's hockey",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            coachId: 1,
            studentId: 3,
            sport: "women's hockey",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
  },

  // 把 Users Table 中的資料清空，並且寫入 null
  down: (queryInterface) => {
    queryInterface.bulkDelete('CoachStudentShips', null, {})
  },
}
