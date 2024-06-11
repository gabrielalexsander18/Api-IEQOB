'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('images', 'category_id')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'category_id', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}
