import { Router } from 'express'
// Importing the UserController from the './app/controllers/UserController' module
import UserController from './app/controllers/UserController'
// Importing the SessionController from the './app/controllers/SessionController' module
import SessionController from './app/controllers/SessionController'
import multer from 'multer'
import multerConfig from './config/multer'
import ImagesController from './app/controllers/ImagesController'
import CategoryController from './app/controllers/CategoryController'
import authMiddleware from './middlewares/auth'

// Creating a new instance of the Express Router
const routes = new Router()
const uploads = multer(multerConfig)

// Defining a POST route for creating a new user, handled by the UserController.store method
routes.post('/users', UserController.store)
// Defining a POST route for creating a new session, handled by the SessionController.store method
routes.post('/session', SessionController.store)

routes.use(authMiddleware)
routes.post('/postimg', uploads.single('file'), ImagesController.store)
routes.get('/postimg', ImagesController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

// Exporting the routes instance to be used in other parts of the application
export default routes
