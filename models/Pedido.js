import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Pedido = connection.define("pedido",{
   numero: {
    type: Sequelize.INTEGER,
    allowNull: false,

   },
   valor:{
    type:Sequelize. FLOAT,
    allowNull: false,
   } ,
   //chave estrangeira
   cliente_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
   },
});
export default Pedido;

