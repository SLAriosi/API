const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const UserAvatarController = require("../controllers/UserAvatarController")

const usersRoutes = Router();

const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// Vamos utilizar o multer para podermos carregar a imagem lá na linha 34.
const multer = require("multer");

// Vamos utilizar esse upload como o nosso multer, com as configurações que precisamos no caso o uploadConfig
const upload = multer(uploadConfig.MULTER)

// function myMiddleware(request, response, next) {
//    console.log("Você passou pelo Middleware!");
   
//    if (!request.body.isAdmin) {
//       return response.json({ message: "user unauthorized" })
//    }

//    next()
// }

const usersController = new UsersController()

const userAvatarController = new UserAvatarController()


usersRoutes.post("/",/* myMiddleware,*/usersController.create);

// Quando o usuário acessar essa rota, o middleware fará a verificação e depois levará o usuário até a função de atualizar de fato, nesse caso no update do usersController.
// Como agora pegamos o valor lá no middleware, não precisamos mais passar parâmetros fixos dentro do .put("/") pois vai automaticamente pro token utilizado.
// Agora é só usarmos ou o método put ou post.
usersRoutes.put("/", ensureAuthenticated, usersController.update);

// O patch é quando queremos atualizar um (apenas 1) campo específico do nosso banco de dados. Já o put é pra quando queremos atualizar mais de 1.
// Nesse caso queremos só atualizar a imagem do avatar do usuário por esse motivo utilizamos o patch.
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = usersRoutes;


//Linha 07 fazendo middleware;