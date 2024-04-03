// É do próprio node, e utilizamos para lidarmos com manipulações de arquivos.
const fs = require("fs")

// UItilizamos o path para mexermos com os diretórios
const path = require("path")

// E também importamos as configs de upload dentro da pasta configurações
const uploadConfig = require("../configs/upload")

// Aqui passamos a Classe que demos o nome desse arquivo para ser nossa Classe/função principal.
// Aqui dentro passamos 2 funções assíncronas. uma para criação e outra para deletar, para que o usuário tenha apenas 1 imagem no banco de dados (só é necessária 1 imagem por usuário que é a de perfil.)
class DiskStorage {

   // Aqui passamos a função para salvar o arquivo, e temos que passar o arquivo como parâmetro para podermos salvar apenas aquele parâmetro / arquivo.
   async saveFile(file){
      
      // Aqui vamos utilizar o atributo promisses, e aí utilizamos o rename para renomearmos o arquivo
      await fs.promises.rename(
      
         // Agora usando o path.resolve, nós utilizamos não para mudar o nome do arquivo, e sim para mudarmos o arquivo de lugar.
         // Aqui pegamos o arquivo dentro da pasta temporária (TMP_FOLDER), passamos o nome do arquivo (file), e aí levamos ele para a nova pasta.
         // Utilizando o path.resolve novamente abaixo.
         path.resolve(uploadConfig.TMP_FOLDER, file),
         path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      )

         // E por fim nós retornamos o arquivo.
         return file;
   }

   // Aqui fica a função para deletarmos o arquivo.
   async deleteFile(file) {
      // Usamos o filePath para pegarmos o endereço desse arquivo. E vamos procurar esse arquivo lá na nossa pasta uploadsConfig, mas dentro do arquivo UPLOADS.FOLDER.
      const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

      try {

         await fs.promises.stat(filePath);
      } catch {

         return;
      }

      // Para deletar utilizamos essa parte aqui, usando o unlink.
      await fs.promises.unlink(filePath);
   }
}

module.exports = DiskStorage;