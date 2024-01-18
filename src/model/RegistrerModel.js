const mongoose = require('mongoose'); // Importa a biblioteca Mongoose, que facilita a interação com o MongoDB.
const validator = require('validator') // Importa a biblioteca Validator, que será usada para validar dados.
const bcryptjs = require('bcryptjs'); // Importa a biblioteca Bcrypt.js, que será usada para realizar hash nas senhas.

const RegisterSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    email  : {type:String , required: true}, // Define um campo 'email' do tipo String e obrigatório.
    password : {type:String , required: true}  // Define um campo 'password' do tipo String e obrigatório.
});

const RegisterModel = mongoose.model('Register', RegisterSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.



class Registrar {
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

        const salt = bcryptjs.genSaltSync(); // Gera um "salt" para ser usado no processo de hash da senha.
        this.body.password = bcryptjs.hashSync(this.body.password, salt); // Realiza o hash da senha usando o "salt" gerado.

        
        this.user = await RegisterModel.create(this.body); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }

    async userExists(){
        const user = await RegisterModel.findOne({email: this.body.email}); // Procura por um usuário com o mesmo email no banco de dados.
        if(user) this.erros.push('Usuario já existe.'); // Se o usuário já existir, adiciona um erro ao array de erros.
    }

    valida(){
        // Validação dos campos
        this.cleanUp(); // Chama o método para limpar e ajustar os dados.

        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido'); // Valida o formato do email.

        if(this.body.password.length < 3 || this.body.password.length > 50) this.erros.push('A senha precisa ter entre 3 e 50 caracteres.'); // Valida o comprimento da senha.
    }

    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
           }
        }

        this.body = {
            email : this.body.email,
            password : this.body.senha // Corrige o nome do campo 'senha' para 'password'.
        };
    }
}

module.exports = Registrar; // Exporta a classe 'Registrar' para ser utilizada em outros arquivos.
module.exports = { Registrar, RegisterModel };