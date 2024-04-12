const Query = require('../models/model.js');

exports.meuMidlleware = (req, res, next) => {        
    
    res.locals.errors = req.flash('errors') 
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user // para por exemplo, mostrar o nome do usuário na página principal emquanto ele navega      
    res.locals.listaEmpresas = req.session.listaEmpresas

    console.log('qqqqqqqqqqqqqqqqqqqq', req.session.empresaCorrente)

    res.locals.empresaCorrente = req.session.empresaCorrente

    console.log('ppppppppppppppppppppppppp', res.locals.empresaCorrente)
    
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

exports.carregaEmpresas = async (req, res, next) => {    

    const queryConsulta = new Query('SELECT CODIGO, CODIGO_EXTERNO, NOME FROM "G-EMPRESAS"', []);
    resultado = await queryConsulta.executaSql()      
    //console.log('yyyyyyyyyyyyyyyyyyyyy', resultado)

    req.session.listaEmpresas = resultado
    
    next()    
}

