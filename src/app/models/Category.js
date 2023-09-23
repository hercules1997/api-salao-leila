import Sequelize, { Model } from "sequelize"
// * MODEL PARA GRAVAÇÃO DOS DADOS NA TABELA DE CATEGORIAS USANDO O SEQUELIZE PARA COMPILAÇÃO */

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://api-salao-leila-production.up.railway.app/category-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      }
    )
    return this
  }
}

export default Category
