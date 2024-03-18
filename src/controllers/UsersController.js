class UsersController {
   create(request, response){
      const { name, email, password} = request.body

      response.status(201).json({ name, email, password })
   }
}

module.exports = UsersController;

// Linha 05, utilizamos o status() para que possamos adicionar informações a mais no nosso sistema, nesse caso ele adiciona status do sistema, existem varios status que podemos colocar, desde 200 a 400 e 500, nesse caso da linha 5 usamos o 201 para o status de criado.