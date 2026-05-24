//ESTE ARQUIVO IRÁ CRIAR AS ASSOCIAÇÕES ENTRE AS TABELAS
//IMPORTANTO OS MODELS
import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";

//DEFININDO AS ASSOCIAÇÕES ENTRE OS MODELS
    const associations = () => {
    //UM CLIENTE POSSUI MUITOS PEDIDOS
    Cliente.hasMany(Pedido, {foreignKey: "cliente_id"});
    //UM PEDIDO POSSUI UM CLIENTE
    Pedido.belongsTo(Cliente, {foreignKey: "cliente_id"});
};

export default associations;
