const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const usersController = new UsersController()


usersRoutes.post("/",/* myMiddleware,*/usersController.create);

// Quando o usuário acessar essa rota, o middleware fará a verificação e depois levará o usuário até a função de atualizar de fato, nesse caso no update do usersController.
// Como agora pegamos o valor lá no middleware, não precisamos mais passar parâmetros fixos dentro do .put("/") pois vai automaticamente pro token utilizado.
// Agora é só usarmos ou o método put ou post.
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;


//Linha 07 fazendo middleware;