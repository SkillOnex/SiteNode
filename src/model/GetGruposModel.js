const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    _id : String,
    Nome: String,
    Setores: [String],
});

const GrupoModel = mongoose.model('Grupo', GrupoSchema);

class GetGrupos {
    async getGrupos() {
      try {
        const grupos = await GrupoModel.find({}, { _id: 1 , Nome: 1, Setores: 1}).exec();
        return grupos;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

module.exports = GetGrupos;