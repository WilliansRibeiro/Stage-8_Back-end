const knex = require("../database/knex");

class TagsController {
  async index(req, res) {
    const { user_id } = req.params; // Use desestruturação para obter user_id

    // Consulta as tags filtrando pelo user_id
    const tags = await knex("tags").where({ user_id });

    // Retorna as tags como JSON
    return res.json(tags);
  }
}

module.exports = TagsController;
