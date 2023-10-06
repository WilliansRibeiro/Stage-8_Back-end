// Importa o módulo "express-async-errors" para lidar com erros assíncronos no Express
require("express-async-errors");

// Importa a função que executa as migrações do banco de dados
const migrationsRun = require("./Database/sqlite/migrations");

// Importa a classe de erro personalizado "AppError"
const AppError = require("./utils/AppError");

// Importa o módulo "express"
const express = require("express");

// Importa as rotas da aplicação
const routes = require("./routes");

// Executa as migrações do banco de dados
migrationsRun();

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.json());

// Usa as rotas definidas na aplicação
app.use(routes);

// Middleware para tratamento de erros
app.use((error, request, response, next) => {
  // Verifica se o erro é uma instância da classe "AppError"
  if (error instanceof AppError) {
    // Retorna uma resposta com o código de status e mensagem de erro personalizada
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  // Registra o erro no console
  console.error(error);

  // Retorna uma resposta de erro interno do servidor (status 500)
  return response.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});

// Define a porta em que o servidor irá ouvir
const PORT = 3333;
app.listen(PORT, () => console.log(`O servidor está em execução na porta ${PORT}`));
