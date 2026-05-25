// IMPORTANDO O EXPRESS COM ES6 MODULES (PADRÃO NOVO SOLICITADO PELO PROFESSOR)
import express from "express";
const router = express.Router();

// IMPORTANDO O MODEL DE CLIENTE
import Cliente from "../models/Cliente.js";

// 1. ROTA PRINCIPAL DE CLIENTES (EXIBE O FORMULÁRIO E A LISTA)
router.get("/clientes", function (req, res) {
  // O MÉTODO .FINDALL() BUSCA TODOS OS REGISTROS. USAREMOS { RAW: TRUE } PARA QUE O EJS LEIA OS DADOS LIMPOS SEM TRAVAR.
  Cliente.findAll({ raw: true })
    .then((clientes) => {
      res.render("clientes", {
        clientes: clientes, // PASSA A LISTA RECEBIDA DO BANCO PARA O SEU CLIENTES.EJS
      });
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao buscar os clientes: " + error);
      res.status(500).send("Erro interno ao carregar a lista de clientes.");
    });
});

// 2. ROTA DE CADASTRO DE CLIENTE (SUBROTA ACIONADA PELO BOTÃO CADASTRAR)
router.post("/clientes/cadastrar", (req, res) => {
  // CAPTURANDO OS DADOS ENVIADOS PELOS INPUTS DO FORMULÁRIO
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;

  // O MÉTODO CREATE() INSERE AS INFORMAÇÕES NO BANCO DE DADOS MYSQL
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/clientes"); // REDIRECIONA O USUÁRIO DE VOLTA PARA A LISTAGEM ATUALIZADA
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao cadastrar o cliente: " + error);
      res.status(500).send("Erro ao cadastrar o cliente.");
    });
});

// 3. ROTA DE EXCLUSÃO DE CLIENTE (SUBROTA ACIONADA PELO LINK EXCLUIR)
router.get("/clientes/delete/:id", (req, res) => {
  // CAPTURANDO O PARÂMETRO DA ROTA RECEBIDO PELA URL
  const id = req.params.id;

  // O MÉTODO DESTROY() REMOVE A LINHA CORRESPONDENTE DO BANCO DE DADOS
  Cliente.destroy({
    where: {
      id: id, // BANCO // PARÂMETRO RECEBIDO
    },
  })
    .then(() => {
      res.redirect("/clientes"); // RECARREGA A PÁGINA DE LISTAGEM
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao excluir o cliente: " + error);
      res.status(500).send("Ocorreu um erro ao excluir o cliente.");
    });
});

// 4. ROTA DE EDIÇÃO DE CLIENTE (ABRE A TELA CLIENTEEDIT.EJS COM OS DADOS PREENCHIDOS)
router.get("/clientes/editar/:id", (req, res) => {
  // CAPTURANDO O PARÂMETRO DA ROTA
  const id = req.params.id;

  // BUSCA O CLIENTE ESPECÍFICO PELA CHAVE PRIMÁRIA (ID)
  Cliente.findByPk(id, { raw: true })
    .then((cliente) => {
      if (cliente) {
        // RENDERIZA A VIEW 'CLIENTEEDIT' PASSANDO OS DADOS DO CLIENTE ENCONTRADO
        res.render("clienteEditar", {
          cliente: cliente, // PASSANDO OS DADOS DO CLIENTE PARA A PÁGINA
        });
      } else {
        res.redirect("/clientes");
      }
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao carregar a edição: " + error);
      res.redirect("/clientes");
    });
});

// 5. ROTA DE ALTERAÇÃO DE CLIENTE (PROCESSA E SALVA OS NOVOS DADOS DO FORMULÁRIO DE EDIÇÃO)
router.post("/clientes/alterar", (req, res) => {
  // COLETANDO O ID OCULTO E OS NOVOS DADOS DO FORMULÁRIO
  const id = req.body.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;

  // ATUALIZA OS REGISTROS CORRESPONDENTES NO BANCO DE DADOS
  Cliente.update(
    {
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    {
      where: { id: id }, // USA O ID CAPTURADO DO INPUT HIDDEN PARA ALTERAR APENAS O CLIENTE CORRETO
    }
  )
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log("Ocorreu um erro ao alterar o cliente: " + error);
      res.redirect("/clientes");
    });
});

// EXPORTANDO O MÓDULO PARA USAR EM OUTRO ARQUIVO (INDEX.JS)
export default router;