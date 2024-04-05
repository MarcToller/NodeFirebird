exports.meuMidlleware = (req, res, next) => {        
    //objeto locals:
    //res.locals.umaVariavelLocal = 'este é o valor da variável local';
    //console.log('passou no meu midlleware')
    res.locals.errors = req.flash('errors'); // Captura as mensagens de erro que registrei nmo loginController    
    res.locals.sucess = req.flash('sucess');

    //res.locals.user = req.session.user; // para por exemplo, mostrar o nome do usuário na página principal emquanto ele navega
    
    next(); //midllewares SEMPRE precisam de next
}
