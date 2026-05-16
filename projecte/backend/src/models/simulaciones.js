const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Simulaciones = sequelize.define('Simulaciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  divisa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  importe_inicial: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  dias_seleccionados: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precio_inicial: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  precio_final: {
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
  tableName: 'simulaciones',
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

module.exports = Simulaciones;