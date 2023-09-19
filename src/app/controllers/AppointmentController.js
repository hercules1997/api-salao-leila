import * as Yup from "yup"
import Category from "../models/Category"
import ApointmentSchema from "../schemas/ApointmentSchema"
import Service from "../models/Service"
import User from "../models/User"

class AppointmentController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        services: Yup.array()
          .required()
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              time: Yup.number().required(),
            })
          ),
      })
    } catch (error) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    try {
      await schema.validateSync(request.body, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    const servicesId = request.body.services.map((service) => service.id)

    const updatedServices = await Service.findAll({
      where: {
        id: servicesId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    })

    const editedServices = updatedServices.map((service) => {
      const serviceIndex = request.body.services.findIndex(
        (requestService) => requestService.id === service.id
      )

      const newService = {
        id: service.id,
        name: service.name,
        price: service.price,
        category: service.category.name,
        url: service.url,
        time: request.body.services[serviceIndex].time,
      }
      return newService
    })

    const appointment = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      services: editedServices,
      status: "Agendamento realizado com sucesso!",
      date: 435,
      hours: 345,
    }

    const appointmentResponse = await ApointmentSchema.create(appointment)

    return response.status(201).json(appointmentResponse)
  }

  async index(request, response) {
    const services = await ApointmentSchema.find()

    return response.json(services)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      services: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number(),
            time: Yup.number(),
          })
        ),
      status: Yup.string().required(),
      date: Yup.number().required(),
      hours: Yup.number().required(),
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
      return response.status(401).json({ message: "Não autorizado" })
    }

    const { id } = request.params
    const { status } = request.body
    const { date } = request.body
    const { hours } = request.body

    try {
      await ApointmentSchema.updateOne(
        {
          _id: id,
        },
        {
          status,
          date,
          hours,
        }
      )
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      })
    }
    return response.json({
      message: "Atualizado com sucesso!",
    })
  }
}

export default new AppointmentController()
