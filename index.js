// Importando o Express
//const express = require("express")
import express from "express";
//Importando o Controller de Cliente (onde estão as rotas)
//ClienteController
import ClienteController from "./controllers/ClienteController.js"
//ProdutoController
import ProdutoController from "./controllers/ProdutoController.js"
//PedidoController
import PedidoController from "./controllers/PedidoController.js"

//Importando o arquivo de copnexao com o banco
import connection from "./config/sequelize-config.js";
//Importando os models
import Cliente from "./models/Cliente.js";
import Pedido from "./models/Pedido.js";

//Importando as associações

import associations from "./config/associations.js";

//Realizando a conexao com o banco de dados
connection.authenticate().then(()=>{
    console.log("Conexao com o banco de dados realizada com sucesso!");
}).catch(erro =>{
    console.log(`Ocorreu um erro ao se conectar ao banco. ${erro}`);
});

//Criando o banco de dados (somente se anida não existir)
connection.query("CREATE DATABASE IF NOT EXISTS loja_relacional;").then(()=>{
    console.log("O Banco de dados esta criado!");
}).catch((error)=> {
    console.log(`Ocorreu um erro ao criar o banco de dados. Erro: ${error}`);
});

//Invocando a função que cria as associações
associations();

//Sincronizando os Models de Cliente e Pedido
//TRansformando as funções em promessa
Promise.all(
    [
Cliente.sync({force:false}),
Pedido.sync({force:false})
    ]
).then(() => {
    console.log("Entidades criadas e relacionadas com sucesso")

    }).catch(error => {
        console.log("Ocoerreu um erro ao sincronizar os Models" + error);
    });



// Iniciando o Express 
const app = express() 
// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('public'));
//Configurando o Express para aceitar daddos vindos de formularios
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//Ativando o uso das ROTAS
app.use("/", ClienteController);
app.use("/", ProdutoController);
app.use("/", PedidoController);

// ROTA PRINCIPAL
app.get("/",function(req,res){
    res.render("index")
})







// INICIA O SERVIDOR NA PORTA 8080
const port = 8080
app.listen(port, function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log(`Servidor iniciado com sucesso em http://localhost:${port}`)
    }
})