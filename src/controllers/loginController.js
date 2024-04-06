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

    if (!vSenhaDigitada || !vUsuarioDigitado) {
        res.render('login');
        req.flash('erros', 'zkjxlkcgjdlkxlf')
        return
    }

    let vParametros = []
    vParametros.push(vUsuarioDigitado);
    console.log('parametos: ', vParametros)
    const query = new Query('SELECT SENHA FROM "G-USUARIOS" WHERE NOME = ?', vParametros);             
    vSenhaBase = await query.executaSql();

    //if (!vSenhaBase || vSenhaBase != vSenhaDigitada)  {
    if (!vSenhaBase)  {
        res.render('login');
        return
    } else {
        req.session.user = req.body.usuario; 

        req.session.save(function() {            
            res.redirect('/');                        
        })
        req.flash('sucess', 'usuário logado')         
    }
}

exports.deslogar = (req, res) => {
    req.session.destroy();    
    res.redirect('/');

}
