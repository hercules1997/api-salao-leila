"use strict"
// * MIGRATION PARA CRIAÇÃO DE UMA COLUNA TABELA DE CATEGORIAS FORNECENDO O ENDEREÇO PARA AS IMAGENS */ 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Categories", "path", {
      type: Sequelize.STRING,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "path")
  },
}
