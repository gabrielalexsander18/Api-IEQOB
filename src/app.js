// Importing the express module
import express from 'express'
// Importing the routes from the './app/routes' module
import routes from './routes'

// Importing the database connection from the './database' module
import './database'

// Creating a new instance of the Express application
class App {
  constructor() {
    this.app = express()

    // Applying middleware to parse JSON request bodies
    this.middlewares()
    // Applying the routes to the application
    this.routes()
  }

  // Method for applying middleware to the application
  middlewares() {
    this.app.use(express.json())
  }

  // Method for applying the routes to the application
  routes() {
    this.app.use(routes)
  }
}

// Exporting a new instance of the App class
export default new App().app
