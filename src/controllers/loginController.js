const Query = require('../models/model.js');


exports.index = (req, res) => {

    if (req.session.user) {
        res.redirect('/listar');
        return;
    }
    res.render('login');
}


exports.logar = async (req, res) => {
    
    vSenhaDigitada = req.body.senha
    vUsuarioDigitado = req.body.usuario

    if (!vSenhaDigitada && !vUsuarioDigitado) {
        req.flash('errors', 'Digite o usuário e a senha')
        res.redirect('/');        
        return
    }

    let vParametros = []
    vParametros.push(vUsuarioDigitado);
    console.log('parametos: ', vParametros)
    const query = new Query('SELECT SENHA FROM "G-USUARIOS" WHERE NOME = ?', vParametros);             
    vSenhaBase = await query.executaSql();

    if (query.errors.length > 0) {        
        req.flash('errors', query.errors)  
        res.redirect('/');            
        return
    } 

    if (vSenhaBase.length == 0) {
    //if (!vSenhaBase)  {
        req.flash('errors', 'Usuário inexistente')
        res.redirect('/');            
        return
    } else if (!vSenhaDigitada){
        req.flash('errors', 'Digite a senha')
        res.redirect('/');        
        return          
//    } else if (vSenhaBase != vSenhaDigitada){
//        req.flash('errors', 'Senha incorreta')
//        res.redirect('/');        
//        return    
    } else {
        req.flash('sucess', 'Usuário conectado')
        req.session.user = req.body.usuario                 
        req.session.save(function() {                    
        res.redirect('/');                        
        })        
    }
}

exports.deslogar = (req, res) => {
    req.session.user = null         
    req.session.destroy();            
    res.redirect('/');

}
