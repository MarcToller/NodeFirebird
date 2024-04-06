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
        //this.errors = [];
        this.sucess = [];
        this.listaRegistros = [];
    }

    executaSql(){ 
        let vsql = this.sql;
        let vparametros = this.parametros; 
        let vErrors = []      
        return new Promise((resolve, reject) => {
            firebird.attach(Conexao, function(err, db) {
                if (err) {                    
                    reject(err)
                    //this.errors.push(err)
                    return;
                }         
                
                    // db é a conexo
                
                db.query(vsql, vparametros, function(err, result) {                
                    db.detach(); // desconecta o banco
                    
                    if (err) {                        
                        reject(err);                        
                    } else {
                        //console.log(result) 
                        //this.listaRegistros.push(result); 
                        resolve(result)                                                
                    }    
                });                
              })             
        })                
    }
}  

module.exports = Query;


// EXECUTE BLOCK
// as
//   DECLARE VARIABLE V_IND INTEGER;
// BEGIN
//   V_IND = 0;

//   WHILE (:V_IND < 500000) DO
//   BEGIN
//     INSERT INTO "G-CENTRO_CUSTO"
//       (CODIGO, CODIGO_EXTERNO, DESCRICAO, EMPRESA_ID)
//     VALUES
//       (GEN_ID(GEN_INTERNO_CADASTROS, 1), :V_IND, 'CENTRO DE CUSTO '||:V_IND, 1263);

//     V_IND = :V_IND + 1;
//   END
// END
