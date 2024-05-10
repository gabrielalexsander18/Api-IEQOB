'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Up function that creates a table in the database.
   * @param {queryInterface} queryInterface - A sequelize query interface.
   * @param {Sequelize} Sequelize - A sequelize instance.
   */
  async up(queryInterface, Sequelize) {
    /**
     * Creating a users table with the following columns:
     * id: A UUID primary key with a default value of UUIDV4.
     * name: A string column that cannot be null.
     * email: A unique string column that cannot be null.
     * password_hash: A string column that cannot be null.
     * admin: A boolean column with a default value of false.
     * dev: A boolean column with a default value of false.
     * created_at: A date column that cannot be null.
     * updated_at: A date column that cannot be null.
     */
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dev: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  /**
   * Down function that drops the users table.
   * @param {queryInterface} queryInterface - A sequelize query interface.
   */
  async down(queryInterface) {
    await queryInterface.dropTable('users')
  },
}
