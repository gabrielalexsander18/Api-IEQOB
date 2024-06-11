import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'Token is not provided' })
  }

  const token = authToken.split(' ').at(1)

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error()
      }

      request.userId = decoded.id

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}

export default authMiddleware
