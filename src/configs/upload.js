// Para fazer upload nós vamos utilizar a lib multer 
const multer = require("multer")

const path = require("path")

// Vamos utilizar esse crypto, para podermos adicionar hash nas informações que quisermos, por enquanto utilizamos no fileHash dentro da function filename.
const crypto = require("crypto")

// Essas constantes com o nome inteiro maiúsculo é pra idicar que são variáveis para configuração. (Nesse caso para usarmos no Uload de imagens.)
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

// Utilizamos o multer como a biblioteca que está sendo usada para configuração inicial
const MULTER = {

   //Aqui dentro do storage passamos algumas configurações que vamos ter tendo do multer.
   storage: multer.diskStorage({

      // Aqui passamos o destino para o qual enviaremos este arquivo
      destination: TMP_FOLDER,

      // E também passamos o nome do arquivo. Ele é passado em formato de função
      filename(request, file, callback){
         // Para garantir que cada arquivo de cada usuário diferente tenha um nome diferente, utilizamos esse hash, pois caso tenha 2 arquivos de mesmo nome, o programa sobrepõe o nome e apaga o arquivo antigo de mesmo nome.
         const fileHash = crypto.randomBytes(10).toString("hex")

         // Agora utilizando o fileName, nós passamos o nome que o arquivo terá.
         const fileName = `${fileHash}-${file.originalname}` // Assim evitamos que o arquivo tenha nomes iguais.

         return callback(null, fileName);
      },
   }),
};

module.exports = {
   TMP_FOLDER,
   UPLOADS_FOLDER,
   MULTER,
}