import  Sequelize  from "sequelize";
import connection from "../config/sequelize-config.js";

//Criando o Model
//O metodo define ()do Sequelize cria uma tabela no BD
const Cliente = connection.define('clientes', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
    },
    endereco: {
        
        type: Sequelize.STRING,
    },
});
//O metodo synbc()sincroniza os dados com o banco
//force: false -> não recria a tabela caso ela já exista
//Cliente.sync({force: false });
//Pedido.sync({force: false });
export default Cliente;
