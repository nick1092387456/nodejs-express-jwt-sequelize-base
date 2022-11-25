'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          user_id: '12345678-1234-1234-1234-123456789001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: '12345678-1234-1234-1234-123456789002',
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          user_id: '12345678-1234-1234-1234-123456789003',
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          user_id: '12345678-1234-1234-1234-123456789004',
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          user_id: '12345678-1234-1234-1234-123456789005',
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          user_id: '12345678-1234-1234-1234-123456789006',
          analyst: true,
          baat: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          user_id: '12345678-1234-1234-1234-123456789007',
          analyst: true,
          snc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          user_id: '12345678-1234-1234-1234-123456789008',
          analyst: true,
          ssta: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          user_id: '12345678-1234-1234-1234-123456789009',
          analyst: true,
          ssta2: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          user_id: '12345678-1234-1234-1234-123456789010',
          analyst: true,
          src: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          user_id: '12345678-1234-1234-1234-123456789011',
          analyst: true,
          spc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          user_id: '12345678-1234-1234-1234-123456789012',
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
