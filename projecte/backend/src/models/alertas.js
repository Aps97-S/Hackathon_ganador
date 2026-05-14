//alertas
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Alertas = sequelize.define('Alertas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  precio_objetivo: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  condicion: {
    type: DataTypes.ENUM('sobre', 'debajo'),
    allowNull: false
  },

  ultima_alerta: {
    type: DataTypes.DATE,
    allowNull: true
  },

  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'alertas'
});

module.exports = Alertas;