import Sequelize from "sequelize"
import mongoose from "mongoose"
import User from "../app/models/User"
import configDatabase from "../config/database"
import Category from "../app/models/Category"
import Service from "../app/models/Service"

const models = [User, Category, Service]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase.baseURL)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

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
