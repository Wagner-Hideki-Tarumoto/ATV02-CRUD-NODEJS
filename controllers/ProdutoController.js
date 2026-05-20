import express from "express";

const router = express.Router();

// ROTA PRODUTOS
router.get("/produtos",function(req,res){
    const produtos = [
       {nome: "Celular Motorola E22", preco: 1400, categoria: "Eletroportáteis", imagem: "celular.png"},
       {nome: "Tablet Samsung", preco: 1900, categoria: "Eletrônicos", imagem: "tablet.png"},
       {nome: "Notebook Lenovo", preco: 3500, categoria: "Computadores", imagem: "notebook.png"},
       {nome: "Fone Bluetooth", preco: 66, categoria: "Periféricos",imagem: "fone.png"},
       {nome: "Mouse Gamer", preco: 150.00, categoria: "Periféricos", imagem: "mouse.png" },
       {nome: "Teclado Mecânico", preco: 299.90, categoria: "Periféricos", imagem: "teclado.png" },
       {nome: "Monitor Gamer 24", preco: 899.00, categoria: "Eletrônicos", imagem: "monitor.png" }
    ]
    
    res.render("produtos", {
        produtos: produtos
    })

})

export default router;