const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require('../Database/sqlite');

class UsersController {
   // Método para criar um novo usuário
   async create(req, res) {
    const { name, email, password } = req.body;

    // Conecta ao banco de dados SQLite
    const Database = await sqliteConnection();

    // Verifica se já existe um usuário com o mesmo email
    const checkUserExists = await Database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso");
    }

    // Hash da senha do usuário antes de armazená-la no banco de dados
    const hashedPassword = await hash(password, 8)

    // Insere o usuário no banco de dados
    await Database.run("INSERT INTO users(name, email, password) VALUES (?,?,?)",
    [name, email, hashedPassword]);

    return res.status(201).json();
   }

   // Método para atualizar informações do usuário
   async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    // Conecta ao banco de dados SQLite
    const Database = await sqliteConnection();
    
    // Busca o usuário pelo ID
    const user = await Database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user){
      throw new AppError("Usuário não encontrado");
    }
  
    // Verifica se o novo email já está em uso por outro usuário
    const userWithUpdatedEmail = await Database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Este email já está em uso!");
    }

    // Atualiza as informações do usuário
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    // Verifica a alteração de senha
    if(password && !old_password){
      throw new AppError("Você deve informar a senha antiga")
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.")
      }

      // Hash da nova senha antes de atualizá-la no banco de dados
      user.password = await hash(password, 8)
    }

    // Atualiza as informações do usuário no banco de dados
    await Database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user.id]
    );

    return res.status(200).json(user);
  }
}

module.exports = UsersController;
