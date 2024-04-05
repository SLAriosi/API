require("express-async-errors");
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
// Ele é usado para fazer as API, ele é o garçom, e nós definimos a porta ali abaixo no const PORT para ele saber em qual restaurante (Porta do localhost) que ele vai trabalhar.
const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const uploadConfig = require("./configs/upload")
//Aqui é onde colocamos oque queremos fazer em certa parte da API.
//Utilizmos o .get para selecionarmos qual será a rota que aparecerá certa coisa para o usuário, exemplo se eu colocar ali no lugar do "/" um "/message" então no seu browser você tem que colocar o localhost:3333/message para que apareça o Hello World! 
migrationsRun();

const app = express()
app.use(cors())
app.get("/message", (request, response) => {
   response.send("Hello World")
})
//Utilizando o response.send serve para gerarmos uma resposta, para enviarmos algo pra dentro do site em que estamos criando, e nesse caso ele é utilizado para escrever apenas Hello World.
//Utilizando depois do /message o /:qualquercoisa a API vai entender que o : vem seguido de um parâmetro, e esse parâmetro serve pra decidirmos oque irá aparecer na rota /message.
app.get("/message/:id/:user", (request, response) => {
   // Voce pode desestruturar o request.params aqui dessa maneira para que no ${request.params.id} & ${request.params.user} voce possa colocar apenas ${id} e ${user}
   const { id, user } = request.params
   
   response.send(`
   ID da Mensagem: ${id}.
   Para o usuário ${user}.
   `)
})
//Esse app.use é necessário utilizar para que o sistema entenda que vamos passar essas informações por meio de uma expressão JSON(), ou outra dependendo do que estamos trabalhando, se não utilizarmos vai dar erro
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);


app.use(( error, request, response, next) => {
   if (error instanceof AppError) {
      return response.status(error.statusCode).json({
         status: "error",
         message: error.message
      })
   }

   console.error(error)

   return response.status(500).json({
      status: "error",
      message: "Internal server error",
   })

})

// Pra ele sempre ficar observando a porta que ele irá realizar as funções e outras coisas que adicionarmos à API utilizamos o Listen
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));