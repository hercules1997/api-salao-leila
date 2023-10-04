import Sequelize, { Model } from "sequelize"

// * MODEL PARA GRAVAÇÃO DOS DADOS NA TABELA DE SERVIÇOS USANDO O SEQUELIZE PARA A COMPILAÇÃO */

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
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
  // * ASSOCIAÇÃO DA TABELA  */

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    })
  }
}

export default Service
