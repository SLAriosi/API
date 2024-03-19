const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
   async create(request, response){
      const { name, email, password} = request.body;

      const database = await sqliteConnection();
      const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if(checkUserExist){
         throw new AppError("Este e-mail já está em uso.");
      }

      if (!name) {
         throw new AppError("Nome é obrigatório!!")
      }

      response.status(201).json({ name, email, password })
   }
}

module.exports = UsersController;

// Linha 09, utilizamos o status() para que possamos adicionar informações a mais no nosso sistema, nesse caso ele adiciona status do sistema, existem varios status que podemos colocar, desde 200 a 400 e 500, nesse caso da linha 5 usamos o 201 para o status de criado.