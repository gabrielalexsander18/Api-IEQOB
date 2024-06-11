import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    })

    try {
      // Validate the request body against the schema
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // If the validation fails, return a 400 error with the error message
      return response.status(400).json({ error: err.errors })
    }

    // const { admin: isAdmin } = await User.findByPk(request.userId)
    const { dev: isDev } = await User.findByPk(request.userId)

    if (!isDev) {
      return response.status(401).json()
    }

    const { name } = request.body

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    const { id } = await Category.create({
      name,
    })

    return response.status(201).json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    return response.json(categories)
  }
}

export default new CategoryController()
