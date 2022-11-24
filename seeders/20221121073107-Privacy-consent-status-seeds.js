'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Privacy_consent_statuses',
      [
        {
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
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
          user_id: 4,
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
          user_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 12,
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
