const { Router } = require("express");

const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router();

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const tagsController = new TagsController();


tagsRoutes.get("/:user_id",/* myMiddleware,*/tagsController.index);

module.exports = tagsRoutes;


//Linha 07 fazendo middleware;