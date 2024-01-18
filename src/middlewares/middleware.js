const crypto = require('crypto');



exports.middlewareGlobal = (req, res, next) => {
    // Variável global para armazenar o nonce
    const nonce = crypto.randomBytes(16).toString('base64');
    res.locals.erros = req.flash('erros'); // Adiciona a variável 'erros' da flash message aos locais (locals) da resposta.
    res.locals.success = req.flash('success'); // Adiciona a variável 'success' da flash message aos locais (locals) da resposta.
    res.locals.user = req.session.user;
    res.locals.nonce = nonce;
    
    next(); // Chama a próxima função middleware na pilha.
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404'); // Renderiza a view "404" em caso de erro CSRF (Cross-Site Request Forgery).
    }
    next(); // Chama a próxima função middleware na pilha.
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Adiciona o token CSRF aos locais (locals) da resposta.
    next(); // Chama a próxima função middleware na pilha.
};

