function auth(req, res, next) {
    if(req.session?.user?.email === 'adminCoder@coder.com,' || req.session?.user?.password !== 'admin'){
        return res.status(401).send('Error de autenticación')
    }
    next()
}

module.exports = {
    auth
}
