import Sequelize, { Model } from "sequelize"

import bcrypt from "bcrypt"
// * MODEL PARA GRAVAÇÃO DOS DADOS NA TABELA DE USUÁRIOS USANDO O SEQUELIZE PARA COMPILAÇÃO */

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.BIGINT,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 5)
      }
    })

    return this
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
