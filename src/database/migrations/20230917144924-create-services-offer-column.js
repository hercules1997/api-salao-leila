"use strict"

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
