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


class Query {
    constructor(sql, parametros) {        
        this.sql = sql;        
        this.parametros = parametros;
        this.errors = [];
        this.sucess = [];
        this.listaRegistros = [];
    }

    executaSql(){
        console.log(this.sql)    
        return new Promise((resolve, reject) => {
            firebird.attach(Conexao, function(err, db) {
                if (err) {                    
                    reject(err)
                    this.errors.push(err)
                    return;
                }         
                
                    // db é a conexo
                
                db.query('SELECT FIRST 10 * FROM "G-CENTRO_CUSTO"', [], function(err, result) {                
                    db.detach(); // desconecta o banco
                    
                    if (err) {                        
                        reject(err);
                        this.errors.push(err)
                        return;
                    } else {
                        //console.log(result) 
                        this.listaRegistros.push(result); 
                        resolve()                                                
                    }    
                });                
              })             
        })        
    }  
}  

module.exports = Query;
