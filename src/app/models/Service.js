import Sequelize, { Model } from "sequelize"
class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        decription: Sequelize.STRING,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/service-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      }
    )
    return this
  }

   static associate(models) {
    this.belongsTo(models.Category, {
       foreignKey: "category_id",
       as: "category",
     })
  }
}


export default Service