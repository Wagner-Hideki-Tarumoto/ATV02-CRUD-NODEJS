import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Cliente from "./Cliente.js";
import Produto from "./Produto.js";

const Pedido = connection.define("pedido", {
   numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
   },
   valor:{
    type: Sequelize.FLOAT,
    allowNull: false,
   },
   cliente_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
   },
});

/* CONFIGURACAO DOS RELACIONAMENTOS */

/* RELACIONAMENTO 1:N (UM CLIENTE TEM MUITOS PEDIDOS / UM PEDIDO PERTENCE A UM CLIENTE) */
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });

/* RELACIONAMENTO N:M (MUITOS PARA MUITOS ENTRE PEDIDO E PRODUTO VIA TABELA INTERMEDIARIA) */
Pedido.belongsToMany(Produto, { through: 'pedido_produtos' });
Produto.belongsToMany(Pedido, { through: 'pedido_produtos' });

export default Pedido;