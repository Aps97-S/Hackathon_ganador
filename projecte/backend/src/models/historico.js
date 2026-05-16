const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Historico = sequelize.define("Historico", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  precio_usd: {
    type: DataTypes.FLOAT,
    allowNull: false
  },//usd= dolares americanos

  market_cap: {
    type: DataTypes.FLOAT,
    allowNull: true
  },//capitalizacion del mercado
  //market_cap = precio_actual × cantidad_total_en_circulación

  volume: {
    type: DataTypes.FLOAT,
    allowNull: true
  },//volumen del trading

  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }//Momento exacto en el que se guardo,por eso anulamos el timestamp por defecto

}, {
  tableName: "historico",
  timestamps: false
});

module.exports = Historico;