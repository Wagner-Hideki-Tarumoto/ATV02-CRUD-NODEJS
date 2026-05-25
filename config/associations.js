// ESTE ARQUIVO IRÁ CRIAR AS ASSOCIAÇÕES ENTRE AS TABELAS
// IMPORTANDO OS MODELS
import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";
import Produto from "../models/Produto.js";

// DEFININDO AS ASSOCIAÇÕES ENTRE OS MODELS
const associations = () => {
    // UM CLIENTE POSSUI MUITOS PEDIDOS
    Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });
    // UM PEDIDO POSSUI UM CLIENTE
    Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });

    // ADICIONE ESTAS DUAS LINHAS ABAIXO PARA O RELACIONAMENTO MUITOS PARA MUITOS
    // UM PEDIDO POSSUI MUITOS PRODUTOS E UM PRODUTO PODE ESTAR EM MUITOS PEDIDOS
    Pedido.belongsToMany(Produto, { through: "pedido_produtos" });
    Produto.belongsToMany(Pedido, { through: "pedido_produtos" });
};

export default associations;