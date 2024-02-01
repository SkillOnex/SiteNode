document.addEventListener("DOMContentLoaded", function () {
  $(".btn-editar").on("click", function () {
    
    // Recupere dados personalizados do botão
    const nome = $(this).data("nome");
    const setores = $(this).data("setor").split(", ");
    const id = $(this).data("id");

    // Preencha os campos do modal com os valores correspondentes
    $("#namemodel").val(nome);
    $("#idmodel").val(id);

   

    $("#modaleditgroup").modal("show");
  });   


});
