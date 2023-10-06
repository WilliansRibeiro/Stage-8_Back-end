const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

module.exports = createUsers



//Verifica se a tabela "users" já existe; se não existir, a cria
//CREATE TABLE IF NOT EXISTS users (
//Coluna de ID com autoincremento
//id INTEGER PRIMARY KEY AUTOINCREMENT, 
//Coluna para o nome do usuário
//name VARCHAR,
//Coluna para o email do usuário
//email VARCHAR,
//Coluna para a senha do usuário
//password VARCHAR,
 //Coluna para o avatar do usuário (opcional, permitindo nulo)
//avatar VARCHAR NULL,
//Coluna para a data de criação, com valor padrão sendo a data e hora atuais
//created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//Coluna para a data de atualização, com valor padrão sendo a data e hora atuais
//updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

