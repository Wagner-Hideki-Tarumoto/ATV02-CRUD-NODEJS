import express from "express";
const app = express();

// IMPORTANDO O SEQUELIZE CONEXÃO
import connection from "./config/sequelize-config.js";

// IMPORTANDO OS MODELS
import Cliente from "./models/Cliente.js";
import Produto from "./models/Produto.js";
import Pedido from "./models/Pedido.js";

// IMPORTANDO AS ASSOCIAÇÕES
import associations from "./config/associations.js";

// IMPORTANDO OS CONTROLLERS
import ClienteController from "./controllers/ClienteController.js";
import ProdutoController from "./controllers/ProdutoController.js";
import PedidoController from "./controllers/PedidoController.js";

// CONFIGURAÇÕES DO EXPRESS E EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONFIGURANDO AS ROTAS / CONTROLLERS
app.use("/", ClienteController);
app.use("/", ProdutoController);
app.use("/", PedidoController);

// INVOCANDO AS ASSOCIAÇÕES DO BANCO (Apenas uma vez)
associations();

// RESETANDO O BANCO DE FORMA EXPULSIVA PARA CORRIGIR AS CHAVES E TABELAS INTERMEDIÁRIAS
// COMENTE O SYNC ANTIGO PARA PARAR DE APAGAR:
// connection.sync({ alter: true }) 

// DEIXE APENAS ISSO PARA MANTER OS DADOS SALVOS:
connection.sync()
    .then(() => {
        console.log("CONEXÃO ESTÁVEL: OS DADOS NÃO SERÃO MAIS APAGADOS!");
    })
    .catch(error => {
        console.log("Erro ao sincronizar o Banco de Dados: " + error);
    });

// ROTA PRINCIPAL (HOME)
app.get("/", (req, res) => {
    res.render("index");
});

// INICIANDO O SERVIDOR
const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor: " + error);
    } else {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    }
});