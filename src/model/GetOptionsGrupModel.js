const mongoose = require('mongoose');

const setoresSchema = new mongoose.Schema({
  cadastro_setor: String,
});

const Setores = mongoose.model('setores', setoresSchema);

class GetOptionsGroupModel {
  async getOptions() {
    try {
      const setores = await Setores.distinct('cadastro_setor');
      
      return setores;
    } catch (err) {
      
      throw err;
    }
  }
}

module.exports = GetOptionsGroupModel;