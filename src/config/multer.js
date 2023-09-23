import multer from "multer"
import { v4 } from "uuid"
import { extname, resolve } from "path"
// * CONFIGURAÇÃO PARA DESTINO DAS IMAGENS */

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) => {
      return callback(null, v4() + extname(file.originalname))
    },
  }),
}
