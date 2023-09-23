import jwt from "jsonwebtoken"
import authConfig from "../../config/auth"

// * VALIDAÇÃO DO TOKEN DE AUTENTICAÇÃO */
export default (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      error: "TOKEN NÃO FORNECIDO",
    })
  }

  const token = authToken.split(" ")[1]

  try {
    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        throw new Error()
      }
      request.userId = decoded.id
      request.userName = decoded.name

      return next()
    })
  } catch (err) {
    return response.status(401).json({
      error: "TOKEN É INVÁLIDO",
    })
  }
}
