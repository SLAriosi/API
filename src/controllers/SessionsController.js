const knex = require("../database/knex")
const AppError = require("../utils/AppError")

const { response, request } = require("express")

class SessionsContoller {

   //Dentro dessa classe vamos criar essa função assincrona porque ela mexe com banco de dados então é Lógico deixá-la assíncrona.
   // Vamos fazer essa função create, então iremos CRIAR uma nova sessão, já que ela está no arquivo Session Controller.
   async create(request, response){
      const { email, password } = request.body

      const user = await knex("users").where({ email }).first()

      if (!user) {
         throw new AppError("Email e/ou senha inválidos", 401)
      }

      return response.json( user )
   }
}

module.exports = SessionsContoller