import { DataTypes } from "sequelize"; // <-- MUDANÇA ESSENCIAL PARA EVITAR ERROS DE PROPRIEDADE
import connection from "../config/sequelize-config.js";

const Produto = connection.define("produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Produto;