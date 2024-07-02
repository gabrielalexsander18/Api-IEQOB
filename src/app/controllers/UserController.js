/* 
    store => Cadastrar / Adicionar
    index => Listar vários
    show => Listar apenas um
    update => Atualizar
    delete => Deletar
*/
import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  // Handles the creation of a new user
  async store(request, response) {
    // Define the schema for user creation using Yup
    const schema = Yup.object({
      // The user's name is a required string
      name: Yup.string().required(),
      // The user's email is a required string that must match the email format
      email: Yup.string().email().required(),
      // The user's password is a required string that must match the specified pattern
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;|,.<>?\-=[\]\\';/]).{8,}$/,
          'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.',
        ),
      // The user's admin status is a boolean
      admin: Yup.boolean(),
      // The user's dev status is a boolean
      dev: Yup.boolean(),
    })

    try {
      // Validate the request body against the schema
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // If the validation fails, return a 400 error with the error message
      return response.status(400).json({ error: err.errors })
    }

    // Destructure the request body into individual variables
    const { name, email, password, admin, dev } = request.body

    // Check if a user with the given email already exists
    const userExists = await User.findOne({
      where: { email },
    })

    if (userExists) {
      // If the user already exists, return a 400 error
      return response.status(400).json({ error: 'User already exists' })
    }

    // Create a new user with the given properties and a generated UUID
    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      dev,
    })

    // Return a 201 response with the created user's details
    return response.status(201).json({ id: user.id, name, email, admin, dev })
  }

  async update(request, response) {
    // Define the schema for user creation using Yup
    const schema = Yup.object({
      // The user's admin status is a boolean
      admin: Yup.boolean(),
      // The user's dev status is a boolean
      dev: Yup.boolean(),
    })

    try {
      // Validate the request body against the schema
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // If the validation fails, return a 400 error with the error message
      return response.status(400).json({ error: err.errors })
    }

    const { dev: isDev } = await User.findByPk(request.userId)

    if (!isDev) {
      return response.status(401).json()
    }

    const { id } = request.params

    const findUser = await User.findByPk(id)

    if (!findUser) {
      return response
        .status(400)
        .json({ error: 'Make sure your user ID is correct' })
    }
    /// olhar o porque esta dando errado quando da um erro esta crashando o servidor
    const { admin, dev } = request.body

    await User.update(
      {
        admin,
        dev,
      },
      {
        where: {
          id,
        },
      },
    )

    return response.status(200).json({ mensage: 'Office update sucessfully' })
  }

  async index(request, response) {
    // Retrieve the user with the given ID and check if they are a developer
    const { dev: isDev } = await User.findByPk(request.userId)

    // If the user is not a developer, return a 401 Unauthorized response
    if (!isDev) {
      return response
        .status(401)
        .json({ message: 'You do not have access permission' })
    }

    // Retrieve all user accounts
    const usersAccounts = await User.findAll()

    // Return the list of user accounts in the response
    return response.json(usersAccounts)
  }
}

export default new UserController()
