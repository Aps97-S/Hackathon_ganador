const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Divisas = sequelize.define("Divisas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    //En coingecko el id = 'bitcoin' y divisas asi,por eso necesitamos esto xD 
    coingecko_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    simbolo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 10]
        }//Para evitar strings largos XD
    }

}, {
    tableName: "divisas",
    timestamps: false
});

module.exports = Divisas;