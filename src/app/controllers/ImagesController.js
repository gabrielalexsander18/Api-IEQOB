import * as Yup from 'yup'
import Images from '../models/Images'
import Category from '../models/Category'
import User from '../models/User'

class ImagesController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      event_data: Yup.date().required(),
      category_id: Yup.number().required(),
      path: Yup.boolean(),
    })

    try {
      // Validate the request body against the schema
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // If the validation fails, return a 400 error with the error message
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)
    const { dev: isDev } = await User.findByPk(request.userId)

    if (!isDev && !isAdmin) {
      return response.status(401).json()
    }

    const { filename: path } = request.file
    const { name, event_data, category_id } = request.body

    const image = await Images.create({
      name,
      event_data,
      category_id,
      path,
    })

    return response.status(201).json(image)
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      event_data: Yup.date(),
      category_id: Yup.number(),
      path: Yup.boolean(),
    })

    try {
      // Validate the request body against the schema
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // If the validation fails, return a 400 error with the error message
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)
    const { dev: isDev } = await User.findByPk(request.userId)

    if (!isDev && !isAdmin) {
      return response.status(401).json()
    }

    const { id } = request.params

    const findImage = await Images.findByPk(id)

    if (!findImage) {
      return response
        .status(400)
        .json({ error: 'Make sure your image ID is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name, event_data, category_id } = request.body

    await Images.update(
      {
        name,
        event_data,
        category_id,
        path,
      },
      {
        where: {
          id,
        },
      },
    )

    return response.status(200).json()
  }

  async index(request, response) {
    const images = await Images.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })

    return response.json(images)
  }
}

export default new ImagesController()
