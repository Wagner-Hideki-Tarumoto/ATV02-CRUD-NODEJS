// ESTE ARQUIVO IRÁ CRIAR AS ASSOCIAÇÕES ENTRE AS TABELAS
// IMPORTANDO OS MODELS
import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";
import Produto from "../models/Produto.js";

// DEFININDO AS ASSOCIAÇÕES ENTRE OS MODELS
const associations = () => {
    // UM CLIENTE POSSUI MUITOS PEDIDOS (Ajustado para clienteId)
    Cliente.hasMany(Pedido, { foreignKey: "clienteId" });
    // UM PEDIDO POSSUI UM CLIENTE (Ajustado para clienteId)
    Pedido.belongsTo(Cliente, { foreignKey: "clienteId" });

    // UM PEDIDO POSSUI MUITOS PRODUTOS E UM PRODUTO PODE ESTAR EM MUITOS PEDIDOS
    // Adicionadas as foreign keys explicitas para o Sequelize saber mapear os IDs no cadastro
    Pedido.belongsToMany(Produto, { through: "pedido_produtos", foreignKey: "pedidoId" });
    Produto.belongsToMany(Pedido, { through: "pedido_produtos", foreignKey: "produtoId" });
};

export default associations;