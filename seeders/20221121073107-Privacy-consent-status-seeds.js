'use strict'

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'Privacy_consent_statuses',
      [
        {
          id: 1,
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
          id: 2,
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
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('Privacy_consent_statuses', null, {})
  },
}
