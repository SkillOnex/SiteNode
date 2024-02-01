const mongoose = require('mongoose'); // Importa a biblioteca Mongoose, que facilita a interação com o MongoDB.

const RegisterSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    cadastro_setor : {type:String , required: true}
});

const RegisterModel = mongoose.model('Setores', RegisterSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.



class RegistrarSetor {
    constructor(body){
        this.body = body; // Atribui o corpo da requisição ao objeto da classe.
        this.erros = []; // Inicializa um array para armazenar erros de validação.
        this.user = null; // Inicializa a variável para armazenar informações do usuário.
    }

    async register(){
        this.valida(); // Chama o método para validar os campos.
        if(this.erros.length > 0 ) return; // Se houver erros de validação, interrompe o registro.

        await this.userExists(); // Verifica se o usuário já existe no banco de dados.

        if(this.erros.length > 0 ) return; // Se o usuário já existe, interrompe o registro.
        
        this.user = await RegisterModel.create(this.body); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }

    async userExists(){
        const user = await RegisterModel.findOne({setor: this.body.cadastro_setor}); // Procura por um usuário com o mesmo email no banco de dados.
        if(user) this.erros.push('Usuario já existe.'); // Se o usuário já existir, adiciona um erro ao array de erros.
    }

    valida(){
        // Validação dos campos
        this.cleanUp(); // Chama o método para limpar e ajustar os dados.


        if(this.body.cadastro_setor.length < 2 ) this.erros.push('A senha precisa ter entre 3 e 50 caracteres.'); // Valida o comprimento da senha.
    }

    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
           }
        }

        this.body = {
            cadastro_setor : this.body.setor
        };
    }
}

module.exports = { RegistrarSetor };