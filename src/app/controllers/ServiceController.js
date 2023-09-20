import * as Yup from "yup"
import Category from "../models/Category"
import User from "../models/User"
import database from "../../database"
import { Sequelize } from "sequelize"
import Service from "../models/Service"

const sequelize = database.connection
class ServiceController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        decription: Yup.string().required(),
        category_id: Yup.number().required(),
        offer: Yup.boolean(),
      })

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }

       const { admin: isAdmin } = await User.findByPk(request.userId)

       if (!isAdmin) {
         return response.status(401).json({
           message: "Não autorizado",
         })
       }

      const { filename: path } = request.file
      const { name, price, decription, category_id, offer } = request.body

      const services = await Service.create({
        name,
        price: price,
        decription,
        category_id,
        path,
        offer,
      })

      return response.json(services)
    } catch (err) {
      console.log(err)
    }
  }

  async index(request, response) {
    const products = await Service.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    })

    return response.json(products)
  }

  async delete(request, response) {
    try {
      const Item = sequelize.define("services", {
        name: Sequelize.STRING,
        price: Sequelize.REAL,
        decription: Sequelize.STRING,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://api-salao-leila-production.up.railway.app/service-file/${this.path}`
          },
        },
      })

      const { id } = request.params
      const servicesId = await Service.findByPk(id)
      console.log(servicesId)

      Item.destroy({ where: { id: servicesId.dataValues.id } })
      return response
        .status(200)
        .json({ message: "Contato deletado com sucesso!" })
    } catch (error) {
      console.log(err)
    }
  }

  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        price: Yup.number(),
        decription: Yup.string(),
        category_id: Yup.number(),
        offer: Yup.boolean(),
      })

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }
       const { admin: isAdmin } = await User.findByPk(request.userId)

       if (!isAdmin) {
         return response.status(401).json({
           message: "Não autorizado",
         })
       }

      const { id } = request.params

      const service = await Service.findByPk(id)

      if (!service) {
        return response.status(401).json({
          message: "Serviço não existe",
        })
      }

      let path
      if (request.file) {
        path = request.file.filename
      }

      const { name, price, decription, category_id, offer } = request.body

      await Service.update(
        {
          name,
          price,
          decription,
          category_id,
          path,
          offer,
        },
        {
          where: {
            id,
          },
        }
      )

      return response.status(200).json({
        message: "Alterado com sucesso!",
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default new ServiceController()
