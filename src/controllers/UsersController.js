const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController {
   async create(request, response) {
      const { name, email, password } = request.body;

      const database = await sqliteConnection();
      const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if (checkUserExist) {
         throw new AppError("Este e-mail já está em uso.");
      }

      const hashedPassword = await hash(password, 8)

      await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

      if (!name) {
         throw new AppError("Nome é obrigatório!!")
      }

      response.status(201).json({ name, email, password })
   }

   async update(request, response) {
      const { name, email } = request.body;
      const { id } = request.params;

      const database = await sqliteConnection();
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

      if (!user) {
         throw new AppError("Este e-mail já está em uso.");
      }

      const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
         throw new AppError("Esse e-mail já está em uso.");
      }

      user.name = name;
      user.email = email;

      await database.run("UPDATE users SET name = ?, email = ?, updated_at = ? WHERE id = ?", [user.name, user.email, new Date(), id])

      return response.json();
   }
}

module.exports = UsersController;

// Linha 09, utilizamos o status() para que possamos adicionar informações a mais no nosso sistema, nesse caso ele adiciona status do sistema, existem varios status que podemos colocar, desde 200 a 400 e 500, nesse caso da linha 5 usamos o 201 para o status de criado.