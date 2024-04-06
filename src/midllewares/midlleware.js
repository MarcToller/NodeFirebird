exports.meuMidlleware = (req, res, next) => {        
    
    res.locals.errors = req.flash('errors'); 
    res.locals.sucess = req.flash('sucess');
    
    //res.locals.user = req.session.user; // para por exemplo, mostrar o nome do usuário na página principal emquanto ele navega
    
    next();
}
