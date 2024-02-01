const crypto = require("crypto");

const GetOptionsGroupModel = require('../model/GetOptionsGrupModel');
const GetOptionsForGroupController = require('../controllers/getoptionsforgroupController');




exports.middlewareGlobal = async (req, res, next) => {
  try {
    const setoresModel = new GetOptionsGroupModel();
    const setoresgrupo = await setoresModel.getOptions();

    
    // Adicione a variável 'setores' aos locais (locals) da resposta.
    res.locals.setores = setoresgrupo;

    // Variáveis existentes no seu middleware global
    const nonce = crypto.randomBytes(16).toString("base64");
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    res.locals.nonce = nonce;

    next(); // Chama a próxima função middleware na pilha.
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404"); // Renderiza a view "404" em caso de erro CSRF (Cross-Site Request Forgery).
  }
  next(); // Chama a próxima função middleware na pilha.
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Adiciona o token CSRF aos locais (locals) da resposta.
  next(); // Chama a próxima função middleware na pilha.
};
