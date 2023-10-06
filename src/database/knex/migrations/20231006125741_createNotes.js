exports.up = knex => knex.schema.createTable("notes", table => {
    // Cria uma coluna de ID que auto-incrementa
    table.increments("id");
    
    // Cria uma coluna para o título da nota
    table.text("title");
    
    // Cria uma coluna para a descrição da nota
    table.text("description");
    
    // Cria uma coluna para o ID do usuário relacionado
    table.integer("user_id").references("id").inTable("users");
    
    // Cria uma coluna para a data de criação da nota
    table.timestamp("created_at").default(knex.fn.now());
    
    // Cria uma coluna para a data de atualização da nota
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("notes");
