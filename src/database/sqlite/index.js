// Importa as bibliotecas necessárias para a conexão com o SQLite
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

// Função assíncrona para estabelecer a conexão com o banco de dados SQLite
async function sqliteConnection() {
    // Define o caminho para o arquivo do banco de dados SQLite
    const Database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "Database.db"),
        driver: sqlite3.Database
    });

    // Retorna a conexão estabelecida
    return Database;
}

// Exporta a função de conexão com o SQLite para uso em outros módulos
module.exports = sqliteConnection;
