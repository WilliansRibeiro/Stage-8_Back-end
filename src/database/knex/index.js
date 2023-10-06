// Importa a configuração do Knex a partir do arquivo knexfile.js
const config = require("../../../knexfile");

// Importa a biblioteca Knex
const knex = require("knex");

// Cria uma conexão com o banco de dados usando a configuração para o ambiente de desenvolvimento
const connection = knex(config.development);

// Exporta a conexão para ser usada em outros módulos
module.exports = connection;
