'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Privacy_consent_statuses',
      [
        {
          user_id: '12345678-1234-1234-1234-123456789001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789002',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789003',
          baat_root: true,
          snc_root: true,
          ssta_root: true,
          ssta2_root: true,
          src_root: true,
          spc_root: false,
          sptc_root: true,
          baat_coach: true,
          snc_coach: true,
          ssta_coach: true,
          ssta2_coach: true,
          src_coach: true,
          spc_coach: false,
          sptc_coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789004',
          baat_root: true,
          snc_root: true,
          ssta_root: true,
          ssta2_root: true,
          src_root: true,
          spc_root: true,
          sptc_root: true,
          baat_coach: true,
          snc_coach: true,
          ssta_coach: true,
          ssta2_coach: true,
          src_coach: true,
          spc_coach: true,
          sptc_coach: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789005',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789006',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789007',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789008',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789009',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789010',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789011',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: '12345678-1234-1234-1234-123456789012',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('Privacy_consent_statuses', null, {})
  },
}
