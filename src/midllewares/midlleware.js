exports.meuMidlleware = (req, res, next) => {        
    
    res.locals.errors = req.flash('errors') 
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user // para por exemplo, mostrar o nome do usuário na página principal emquanto ele navega       
    //res.locals.user = req.session.user; // para por exemplo, mostrar o nome do usuário na página principal emquanto ele navega
    
    next();
}

exports.verificaUsuarioLogado = (req, res, next) => {    
    // aqui verifico se a o usuário esta tentando acessar algo que não seja o login e a Raiz e não esteja logado
    // esse middleware é global, entao se eu não verificar se é /login ele vcai num loop

    if ((req.originalUrl != '/') && (req.originalUrl != '/login') && (!req.session.user)){        
        res.redirect('/');
        return;
    }
    next();
}

