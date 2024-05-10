import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model {
  // Initialize the User model with the given sequelize instance
  static init(sequelize) {
    // Call the parent class's (Model) init method with the User schema and sequelize instance
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        dev: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    )

    // Add a hook to the User model that will hash the password before saving it to the database
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 14)
      }
    })

    return this
  }

  // A method to check if the given password matches the user's password_hash
  async checkPassword(password) {
    // Compare the given password with the user's password_hash using bcrypt
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
