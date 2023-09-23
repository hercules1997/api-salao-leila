"use strict"
// * MIGRATION PARA CRIAÇÃO DE UMA COLUNA NA TABELA DE SERVIÇOS DADO UM ID DA CATEGORIA */ 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "category_id", {
      type: Sequelize.INTEGER,
      references: { model: "Categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Services", "category_id")
  },
}
