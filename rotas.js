const express = require('express');
const route = express.Router();
const path = require('path');


const centroCustoController = require('./src/controllers/centroCustoController.js');
const loginController = require('./src/controllers/loginController.js');

const {carregaEmpresas} = require(path.resolve(__dirname, 'src', 'midllewares', 'midlleware.js'))


route.get('/', carregaEmpresas, loginController.index);
route.post('/login', loginController.logar);
route.get('/deslogar', loginController.deslogar);


route.get('/listar', centroCustoController.listar);
route.get('/centrocusto/tela_cadastro/:CODIGO', centroCustoController.tela_cadastro);
route.post('/centrocusto/inserir', centroCustoController.inserir);
route.post('/centrocusto/editar', centroCustoController.editar);
route.get('/centrocusto/delete/:CODIGO/:DESCRICAO', centroCustoController.deletar);

module.exports = route;
