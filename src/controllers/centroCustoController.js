const firebird = require('node-firebird');


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

exports.index = (req, res) => {
    console.log('passou no index')
    res.render('centroCusto', {centroCusto: {CODIGO: 0, EMPRESA_ID: 1263}})
}

exports.listar = async (req, res) => {
    console.log('passou no listar 1')    
    let vSql = 'SELECT FIRST 10 * FROM "G-CENTRO_CUSTO" WHERE 1 = 1 '
    let vParams = []

    if (req.query.codigo_externo) {
        vSql += 'AND CODIGO_EXTERNO = ?'
        vParams.push(req.query.codigo_externo)
    }

    try {        
    // o  attach é como dar um connected = true na conexção Delphi
        await firebird.attach(Conexao, function(err, db) {
                if (err) {                    
                    return res.status(500).json(err)
                }         
                
                    // db é a conexo
                db.query(vSql, vParams, function(err, result) {                
                    db.detach(); // desconecta o banco
                    
                    if (err) {                        
                        return res.status(500).json(err)
                    } else {
                        //console.log(result) 
                        
                        let listaCentroCusto = result;
                        let errors = []
                        let sucess = []
                        let teste = {listaCentroCusto, errors, sucess}

                        res.render('index', teste); // Envia para o index.ejs para listar lá   
                        //return res.status(200).json(result)                        
                    }
    
                });                
              });        
        
    } catch (e) {
        console.log(e);
        //res.render('404.ejs')
    }
    console.log('fim') // PARECE QUE O ASYNC AWAIT NÃO ESTA FUNCIONANDO AQUI..
}


exports.deletar = async (req, res) => {

    console.log(req.params)

    let vParams = []
    if (!req.params.CODIGO) {
        return res.render('404')        
    } else {
        vParams = [req.params.CODIGO]
    }  
    
    try {        
        // o  attach é como dar um connected = true na conexção Delphi
            await firebird.attach(Conexao, function(err, db) {
                    if (err) {                    
                        return res.status(500).json(err)
                    }                             
                        // db é a conexo
                    db.query('DELETE FROM "G-CENTRO_CUSTO" WHERE CODIGO = ?', vParams, 
                        function(err, result) {                
                            db.detach(); // desconecta o banco                        
                        
                            if (err) {                        
                                //console.log(err)   
                                return res.status(500).json(err)
                            } else {
                                res.flash('sucess', 'Contato excluído com sucesso.'); 
                                res.redirect('/')
                            }
        
                         });                
                  });        
            
        } catch (e) {
            console.log(e);
            //res.render('404.ejs')
        }    


}

exports.cadastrar = async (req, res) => {
    console.log('passou no cadastrar')    
    let vParams = []

    req.body.empresa_id = 1263;

    vParams.push(req.body.descricao)
    vParams.push(req.body.codigo_externo)
    vParams.push(req.body.empresa_id)

    console.log(vParams)

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
                            return res.status(200).json({codigo: result.CODIGO})
                        }
    
                     });                
              });        
        
    } catch (e) {
        console.log(e);
        //res.render('404.ejs')
    }
    console.log('fim') // PARECE QUE O ASYNC AWAIT NÃO ESTA FUNCIONANDO AQUI..
}