const express = require('express');
const cors = require('cors');


const app = express()

const rotas = require('./rotas.js')

// middleware json
app.use(express.json())

//app.use(express.urlencoded({extended: true}))

// middleware cors (para que a aplicação possa ser acesada de fora)
app.use(cors())

app.use(rotas)

app.listen(3000, function(){
    console.log('aplicação rodando na porta 3000')
})