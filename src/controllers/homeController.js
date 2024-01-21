//const HomeModel = require('../model/HomeModel'); //Const criada no HomeModel para criar dados no MongoDB

// HomeModel.create({  // Usar a const HomeModel com o .create do moongose para criar o banco com seus valores
//     titulo: 'Testando', // valor de titulo que foi criado em HomeModel
//     descricao: 'desc teste' // Valor de descrição criado em HomeModel
// })
//     .then( dados => console.log(dados)) //caso criar mostrar o (dados) criado
//     .catch(e => console.log(e)); //se nao mostrar o erro (e)

// Controlador para renderizar a view de login.
exports.index = (req, res) => {
  if (req.session.user) {
    res.render("index");
  } else {
    res.render("login");
  } // Renderiza a view "login" ao acessar a rota correspondente.
};
