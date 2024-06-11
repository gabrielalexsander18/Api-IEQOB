// Importing the necessary dependencies and models
import { Sequelize } from 'sequelize'
import configDatabase from '../config/database'
import User from '../app/models/User'
import Images from '../app/models/Images'
import Category from '../app/models/Category'

// Creating an array of models to be initialized
const models = [User, Images, Category]

// Creating a Database class to handle database connection and initialization
class Database {
  // Constructor function to initialize the database
  constructor() {
    this.init()
  }

  // Function to initialize the database connection and models
  init() {
    // Creating a new Sequelize instance with the provided configuration
    this.connection = new Sequelize(configDatabase)
    // Mapping through the models array and initializing each model with the database connection
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
}

// Exporting a new instance of the Database class
export default new Database()
