//Importando a ORM Sequelize
import Sequelize from "sequelize";

//Definindo os dados de conexao com o banco de dados
const connection = new Sequelize({
//Tipo do banco
dialect: 'mysql',
//Endereco do banco
host: 'localhost',
//Nome do Usuario do banco
username: 'root',
//Senha
password:"",
//Fuzo horario
timezone:"-03:00",
//Nome do banco que será usado na aplicação

database: 'loja_relacional'
});
//Exportando o módulo
export default connection;