const mongoose = require('mongoose'); // Importa a biblioteca Mongoose, que facilita a interação com o MongoDB.

const RegisterSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    Nome  : {type:String , required: true}, // Define um campo 'email' do tipo String e obrigatório.
    Setores : {type:[String] , required: true}  // Define um campo 'password' do tipo String e obrigatório.
    
});

const RegisterModel = mongoose.model('Grupos', RegisterSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.

class Registrar {
    constructor(body){
        this.body = body; // Atribui o corpo da requisição ao objeto da classe.
        this.erros = []; // Inicializa um array para armazenar erros de validação.
        this.user = null; // Inicializa a variável para armazenar informações do usuário.
    }

    async register(){
        this.cleanUp(); // Chama o método para validar os campos.
        if(this.erros.length > 0 ) return; // Se houver erros de validação, interrompe o registro.

        await this.userExists(); // Verifica se o usuário já existe no banco de dados.

        if(this.erros.length > 0 ) return; // Se o usuário já existe, interrompe o registro.
        
        this.user = await RegisterModel.create(this.body); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }

    async userExists() {
        const user = await RegisterModel.findOne({ Nome: this.body.Nome, Setores: { $all: this.body.Setores } });
      
        if (user) this.erros.push('Grupo já existe.');
      }


    cleanUp(){   
        this.body = {
            Nome : this.body.nome,
            Setores : this.body.setores // Corrige o nome do campo 'senha' para 'password'.
           
        };
    }
}

module.exports = { Registrar, RegisterModel };