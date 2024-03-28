const { response, request } = require("express")

class SessionsContoller {

   //Dentro dessa classe vamos criar essa função assincrona porque ela mexe com banco de dados então é Lógico deixá-la assíncrona.
   // Vamos fazer essa função create, então iremos CRIAR uma nova sessão, já que ela está no arquivo Session Controller.
   async create(request, response){
      const { email, password } = request.body

      return response.json( { email, password })
   }
}

module.exports = SessionsContoller