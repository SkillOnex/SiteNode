function carregarConteudo(pagina) {
    fetch(`/conteudo/${pagina}`)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("conteudo").innerHTML = html;
        });
}

document.getElementById("dashboardLink").addEventListener("click", function () {
    carregarConteudo("dashboard");
});

document.getElementById("novochamadoLink").addEventListener("click", function () {
    carregarConteudo("novochamado");
});

