const { Router } = require("express");

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router();

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const notesController = new NotesController();


notesRoutes.get("/",/* myMiddleware,*/notesController.index);
notesRoutes.post("/:user_id",/* myMiddleware,*/notesController.create);
notesRoutes.get("/:id",/* myMiddleware,*/notesController.show);
notesRoutes.delete("/:id",/* myMiddleware,*/notesController.delete);

module.exports = notesRoutes;


//Linha 07 fazendo middleware;