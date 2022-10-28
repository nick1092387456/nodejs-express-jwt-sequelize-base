'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          user_id: 3,
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          user_id: 4,
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          user_id: 5,
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          user_id: 6,
          analyst: true,
          baat: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          user_id: 7,
          analyst: true,
          snc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          user_id: 8,
          analyst: true,
          ssta: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          user_id: 9,
          analyst: true,
          ssta2: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          user_id: 10,
          analyst: true,
          src: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          user_id: 11,
          analyst: true,
          spc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          user_id: 12,
          analyst: true,
          sptc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('Roles', null, {})
  },
}
