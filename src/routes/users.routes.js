// Importa o objeto Router do Express
const { Router } = require("express");

// Importa o controlador de usuários
const UsersController = require("../controllers/UsersController");

// Cria um objeto Router para as rotas de usuários
const usersRoutes = Router();

// Instancia o controlador de usuários
const usersController = new UsersController();

// Define as rotas para as operações relacionadas aos usuários
usersRoutes.post("/", usersController.create); // Rota para criar um usuário
usersRoutes.put("/:id", usersController.update); // Rota para atualizar um usuário

// Exporta as rotas de usuários para serem utilizadas pela aplicação
module.exports = usersRoutes;
