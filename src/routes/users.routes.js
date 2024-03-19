const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const usersController = new UsersController()


usersRoutes.post("/",/* myMiddleware,*/usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;


//Linha 07 fazendo middleware;