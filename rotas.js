const express = require('express');
const route = express.Router();


const centroCustoController = require('./src/controllers/centroCustoController.js');
const loginController = require('./src/controllers/loginController.js');


route.get('/', loginController.index);
route.post('/login', loginController.logar);
route.get('/deslogar', loginController.deslogar);


route.get('/listar', centroCustoController.listar);
route.get('/centrocusto/tela_cadastro/:CODIGO', centroCustoController.tela_cadastro);
route.post('/centrocusto/inserir', centroCustoController.inserir);
route.post('/centrocusto/editar', centroCustoController.editar);
route.get('/centrocusto/delete/:CODIGO', centroCustoController.deletar);

module.exports = route;
