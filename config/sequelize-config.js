//IMPORTANDO A ORM SEQUELIZE
import Sequelize from "sequelize";

//DEFININDO OS DADOS DE CONEXAO COM O BANCO DE DADOS
const connection = new Sequelize({
//TIPO DO BANCO
dialect: 'mysql',
//ENDERECO DO BANCO
host: 'localhost',
//NOME DO USUARIO DO BANCO
username: 'root',
//SENHA
password:"",
//FUZO HORARIO
timezone:"-03:00",
//NOME DO BANCO QUE SERÁ USADO NA APLICAÇÃO
database: 'loja_relacional'
});
//EXPORTANDO O MÓDULO
export default connection;