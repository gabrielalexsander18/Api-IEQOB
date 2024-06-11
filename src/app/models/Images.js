import Sequelize, { Model } from 'sequelize'

class Images extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        event_data: Sequelize.DataTypes.DATE,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/postimg/${this.path}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }
}

export default Images
