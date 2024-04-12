

exports.definirEmpresaCorrente = async (req, res) => {

    req.session.empresaCorrente = req.params.CODIGO
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy', req.session.empresaCorrente)

    res.redirect('/listar')
}