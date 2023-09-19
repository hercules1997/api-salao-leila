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
            return `https://api-salao-leila-production.up.railway.app/service-file/${this.path}`
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
