module.exports = {
   jwt: {
      
      // Assim conseguimos puxar o AUTH_SECRET de dentro do documento .env, que será o nosso Token.
      // esse secret: é usado para criar o token, quando colocavamos default dentro dele, sempre que faziamos a requisição de sessão era criado um novo.
      // Agora sempre que puxarmos a requisição na sessão será puxado esse hash. que está dentro do .env
      secret: process.env.AUTH_SECRET || "default", // Caso não seja possível encontrar a variável dentro do .env, ele criará outro hash default padrão.
      expiresIn: "1d",
   }
}