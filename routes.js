const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController'); // recupera as paginas na pasta homeController
const loginController = require('./src/controllers/loginController'); // recupera as paginas na pasta loginController
const registrarController = require('./src/controllers/registrarController'); // recupera as paginas na pasta loginController
const conteudosController = require('./src/controllers/pagsconteudos'); // recupera as paginas na pasta loginController
const sendchamado = require('./src/controllers/sendchamado'); // recupera as paginas na pasta loginController


//Rotas Home
route.get('/', homeController.index); // Cria uma rota importando de homeController a pagina inicial criada la

// Rota login
route.get('/login', loginController.index)
route.post('/entrar', loginController.entrar)


// Rota login
route.get('/registrar', registrarController.index)
route.post('/register', registrarController.register)

// Rota login
route.get('/logout', loginController.logout)
route.get('/conteudo/:pagina', conteudosController.index)


route.post('/sendchamado', sendchamado.msgsend)



 

module.exports = route; // exporta o route para usar