import app from "./app"
// * CONFIGURAÇÃO PARA O SERVIDOR  */

const port = process.env.PORT || 3001;

app.listen(port, console.log("Rodando na porta", port))