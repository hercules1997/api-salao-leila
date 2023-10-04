import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"
import authMiddleware from "./app/middlewares/auth"

import ServiceController from "./app/controllers/ServiceController"
import SessionController from "./app/controllers/SessionController"
import CategoryController from "./app/controllers/CategoryController"
import UserController from "./app/controllers/UserController"
import AppointmentController from "./app/controllers/AppointmentController"

const upload = multer(multerConfig)
const routes = new Router()

routes.get("/services", ServiceController.index)
routes.get("/categories", CategoryController.index)

//* ROTA PARA CRIAÇÃO DE USUÁRIOS */
routes.post("/users", UserController.store)

//* ROTA PARA REALIZAR O LOGIN*/
routes.post("/sessions", SessionController.store)

//*AUTENTICAÇÃO COM JWT
routes.use(authMiddleware)
// ?(TODAS AS ROTAS ABAIXO DEPENDE DESSA AUTENTICAÇÃO)*/

//* ROTAS DOS SERVIÇOS*/
routes.post("/services", upload.single("file"), ServiceController.store)
routes.get("/services", ServiceController.index)
routes.put("/services/:id", upload.single("file"), ServiceController.update)
routes.delete("/services/:id", upload.single("file"), ServiceController.delete)

//*ROTAS DAS CATEGORIAS*/
routes.post("/categories", upload.single("file"), CategoryController.store)
routes.get("/categories", CategoryController.index)
routes.put("/categories/:id", upload.single("file"), CategoryController.update)
routes.delete("/categories/:id", upload.single("file"), CategoryController.delete)

//* ROTAS DOS AGENDAMENTOS*/
routes.post("/appointment", AppointmentController.store)
routes.put("/appointment/:id", AppointmentController.update)
routes.get("/appointment", AppointmentController.index)

export default routes
