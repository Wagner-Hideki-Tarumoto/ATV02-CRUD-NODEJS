//Este arquivo irá criar as assciações nentrea s tabelas
//Importanto os models
import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";

//Definindo as associações entre os models
const associations = () => {
    //Um cliente possui muitos pedidos
    Cliente.hasMany(Pedido, {foreignKey: "cliente_id"});
    //Um pediod possui um cliente
    Pedido.belongsTo(Cliente, {foreignKey: "cliente_id"});
};

export default associations;
