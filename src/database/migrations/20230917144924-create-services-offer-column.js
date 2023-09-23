"use strict"
// * MIGRATION PARA CRIAÇÃO DE COLUNA DE OFERTAS NA TABELA DE SERVIÇOS */ 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "offer", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Services", "offer")
  },
}
