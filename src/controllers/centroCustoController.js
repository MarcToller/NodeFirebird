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
    
    const query = new Query('SELECT FIRST 10 * FROM "G-CENTRO_CUSTO" WHERE EMPRESA_ID = ? ORDER BY CODIGO_EXTERNO', [req.session.empresaCorrente]);             
    lista = await query.executaSql(); 
    
    if (query.errors.length > 0) {        
        req.flash('errors', query.errors)          
    } else {
        res.render('index', {listaCentroCusto: lista})
    }        
    
}

exports.deletar = async (req, res) => {
    //const dataInicio = new Date();
    let vParams = []
    if (!req.params.CODIGO) {
        return res.render('404')        
    } else {
        vParams = [req.params.CODIGO]
    }  
    //console.log('INÍCIO EXCLUSÃO', dataInicio.toLocaleTimeString('pt-BR', {}))         
    const queryDelecao = new Query('DELETE FROM "G-CENTRO_CUSTO" WHERE CODIGO = ?', vParams);             
    await queryDelecao.executaSql(); 

    if (queryDelecao.errors.length > 0) {        
        req.flash('errors', queryDelecao.errors)          
    } else {
        req.flash('sucess', `Centro de Custo ${req.params.DESCRICAO} excluído com sucesso`);          
    }     
    
    res.redirect('/listar')   

    //const dataFinal = new Date();
    //console.log('FINAL EXCLUSÃO', dataFinal.toLocaleTimeString('pt-BR', {}))  
}

exports.tela_cadastro = async (req, res) => {

    vParams = []
    
    if (req.params.CODIGO == 0) {        
        res.render('centroCusto', {centroCusto: {CODIGO: 0, EMPRESA_ID: 1263}})    
    } else {
        vParams.push(req.params.CODIGO) 
        const queryConsulta = new Query('SELECT * FROM "G-CENTRO_CUSTO" WHERE CODIGO = ?', vParams);
        resultado = await queryConsulta.executaSql()      
        
        if (queryConsulta.errors.length > 0) {        
            req.flash('errors', queryConsulta.errors)          
        } else {
            res.render('centroCusto', {centroCusto: resultado[0]})            
        }            
        
    } 
}


exports.editar = async(req, res) => {
    vParams = []
    
    vParams.push(req.body.DESCRICAO)   
    vParams.push(req.body.CODIGO_EXTERNO)    
    vParams.push(req.body.CODIGO)   

    console.log(vParams);

    vSql = 'UPDATE "G-CENTRO_CUSTO" SET DESCRICAO = ?, CODIGO_EXTERNO = ? WHERE CODIGO = ?'

    const queryUpdate = new Query(vSql, vParams);
    await queryUpdate.executaSql()       

    if (queryUpdate.errors.length > 0) {        
        req.flash('errors', queryUpdate.errors)          
    } else {
        req.flash('sucess', 'Centro de Custo alterado com sucesso')
    }     
    
    res.redirect('/listar')   
} 

exports.inserir = async (req, res) => {
    //console.log('passou no cadastrar')    

    let vParams = []

    //req.body.EMPRESA_ID = 1263;    

    vParams.push(req.body.DESCRICAO)   
    vParams.push(req.body.CODIGO_EXTERNO)
    //vParams.push(req.body.EMPRESA_ID)
    vParams.push(req.session.empresaCorrente)

    vSql = 'INSERT INTO "G-CENTRO_CUSTO"(CODIGO, DESCRICAO, CODIGO_EXTERNO, EMPRESA_ID) VALUES (GEN_ID(GEN_INTERNO_CADASTROS, 1), ?, ?, ?)';

    const queryInsercao = new Query(vSql, vParams);
    await queryInsercao.executaSql()      
    
    if (queryInsercao.errors.length > 0) {        
        req.flash('errors', queryInsercao.errors)          
    } else {
        req.flash('sucess', `Centro de Custo ${req.body.DESCRICAO} cadastrado com sucesso`)
    }     
    
    res.redirect('/listar')                    
}