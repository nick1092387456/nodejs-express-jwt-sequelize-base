'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          user_id: '12345678-1234-1234-1234-123456789001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789002',
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789003',
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789004',
          athlete: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789005',
          coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789006',
          analyst: true,
          baat: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789007',
          analyst: true,
          snc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789008',
          analyst: true,
          ssta: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789009',
          analyst: true,
          ssta2: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789010',
          analyst: true,
          src: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789011',
          analyst: true,
          spc: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
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
