const obterConteudo = (pagina) => {
  // Lógica para obter o conteúdo com base na página
  return `Conteúdo dinâmico para a página ${pagina}`;
};

exports.index = (req, res, next) => {
  const pagina = req.params.pagina;

  if (pagina == "dashboard") {
    
    res.render("dashboard", { content: obterConteudo(pagina), ola: "sim" });
    next();
  } else if (pagina == "novochamado") {
    res.render("novochamado", { content: obterConteudo(pagina) });
    next();
  }

 
};
