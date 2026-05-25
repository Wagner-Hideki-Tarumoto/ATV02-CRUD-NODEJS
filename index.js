import express from "express";
const app = express();

// IMPORTANDO O ARQUIVO DE CONEXÃO COM O BANCO
import connection from "./config/sequelize-config.js";

// IMPORTANDO OS MODELS (Crucial importar todos para o Sequelize criar as tabelas)
import Cliente from "./models/Cliente.js";
import Produto from "./models/Produto.js";
import Pedido from "./models/Pedido.js";

// IMPORTANDO AS ASSOCIAÇÕES
import associations from "./config/associations.js";

// IMPORTANDO OS CONTROLLERS (Onde estão as rotas)
import ClienteController from "./controllers/ClienteController.js";
import ProdutoController from "./controllers/ProdutoController.js";
import PedidoController from "./controllers/PedidoController.js";

// REALIZANDO A AUTENTICAÇÃO COM O BANCO DE DADOS
connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch(erro => {
        console.log(`Ocorreu um erro ao se conectar ao banco: ${erro}`);
    });

// CRIANDO O BANCO DE DADOS AUTOMATICAMENTE (Se ainda não existir)
connection.query("CREATE DATABASE IF NOT EXISTS loja_relacional;")
    .then(() => {
        console.log("O Banco de dados 'loja_relacional' está pronto!");
    })
    .catch((error) => {
        console.log(`Ocorreu um erro ao criar o banco de dados. Erro: ${error}`);
    });

// INVOCANDO A FUNÇÃO QUE CRIA AS ASSOCIAÇÕES ENTRE AS TABELAS
associations();

// SINCRONIZAÇÃO SEGURA: Mantém as tabelas prontas sem resetar ou apagar seus dados
connection.sync({ alter: false })
    .then(() => {
        console.log("CONEXÃO ESTÁVEL: Todas as tabelas (Clientes, Pedidos e Produtos) sincronizadas e preservadas!");
    })
    .catch(error => {
        console.log("Ocorreu um erro ao sincronizar as tabelas do banco: " + error);
    });

// CONFIGURAÇÕES DO EXPRESS E DEFINIÇÃO DO RENDERIZADOR EJS
app.set('view engine', 'ejs');
app.use(express.static('public')); // Define a pasta para arquivos estáticos (CSS, imagens)
app.use(express.urlencoded({ extended: false })); // Permite ler dados vindos de formulários
app.use(express.json()); // Permite ler dados em formato JSON

// ATIVANDO O USO DAS ROTAS DOS CONTROLLERS
app.use("/", ClienteController);
app.use("/", ProdutoController);
app.use("/", PedidoController);

// ROTA PRINCIPAL (PÁGINA HOME)
app.get("/", function(req, res) {
    res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
app.listen(port, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro ao iniciar o servidor!");
    } else {
        console.log(`Servidor iniciado com sucesso em http://localhost:${port}`);
    }
});