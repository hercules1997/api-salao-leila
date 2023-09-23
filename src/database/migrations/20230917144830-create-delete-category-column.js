"use strict"
// * MIGRATION PARA REMOVER COLUNA DA TABELA DE SERVIÇOS */ 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Services", "category")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "category", Sequelize.STRING)
  },
}
