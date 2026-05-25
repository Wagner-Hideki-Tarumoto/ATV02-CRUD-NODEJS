import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Cliente from "./Cliente.js"; // IMPORTANDO O MODEL DE CLIENTE
import Produto from "./Produto.js"; // IMPORTANDO O MODEL DE PRODUTO PARA CRIAR A ASSOCIACAO

const Pedido = connection.define("pedido", {
   numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
   },
   valor:{
    type: Sequelize.FLOAT,
    allowNull: false,
   },
   // CHAVE ESTRANGEIRA
   cliente_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
   },
});

// CONFIGURACAO DOS RELACIONAMENTOS (EM MAIUSCULO PARA O PADRAO)

// RELACIONAMENTO 1:N (UM CLIENTE TEM MUITOS PEDIDOS / UM PEDIDO PERTENCE A UM CLIENTE)
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// RELACIONAMENTO N:M (MUITOS PARA MUITOS ENTRE PEDIDO E PRODUTO)
Pedido.belongsToMany(Produto, { through: 'pedido_produtos' });
Produto.belongsToMany(Pedido, { through: 'pedido_produtos' });

export default Pedido;