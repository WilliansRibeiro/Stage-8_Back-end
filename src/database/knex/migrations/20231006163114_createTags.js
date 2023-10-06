exports.up = knex => knex.schema.createTable("tags", table => {
    // Cria uma coluna de ID que auto-incrementa
    table.increments("id");
    
    // Cria uma coluna para o nome da tag que não pode ser nula
    table.text("name").notNullable();
    
    // Cria uma coluna para o ID da nota relacionada, com a opção de exclusão em cascata (CASCADE)
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    
    // Cria uma coluna para o ID do usuário relacionado
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("tags");
