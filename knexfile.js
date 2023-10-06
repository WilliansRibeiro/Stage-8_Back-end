const path = require("path");

module.exports = {
  development: {
    // Configuração do cliente de banco de dados (sqlite3 neste caso)
    client: 'sqlite3',
    connection: {
      // Define o caminho para o arquivo de banco de dados SQLite
      filename: path.resolve(__dirname, "src", "database", "Database.db")
    },
    pool: {
      // Define uma função para executar após a criação de cada conexão
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = on", cb)
    },
    migrations: {
      // Define o diretório onde estão localizadas as migrações do banco de dados
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    // Define o uso de valores nulos como padrão
    useNullAsDefault: true
  },
};
