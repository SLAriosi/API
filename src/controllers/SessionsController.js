const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")

const { response, request } = require("express")

class SessionsContoller {

   //Dentro dessa classe vamos criar essa função assincrona porque ela mexe com banco de dados então é Lógico deixá-la assíncrona.
   // Vamos fazer essa função create, então iremos CRIAR uma nova sessão, já que ela está no arquivo Session Controller.
   async create(request, response){
      const { email, password } = request.body

      // Aqui definimos que o sistema vai puxar para ver se um usuário tem email cadastrado, o first serve para que ele pegue apenas o primeiro já que não é pra existir nenhuma pessoa com email repetido.
      const user = await knex("users").where({ email }).first()

      // Condicional de dados para que caso o usuário não exista no cadastro aparecer esse erro de Email / senha inválidos.
      if (!user) {
         throw new AppError("Email e/ou senha inválidos", 401)
      }
      
      // Setamos um valor booleano aqui para que caso as senhas do banco de dados do usuário com a senha escrita no json sejam as mesmas, ele colocar um valor truth e continuar na aplicação.
      const passwordMatched = await compare(password, user.password)
      
      // Condicional de que caso a senha não tenha dado match, apareça Senha ou Email Inválidos com o erro 401.
      if (!passwordMatched) {
         throw new AppError("Email e/ou senha inválidos", 401)
      }

      // Caso tenha passado por todas as validações, então o usuário chegará aqui onde irá mostrar tudo que tem sobre o user.
      return response.json( user )
   }
}

module.exports = SessionsContoller