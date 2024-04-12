

exports.definirEmpresaCorrente = async (req, res) => {

    req.session.empresaCorrente = req.params.CODIGO
    req.session.descricaoEmpresaCorrente = req.params.NOME
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy', req.session.empresaCorrente)

    res.redirect('/listar')
}