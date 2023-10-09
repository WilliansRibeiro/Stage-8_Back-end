const { Router } = require("express");

// Importe a classe tagsController do arquivo "../controllers/tagsController"
const TagsController = require("../controllers/tagsController"); 

// Crie um objeto Router para definir rotas para esta parte do aplicativo
const tagsRoutes = Router();

// Crie uma instância da classe TagsController
const tagsController = new TagsController(); 
 
tagsRoutes.get("/:user_id", tagsController.index)

// Exporte as rotas para que possam ser usadas em outras partes do aplicativo
module.exports = tagsRoutes;
