import express from "express";
const router = express.Router();

import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
import Produto from "../models/Produto.js";

/* ROTA PRINCIPAL: LISTAR PEDIDOS, CLIENTES E PRODUTOS */
router.get("/pedidos", function(req, res){
    Promise.all([
        Pedido.findAll({
            include: [
                { 
                    model: Cliente
                },
                { 
                    model: Produto 
                }
            ],
        }),
        Cliente.findAll(),
        Produto.findAll()
    ])
    .then(([pedidos, clientes, produtos]) => { 
        res.render("pedidos", {
            pedidos : pedidos,
            clientes: clientes,
            produtos: produtos
        });
    })
    .catch(error => {
        console.log(`ERRO AO LISTAR PEDIDOS: ${error}`);
        res.redirect("/");
    });
});

/* ROTA PARA CADASTRAR PEDIDO E VINCULAR PRODUTOS */
router.post("/pedidos/cadastrar", (req, res) => {
    const numero = req.body.numero;
    const valor = req.body.valor;
    const clienteId = req.body.clienteId;
    let produtosSelecionados = req.body.produtos;

    // Se o usuário escolher apenas 1 produto, o Node envia como texto simples. 
    // Esse bloco garante que vire sempre um Array para o Sequelize não quebrar.
    if (produtosSelecionados && !Array.isArray(produtosSelecionados)) {
        produtosSelecionados = [produtosSelecionados];
    }

    Pedido.create({
        numero: numero,
        valor: valor,
        clienteId: clienteId, // Alterado de cliente_id para clienteId (Padrão do Sequelize)
    }).then(pedidoCriado => {
        if (produtosSelecionados && produtosSelecionados.length > 0) {
            // Vincula os IDs dos produtos na tabela intermediária
            return pedidoCriado.setProdutos(produtosSelecionados);
        }
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(`ERRO AO CADASTRAR PEDIDO: ${error}`);
        res.redirect("/pedidos");
    });
});

/* ROTA PARA EXCLUIR PEDIDO */
router.get("/pedidos/excluir/:id", (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where: { id: id },
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(error);
        res.redirect("/pedidos");
    });
});

export default router;