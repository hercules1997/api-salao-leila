module.exports = {
  dialect: "postgres",
  baseURL:
    "postgresql://postgres:NqHvzs5d7jhqliMtDce8@containers-us-west-41.railway.app:6015/railway",

// * MODELO DE CONFIGURAÇÃO PARA USAR O BANCO DE DADOS LOCALMENTE ) */
  // host: "localhost",
  // username: "postgres",
  // password: "suasenha",
  // database: "bd_sua_database",
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
