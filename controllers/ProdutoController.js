import express from "express";
const router = express.Router();

// IMPORTANDO O MODEL DE PRODUTO PARA SALVAR NO BANCO
import Produto from "../models/Produto.js";

// 1. ROTA DE LISTAGEM DE PRODUTOS (GET)
router.get("/produtos", function(req, res) {
    
    // SUA LISTA DE DADOS COMPLETA COM AS IMAGENS PRESERVADAS
    const produtosPreCadastrados = [
       {nome: "Celular Motorola E22", preco: 1400, categoria: "Eletroportáteis", imagem: "celular.png"},
       {nome: "Tablet Samsung", preco: 1900, categoria: "Eletrônicos", imagem: "tablet.png"},
       {nome: "Notebook Lenovo", preco: 3500, categoria: "Computadores", imagem: "notebook.png"},
       {nome: "Fone Bluetooth", preco: 66, categoria: "Periféricos", imagem: "fone.png"},
       {nome: "Mouse Gamer", preco: 150.00, categoria: "Periféricos", imagem: "mouse.png" },
       {nome: "Teclado Mecânico", preco: 299.90, categoria: "Periféricos", imagem: "teclado.png" }, 
       {nome: "Monitor Gamer 24", preco: 899.00, categoria: "Eletrônicos", imagem: "monitor.png" }
    ];

    // VERIFICA SE JÁ EXISTEM PRODUTOS NO BANCO PARA NÃO DUPLICAR
    Produto.count().then(count => {
        if (count === 0) {
            // SE O BANCO ESTIVER VAZIO, INJETA TODA A SUA LISTA DE UMA VEZ SÓ
            return Produto.bulkCreate(produtosPreCadastrados);
        }
    })
    .then(() => {
        // BUSCA OS PRODUTOS DIRETAMENTE DO BANCO DE DADOS AGORA COM IDS REAIS
        return Produto.findAll();
    })
    .then(produtosDoBanco => {
        // RENDERIZA A VIEW PASSANDO OS PRODUTOS QUE VINHAM DO BANCO
        res.render("produtos", {
            produtos: produtosDoBanco
        });
    })
    .catch(error => {
        console.log(`OCORREU UM ERRO AO PROCESSAR OS PRODUTOS: ${error}`);
        res.redirect("/");
    });
});

// 2. ROTA DE CADASTRO DE NOVO PRODUTO (POST) - ADICIONADA AQUI
router.post("/produtos/new", (req, res) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const categoria = req.body.categoria;
    
    // CASO O USUÁRIO NÃO ENVIE IMAGEM, COLOCAMOS UMA PADRÃO PARA NÃO QUEBRAR O CARD
    const imagem = req.body.imagem;

    // INSERE O PRODUTO NO BANCO DE DADOS MYSQL
    Produto.create({
        nome: nome,
        preco: preco,
        categoria: categoria,
        imagem: imagem
    })
    .then(() => {
        res.redirect("/produtos"); // ATUALIZA A PÁGINA COM O NOVO PRODUTO NA LISTA
    })
    .catch(error => {
        console.log(`ERRO AO CADASTRAR PRODUTO NO BANCO: ${error}`);
        res.redirect("/produtos");
    });
});

export default router;