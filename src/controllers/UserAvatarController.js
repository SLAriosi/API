// Teria como deixar isso dentro do UserController mas para manter um bom padrão de organização utilizaremos o UserAvatarController

const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
   async update(request, response) { // Primeiro criamos a função de update.

      const user_id = request.user.id; // Primeiro pegamos o id do usuário que quer pegar a imagem e atualizar ela.
      const avatarFilename = request.file.filename; // Depois pegamos o nome do arquivo que o usuário fez upload
      const diskStorage = new DiskStorage();

      const user = await knex("users").where({ id: user_id }).first(); // Como o nome do parâmetro que estou buscando não é o mesmo que temos aqui para utilizar, temos que usar o id: user_id

      // Caso o usuário não exista aqui será exibida uma mensagem de erro.
      if (!user) {
         throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
      }

      // Caso o usuário já tenha um avatar será deletada aquela imagem.
      if (user.avatar) {
         await diskStorage.deleteFile(user.avatar);
      }

      // Caso o usuário já tenha um avatar será deletada aquela imagem.
         const filename = await diskStorage.saveFile(avatarFilename);
         user.avatar = filename

         // Depois de todas as validações feitas o programa irá salvar usando a query, sempre USANDO O WHERE PELO AMOR DE DEUS!!!
         await knex("users").update(user).where({ id: user_id });

         // E por fim retornará o json com oque está o usuário
         return response.json(user)
   }
}

module.exports = UserAvatarController;