const { Router } = require("express");

// Importe a classe NotesController do arquivo "../controllers/NotesController"
const NotesController = require("../controllers/NotesController"); 

// Crie um objeto Router para definir rotas para esta parte do aplicativo
const notesRoutes = Router();

// Crie uma instância da classe NotesController
const notesController = new NotesController(); 

// Defina as rotas e associe cada rota a um método da classe NotesController

// Rota para listar todas as notas (índice)
notesRoutes.get("/", notesController.index); 

// Rota para criar uma nova nota associada a um usuário específico
notesRoutes.post("/:user_id", notesController.create); 

// Rota para mostrar detalhes de uma nota específica
notesRoutes.get("/:id", notesController.show);

// Rota para excluir uma nota específica
notesRoutes.delete("/:id", notesController.delete); 

// Exporte as rotas para que possam ser usadas em outras partes do aplicativo
module.exports = notesRoutes;
