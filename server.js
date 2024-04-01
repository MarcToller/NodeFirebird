const express = require('express');
const cors = require('cors');


const app = express()
const path = require('path');

const rotas = require('./rotas.js')

// middleware json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(express.urlencoded({extended: true}))

// middleware cors (para que a aplicação possa ser acesada de fora)
app.use(cors())

app.use(rotas)


app.set('views', path.resolve(__dirname, 'src', 'frontend', 'views'));
app.set('view engine', 'ejs');


app.listen(3000, function(){
    console.log('aplicação rodando na porta 3000')
})