// Esse aqui é o nosso middleware de garantia que o usuário está autenticado.

// Esse verify está disponível no nosso jsonwebtoken
const { verify } = require("jsonwebtoken")

// Função para quando dar erro já escrevermos a menssagem e definirmos o status do erro. Nós criamos essa função
const AppError = require("../utils/AppError")

// Esse authConfig serve para obtermos e sabermos como está a nossa configuração de autenticação
const authConfig = require("../configs/auth")

// Essa é a função principal do nosso arquivo, portanto ela traz o nome do arquivo para facilitar e ficar mais lógico
function ensureAuthenticated(request, response, next) {

   // Esse valor vai ser pego, indo até o cabeçalho, e lá dentro do cabeçalho temos o authorization que é onde está o token do usuário ( de autorização )
   const authHeader = request.headers.authorization

   // Caso não haja um Token, nesse caso ele é escrito como authHeader ele cai nesse erro.
   if (!authHeader) {
      throw new AppError("JWT Token Não informado", 401)
   }

   // Depois de passar pela validação de caso haja algo dentro, ele verifica se esse token é de um usuário compatível com o token utilizado.
   // Como funciona esse array [, token], é que dentro do authorization = "authHeader" o token é armazenado da seguinte forma "Bare token", então para separarmos esse texto em arrays usando o .split com (espaço " ");
   // usando dessa forma dentro de um array ficaria assim ["Bare", "chaveEstranhaToken"], como só queremos saber do token nós puxamos o segundo array só colocando a vírgula e puxando o token.
   // E para deixar dinâmico nós podemos colocar uma variável para receber o valor do Token que está em uso naquele momento.
   // Resumo, estamos usando o split para quebrar um texto que vem dentro do authorization e transformá-lo em array, e a gente só está chamando a segunda posição desse array, passando direto pra uma variável chamada token.
   const [, token] = authHeader.split(" ")

   try {

      // No início nós recebemos no sub que é o conteúdo que está dentro do verify, e transformamos ele num user_id usando o sub: user_id.
      // O sub por ter o : significa que é uma propriedade que consigo desestruturar do resultado do verify, se o verify for valido (true) então vai retornar o valor pra dentro do sub
      // E esse : user_id significa que estamos apenas alterando o nome do sub para user_id.
      // Usamos o verify que é do jasonwebtoken, e passamos dentro dele o token, e também dentro do authConfig passamos o jwt.secret.
      const { sub: user_id } = verify(token, authConfig.jwt.secret);

      // Dentro do request vamos passar uma propriedade que estamos criando apenas a partir de agora chamada user, e dentro da user criamos a propriedade id, que iremos transformar do tipo que ela era, para o tipo Number
      // E assim transformamos ela por final em user_id (transformamos o id em user_id)
      // Nós precisamos do Number porque antes lá na SessionController.js ( +- line 25 ) nós transformamos ela em uma String, e aqui precisamos que ela seja um número.
      request.user = {
         id: Number(user_id),
      }

      //Após isso caso tenha dado tudo certo, nós entramos no return para que o middleware chame a função destino, localdade que era pra função ter ido antes de o middleware pegar ela pra validar aqui.
      return next()

   } catch (error) {
      throw new AppError("JWT Token Inválido", 401)
   }
}

// E aqui exportamos essa função para que nós possamos utiliza-la na aplicação.
module.exports = ensureAuthenticated;