const firebird = require('node-firebird');
const Query = require('../models/model.js');
const { async } = require('regenerator-runtime');


const Conexao = {
    host: 'localhost',
    port: 3121,
    database: 'c:\\data cempro\\dados\\datacemprodados2.ib',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys:  false, // set to true to lowercase keys
    role : null,            // default
    pageSize: 4096,        // default when creating database

}

exports.listar = async (req, res) => {

    const query = new Query('SELECT FIRST 10 * FROM "G-CENTRO_CUSTO" ORDER BY CODIGO_EXTERNO', []);             
    lista = await query.executaSql();        
    res.render('index', {listaCentroCusto: lista, errors: [], sucess: []})
}

exports.deletar = async (req, res) => {
    //const dataInicio = new Date();
    try{
        let vParams = []
        if (!req.params.CODIGO) {
            return res.render('404')        
        } else {
            vParams = [req.params.CODIGO]
        }  

        //console.log('INÍCIO EXCLUSÃO', dataInicio.toLocaleTimeString('pt-BR', {})) 

        const query = new Query('DELETE FROM "G-CENTRO_CUSTO" WHERE CODIGO = ?', vParams);             
        await query.executaSql(); 

        //const dataFinal = new Date();
        //console.log('FINAL EXCLUSÃO', dataFinal.toLocaleTimeString('pt-BR', {}))      
        
        req.flash('sucess', 'Registro excluído com sucesso');          
    //req.session.sucess = ''
        res.redirect('/');                                                           
    } catch(e) {
        console.log(e);
        res.render('404.ejs')
    }    
}

exports.novoCentroCusto = (req, res) => {
    res.render('centroCusto', {centroCusto: {CODIGO: 0, EMPRESA_ID: 1263}, errors: [], sucess: []})    
}


exports.cadastrar = async (req, res) => {
    console.log('passou no cadastrar')    
    let vParams = []

    req.body.empresa_id = 1263;    
    vParams.push(req.body.descricao)   
    vParams.push(req.body.codigo_externo)
    vParams.push(req.body.empresa_id)

    for (const key in req.body) {
        console.log(key) 
        console.log(req.body[key]) 
        
    }    

    try {        
    // o  attach é como dar um connected = true na conexção Delphi
        await firebird.attach(Conexao, function(err, db) {
                if (err) {                    
                    return res.status(500).json(err)
                }         
                
                    // db é a conexo
                db.query('INSERT INTO "G-CENTRO_CUSTO"(CODIGO, DESCRICAO, CODIGO_EXTERNO, EMPRESA_ID) VALUES (GEN_ID(GEN_INTERNO_CADASTROS, 1), ?, ?, ?) RETURNING CODIGO', vParams, 
                    function(err, result) {                
                        db.detach(); // desconecta o banco                        
                    
                        if (err) {                        
                            //console.log(err)   
                            return res.status(500).json(err)
                        } else {
                            req.flash('sucess', 'Centro de Custo cadastrado com sucesso')
                            res.redirect('/')                    
                        }
                     });                
              });        

    } catch (e) {
        console.log(e);
        //res.render('404.ejs')
    }
    console.log('fim') // PARECE QUE O ASYNC AWAIT NÃO ESTA FUNCIONANDO AQUI..
}