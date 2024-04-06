const express = require('express');
const route = express.Router();


const centroCustoController = require('./src/controllers/centroCustoController.js');
const loginController = require('./src/controllers/loginController.js');


route.get('/', loginController.index);
route.post('/login', loginController.logar);
route.get('/deslogar', loginController.deslogar);
route.get('/listar', centroCustoController.listar);
route.get('/centrocusto/novo', centroCustoController.novoCentroCusto);
route.post('/centrocusto/cadastrar', centroCustoController.cadastrar);
route.get('/centrocusto/delete/:CODIGO', centroCustoController.deletar);

module.exports = route;
