const express = require('express');
const cors = require('cors');
const app = express()
const path = require('path');
const flash = require('connect-flash');
const minhaSession = require('express-session');
const rotas = require('./rotas.js')
const {meuMidlleware} = require(path.resolve(__dirname, 'src', 'midllewares', 'midlleware.js'))


app.use(express.json())
app.use(express.urlencoded({extended: true}))


const sessionOptions = minhaSession({
    secret: 'asdafdadfadfsdfsd', // aqui pode ser qualquer coisa, isso pelo que entendi seria um identificador da sessão na base, eu prefiro colocar uma guid, mas não sei se o JS gera guids
    
    resave: false,
    saveUninitialized: false,
    cookie: { // quanto tempo o cookie vai durar
        maxAge: 1000*60*60*24*7, // quanto tempo em miliseguntos! vamos colocar 7 dias!
        httpOnly: true  
    }
});

app.use(sessionOptions);


app.use(flash())
app.use(meuMidlleware)
app.use(cors())
app.use(rotas)
app.set('views', path.resolve(__dirname, 'src', 'frontend', 'views'));
app.set('view engine', 'ejs');

app.listen(3000, function(){
    console.log('aplicação rodando na porta 3000')
})