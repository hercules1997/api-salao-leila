import Sequelize from "sequelize"
import mongoose from "mongoose"
import User from "../app/models/User"
import configDatabase from "../config/database"
import Category from "../app/models/Category"
import Service from "../app/models/Service"

const models = [User, Category, Service]

// * CLASSE QUE INSTÂNCIA AS CONEXÕES  */

class Database {
  constructor() {
    this.init()
    this.mongo()
  }
  // * INICIA CONEXÃO COM BANCO DE DADOS POSTGRESQL QUE ESTÁ HOSPEDADO NA PLATAFORMA DO RAILWAY
  // * (CASO FOR USADO LOCALMENTE RETIRAR O .baseURL E COLOCAR AS CONFIGURAÇÕES NO ARQUIVO CONFIG ) */

  init() {
    this.connection = new Sequelize(configDatabase.baseURL)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
  // * INICIA CONEXÃO COM BANCO DE DADOS MONGODB QUE ESTÁ HOSPEDADO NA PLATAFORMA DO RAILWAY
  // * (CASO FOR USAR LOCALMENTE COLOCAR A URL DA IMAGEM CRIADA ) */
  mongo() {
    mongoose.set("strictQuery", false)
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:Hs4xvxecED5FjTasAvSF@containers-us-west-83.railway.app:6290",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
