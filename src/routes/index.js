// Importa o objeto Router do Express
const { Router } = require("express");

// Importa as rotas relacionadas aos usuários e às notas
const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");

// Cria um objeto Router para agrupar todas as rotas
const routes = Router();

// Define as rotas para os endpoints relacionados aos usuários e notas
routes.use("/users", usersRouter); // Define as rotas relacionadas aos usuários
routes.use("/notes", notesRouter); // Define as rotas relacionadas às notas

// Exporta o objeto de rotas para ser utilizado pela aplicação
module.exports = routes;
