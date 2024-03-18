// Ele é usado para fazer as API, ele é o garçom, e nós definimos a porta ali abaixo no const PORT para ele saber em qual restaurante (Porta do localhost) que ele vai trabalhar.
const express = require("express");

//Aqui é onde colocamos oque queremos fazer em certa parte da API.
const app = express();

//Utilizmos o .get para selecionarmos qual será a rota que aparecerá certa coisa para o usuário, exemplo se eu colocar ali no lugar do "/" um "/message" então no seu browser você tem que colocar o localhost:3333/message para que apareça o Hello World! 
//Utilizando o response.send serve para gerarmos uma resposta, para enviarmos algo pra dentro do site em que estamos criando, e nesse caso ele é utilizado para escrever apenas Hello World.
app.get("/", (request, response) => {
   response.send("Hello World")
});


// Pra ele sempre ficar observando a porta que ele irá realizar as funções e outras coisas que adicionarmos à API utilizamos o Listen
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));