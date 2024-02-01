const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController'); // recupera as paginas na pasta homeController
const loginController = require('./src/controllers/loginController'); // recupera as paginas na pasta loginController
const conteudosController = require('./src/controllers/pagsconteudos'); // recupera as paginas na pasta loginController
const sendchamado = require('./src/controllers/sendchamado'); // recupera as paginas na pasta loginController
const grupos = require('./src/controllers/editgruposController');
const registrarsetor = require('./src/controllers/registrarsetorController');
const registergroupsController = require('./src/controllers/registergroupController');
const dashboard = require('./src/controllers/dashboardController');
const chamadoController = require('./src/controllers/chamadoController');
const updateGrupoController = require('./src/controllers/updategrupoController');




//Rotas Home
route.get('/', homeController.index  ); // Cria uma rota importando de homeController a pagina inicial criada la

// Rota login
route.get('/login', loginController.index)
route.post('/entrar', loginController.entrar)



route.get('/registersetor.admin', registrarsetor.index)
route.post('/registersetor.register', registrarsetor.register)


// Rota login
route.get('/logout', loginController.logout)
route.get('/conteudo/:pagina', conteudosController.index)

//Rota DashBoard
route.get('/dashboard', dashboard.index)

//Rota NovoChamado
route.get('/chamado', chamadoController.index)


//Rota Chamado
route.post('/sendchamado', sendchamado.msgsend)

//Rota Grupo
route.get('/editgrupos', grupos.index)
route.post('/editgrupos', updateGrupoController.updateGroup);


//rota modal grupo 
route.post('/registergroup' , registergroupsController.register)
 

module.exports = route; // exporta o route para usar