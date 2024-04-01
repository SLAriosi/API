const { Router } = require("express");

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/",/* myMiddleware,*/notesController.index);
notesRoutes.post("/",/* myMiddleware,*/notesController.create);
notesRoutes.get("/:id",/* myMiddleware,*/notesController.show);
notesRoutes.delete("/:id",/* myMiddleware,*/notesController.delete);

module.exports = notesRoutes;


//Linha 07 fazendo middleware;