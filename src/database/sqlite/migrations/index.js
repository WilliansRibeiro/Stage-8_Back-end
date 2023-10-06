// Importa a conexão com o banco de dados SQLite
const sqliteConnection = require("../../sqlite");

// Importa o script de criação da tabela de usuários
const createUsers = require("./createUsers");

// Função assíncrona para executar migrações
async function migrationsRun() {
  // Array de scripts de migração
  const schemas = [createUsers].join("");

  // Obtém a conexão com o banco de dados SQLite
  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

// Exporta a função de execução de migrações
module.exports = migrationsRun;
