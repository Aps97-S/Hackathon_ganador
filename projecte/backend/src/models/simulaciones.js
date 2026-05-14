// BDDD para guardar simulaciones hechas (no necesario aun)
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Simulaciones = sequelize.define('Simulaciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  importe_inicial: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  dias_seleccionados: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precio_btc_inicial: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  precio_btc_final: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  precio_resultado: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  porcentaje_ganancia: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'simulaciones'
});

module.exports = Simulaciones;