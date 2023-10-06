exports.up = knex => knex.schema.createTable("links", table => {
    // Cria uma coluna de ID que auto-incrementa
    table.increments("id");
    
    // Cria uma coluna para a URL do link, que não pode ser nula
    table.text("url").notNullable();
    
    // Cria uma coluna para o ID da nota relacionada, com a opção de exclusão em cascata (CASCADE)
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    
    // Cria uma coluna para a data de criação do link, com valor padrão sendo a data atual
    table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("links");
