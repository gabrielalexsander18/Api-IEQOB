import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
  /**
   * This method is responsible for handling user login requests.
   * It validates the email and password format, checks if the user exists,
   * and verifies the password. If all checks pass, it returns the user data.
   *
   * @param {Object} request - The request object containing the user's email and password.
   * @param {Object} response - The response object to send the user data or an error message.
   */
  async store(request, response) {
    // Define the schema for email and password validation
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;|,.<>?\-=[\]\\';/]).{8,}$/,
          'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.',
        ),
    })

    // Check if the request body is valid according to the schema
    const isValid = await schema.isValid(request.body)

    // Define a function to handle incorrect email or password errors
    const emailOrPasswordIncorrect = () =>
      response
        .status(401)
        .json({ error: 'Make sure your email or password are correct' })

    // If the request body is not valid, return an error message
    if (!isValid) {
      return emailOrPasswordIncorrect()
    }

    // Destructure the email and password from the request body
    const { email, password } = request.body

    // Find the user with the given email
    const user = await User.findOne({
      where: {
        email,
      },
    })

    // If no user is found, return an error message
    if (!user) {
      return emailOrPasswordIncorrect()
    }

    // Check if the provided password matches the user's password
    const isSamePassword = await user.checkPassword(password)

    // If the passwords do not match, return an error message
    if (!isSamePassword) {
      return emailOrPasswordIncorrect()
    }

    // If all checks pass, return the user data
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      dev: user.dev,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
