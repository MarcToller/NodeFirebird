const express = require('express');

const route = express.Router();


const centroCustoController = require('./src/controllers/centroCustoController.js');


route.get('/', centroCustoController.listar);
route.get('/centrocusto', centroCustoController.index);
route.post('/centrocusto', centroCustoController.cadastrar);
route.get('/centrocusto/delete/:CODIGO', centroCustoController.deletar);

module.exports = route;
