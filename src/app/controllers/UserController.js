import { v4 } from "uuid"
import * as Yup from "yup"

import User from "../models/User"
// * CONTOLLER PARA AS REQUISIÇÕES, INFORMAÇÕES DA ROTA DE USUÁRIO */
class UserController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
        password: Yup.string().required().min(6),
        admin: Yup.boolean(),
      })

      // * VERIFICAÇÃO DAS INFORMAÇÕES SE SÃO VÁLIDAS */

      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: "não está correto" })
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
    } catch (error) {
      return response.status(400).json({
        error: err.errors,
      })
    }

    const { name, email, phone, password, admin } = request.body

    const userExist = await User.findOne({
      where: {
        email,
      },
    })

    if (userExist) {
      return response.status(409).json({
        error: "Esse e-mail já existe",
      })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      phone,
      password,
      admin,
    })

    return response.status(201).json({
      id: user.id,
      name,
      phone,
      email,
      admin,
    })
  }
}

export default new UserController()
