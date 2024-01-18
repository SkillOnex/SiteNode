const obterConteudo = (pagina) => {
    // Lógica para obter o conteúdo com base na página
    return `Conteúdo dinâmico para a página ${pagina}`;
  };
  
  exports.index = (req, res, next) => {
    const pagina = req.params.pagina;
  
    res.render("conteudo1", { content: obterConteudo(pagina) });
  
    
    next();
  };