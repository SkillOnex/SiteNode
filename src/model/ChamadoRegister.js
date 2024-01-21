const mongoose = require('mongoose'); // Importa a biblioteca Mongoose, que facilita a interação com o MongoDB.

const RegisterSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    user  : {type:String , required: true}, // Define um campo 'email' do tipo String e obrigatório.
    mensagem : {type:String , required: true},  // Define um campo 'password' do tipo String e obrigatório.
    setor : {type:String , required: true}
});

const RegisterModel = mongoose.model('Chamado', RegisterSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.



class RegistrarChamado {
    constructor(body){
        this.body = body; // Atribui o corpo da requisição ao objeto da classe.
        this.erros = []; // Inicializa um array para armazenar erros de validação.
        this.user = null; // Inicializa a variável para armazenar informações do usuário.
    }

    async register(){
        this.valida(); // Chama o método para validar os campos.
        if(this.erros.length > 0 ) return; // Se houver erros de validação, interrompe o registro.

        
        this.user = await RegisterModel.create(this.body); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }



    valida(){
        if(this.body.user == '' || this.body.message == '' || this.body.setorname == '' ) this.erros.push('Todos os campos devem ser preenchidos'); // Valida o comprimento da senha.
        // Validação dos campos
        this.cleanUp(); // Chama o método para limpar e ajustar os dados.
        
    }

    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
           }
        }

        this.body = {
            user : this.body.user,
            mensagem : this.body.message, // Corrige o nome do campo 'senha' para 'password'.
            setor : this.body.setorname
        };
    }
}

module.exports = { RegistrarChamado }; // Exporta a classe 'Registrar' para ser utilizada em outros arquivos.
