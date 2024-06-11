'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_data: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: {
            msg: 'A data do evento é obrigatória.',
          },
          isBefore: {
            args: new Date().toISOString(),
            msg: 'A data do evento não pode ser tão antiga.',
          },
        },
      },
      category_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('images')
  },
}
