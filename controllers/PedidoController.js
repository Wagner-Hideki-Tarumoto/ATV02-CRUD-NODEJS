//Importanto o Express com ES6 Modules (nova)
import express from "express"
//Metodo do Express usado para cirar as rotas da aplicacao
const router = express.Router()
//Importando o model pedido
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";
// ROTA PEDIDOS
router.get("/pedidos",function(req,res){
   //FAZENDO iNNER JOIN para trazer as informações ddo cliente junto com aas informações do pedido
   //realizando ambas consultas em paralelo
   Promise.all([
    Pedido.findAll({
    include: [
        {
            model: Cliente, //Inclui o modelo Cliente relacionadlo
            required: true, //Garante que somente pedido com clientes relacionados sejam retornados
        },
    ],
   }),


   //Busca todos os clientes
   Cliente.findAll(),
])
   .then(([pedidos, clientes]) => {
    res.render("pedidos", {
    //Passando a lista de pedido e clientes para a pagina
        pedidos : pedidos,
        clientes: clientes,
    })
    })
   
   .catch(error =>{
    console.log(`Ocorreu um erro ao listar os pedidos. ${error}`)
   });
   
    });
//ROTA DE CADASTRO DE PEDIDOS
router.post("/pedidos/cadastrar",(req, res) =>{
    //captura de dados do formulario
    const numero = req.body.numero;
    const valor = req.body.valor;
    const clienteId = req.body.clienteId;

    //cadastrando no banco
    Pedido.create({
        numero: numero,
        valor: valor,
        //clienteId
        cliente_id: clienteId,

    }).then(() =>{
        res.redirect("/pedidos");
    }).catch(error => {
console.log(error);
    });
})

//rota de exclusao de pedidos
router.get("/pedidos/excluir/:id", (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where:{
            id: id,
        },
    }).then(() =>{
        res.redirect("/pedidos");
    }).catch(error =>{
        console.log(error);
    });
});

export default router;
