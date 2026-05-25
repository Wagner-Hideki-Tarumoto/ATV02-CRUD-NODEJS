// IMPORTANDO O EXPRESS COM ES6 MODULES (NOVA)
import express from "express"
// METODO DO EXPRESS USADO PARA CRIAR AS ROTAS DA APLICACAO
const router = express.Router()

// IMPORTANDO OS MODELS
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
import Produto from "../models/Produto.js"; // IMPORTANTE: IMPORTAR O MODEL DE PRODUTO AQUI

// ROTA PEDIDOS
router.get("/pedidos", function(req, res){
    // REALIZANDO AS CONSULTAS EM PARALELO (ADICIONADO O PRODUTO.FINDALL)
    Promise.all([
        Pedido.findAll({
            include: [
                {
                    model: Cliente, // INCLUI O MODEL CLIENTE RELACIONADO
                    required: true, // GARANTE QUE SOMENTE PEDIDOS COM CLIENTES RELACIONADOS SEJAM RETORNADOS
                },
                {
                    model: Produto, // INCLUI OS PRODUTOS QUE PERTENCEM A ESTE PEDIDO
                }
            ],
        }),
        Cliente.findAll(), // BUSCA TODOS OS CLIENTES PARA O FORMULARIO
        Produto.findAll()  // BUSCA TODOS OS PRODUTOS PARA LISTAR NO FORMULARIO
    ])
    // RECEBE A VARIAVEL 'PRODUTOS' VINDA DO PROMISE.ALL
    .then(([pedidos, clientes, produtos]) => { 
        res.render("pedidos", {
            // PASSANDO A LISTA DE PEDIDOS, CLIENTES E PRODUTOS PARA A PAGINA
            pedidos : pedidos,
            clientes: clientes,
            produtos: produtos // ENVIANDO A LISTA DE PRODUTOS PARA A VIEW
        })
    })
    .catch(error => {
        console.log(`Ocorreu um erro ao listar os pedidos. ${error}`)
    });
});

// ROTA DE CADASTRO DE PEDIDOS
router.post("/pedidos/cadastrar", (req, res) => {
    // CAPTURA DE DADOS DO FORMULARIO
    const numero = req.body.numero;
    const valor = req.body.valor;
    const clienteId = req.body.clienteId;
    const produtosSelecionados = req.body.produtos; // PEGA O ARRAY DE IDS DOS PRODUTOS VINDOS DO FORMULARIO

    // CADASTRANDO NO BANCO
    Pedido.create({
        numero: numero,
        valor: valor,
        cliente_id: clienteId,
    }).then(pedidoCriado => { // CAPTURA O OBJETO DO PEDIDO QUE ACABOU DE SER GERADO NO BANCO
        
        // SE HOUVER PRODUTOS SELECIONADOS, FAZ O VINCULO NA TABELA INTERMEDIARIA 'PEDIDO_PRODUTOS'
        if (produtosSelecionados) {
            return pedidoCriado.setProdutos(produtosSelecionados);
        }
        
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(error);
        res.redirect("/pedidos");
    });
});

// ROTA DE EXCLUSAO DE PEDIDOS
router.get("/pedidos/excluir/:id", (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where:{
            id: id,
        },
    }).then(() => {
        res.redirect("/pedidos");
    }).catch(error => {
        console.log(error);
    });
});

// ROTA DE CONCRETIZAÇÃO DE ALTERAÇÃO DE PEDIDOS NO BANCO (PADRÃO DA AULA 08.5)
router.post("/pedidos/update/:id", (req, res) => {
    // CAPTURA DOS DADOS VINDOS DO FORMULÁRIO DE EDIÇÃO (REQ.BODY)
    const id = req.body.id;
    const numero = req.body.numero;
    const valor = req.body.valor;
    const clienteId = req.body.clienteId;
    const produtosSelecionados = req.body.produtos; // PEGA OS IDS DO SELECT MULTIPLE

    // ATUALIZANDO OS DADOS BÁSICOS DO PEDIDO COORDENADO POR ID
    Pedido.update(
        {
            numero: numero,
            valor: valor,
            cliente_id: clienteId
        },
        {
            where: { id: id } // FILTRA EXATAMENTE PELO ID QUE VEIO DO FORMULÁRIO
        }
    )
    .then(() => {
        // BUSCA O PEDIDO DIRETAMENTE PELO MODELO INCLUINDO OS PRODUTOS PARA GARANTIR OS MÉTODOS DE ASSOCIAÇÃO
        return Pedido.findOne({
            where: { id: id },
            include: [Produto]
        });
    })
    .then(pedidoExistente => {
        // SE O PEDIDO FOI ENCONTRADO E EXISTEM PRODUTOS, ATUALIZA A TABELA INTERMEDIÁRIA
        if (pedidoExistente && produtosSelecionados) {
            // O METODO SETPRODUTOS AGORA VAI FUNCIONAR POIS O INCLUDE COLOCOU O PRODUTO NO ESCOPO
            return pedidoExistente.setProdutos(produtosSelecionados);
        }
    })
    .then(() => {
        // REDIRECIONA PARA A LISTAGEM GERAL DE PEDIDOS COM SUCESSO
        res.redirect("/pedidos");
    })
    .catch(error => {
        console.log(`OCORREU UM ERRO AL ALTERAR O PEDIDO NO BANCO: ${error}`);
        res.redirect("/pedidos");
    });
});
export default router;