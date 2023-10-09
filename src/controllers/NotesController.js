const knex = require("../database/knex");

class NotesController {
  // Método para criar uma nova nota
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    // Insere uma nova nota no banco de dados
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    // Cria registros de links relacionados à nota
    const LinksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    // Insere os links no banco de dados
    await knex("links").insert(LinksInsert);

    // Cria registros de tags relacionados à nota
    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    // Insere as tags no banco de dados
    await knex("tags").insert(tagsInsert);

    // Responde com uma resposta vazia
    res.json();
  }

  // Método para mostrar detalhes de uma nota específica
  async show(req, res) {
    const { id } = req.params;
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    // Responde com os detalhes da nota, tags e links
    return res.json({
      ...note,
      tags,
      links,
    });
  }

  // Método para excluir uma nota específica
  async delete(req, res) {
    const { id } = req.params;
    await knex("notes").where({ id }).delete();

    // Responde com uma resposta vazia
    return res.json();
  }

  // Método para listar notas com base em filtros
  async index(req, res) {
    const { title, user_id, tags } = req.query;

    let notes;

    if (tags) {
      // Filtra notas com base em tags
      const filterTags = tags.split(",").map((tag) => tag.trim())
      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title",`%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.title")

    } else {
      // Filtra notas por título e usuário
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({user_id});
    const notesWithTags = notes.map(note =>{
    const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return{
        ...note,
        tags: noteTags
      }
    });
    // Responde com as notas filtradas
    return res.json(notesWithTags);
  }
}

module.exports = NotesController;
