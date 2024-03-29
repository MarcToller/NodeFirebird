const express = require('express');

const route = express.Router();


const centroCustoController = require('./src/controllers/centroCustoController.js');

route.get('/', function(req, res) {
    res.status(200).send('teste')
});

route.get('/centrocusto', centroCustoController.listar);
route.post('/centrocusto', centroCustoController.cadastrar);

module.exports = route;
