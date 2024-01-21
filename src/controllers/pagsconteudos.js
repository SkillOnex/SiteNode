const { Registrar, RegisterModel } = require("../model/RegistrerModel");

const obterConteudo = (pagina) => {
  // Lógica para obter o conteúdo com base na página
  return `Conteúdo dinâmico para a página ${pagina}`;
};

class AgendaController {
  constructor(model) {
    this.model = model;
  }

  async getOptions() {
    try {
      const setores = await RegisterModel.distinct("setor"); // Use o método distinct para obter valores únicos
      return setores;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

exports.index = async (req, res, next) => {
  const agendaController = new AgendaController(); // Crie uma instância do controlador
  const setores = await agendaController.getOptions(); // Obtenha os setores
  const pagina = req.params.pagina;
  console.log(setores)
  if (pagina == "dashboard") {
    res.render("dashboard", { content: obterConteudo(pagina) });
    next();
  } else if (pagina == "novochamado") {
    res.render("novochamado", { content: obterConteudo(pagina), setor: setores });
    next();
  }
};
