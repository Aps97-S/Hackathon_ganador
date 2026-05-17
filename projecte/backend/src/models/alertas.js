//alertas
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Alertas = sequelize.define('Alertas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  divisa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  precio_maximo: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  precio_minimo: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM("active", "triggered", "disabled"),
    defaultValue: "active"
  },

  activada_en: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'alertas',
  validate: {
    minOrMaxRequired() {
      if (
        this.precio_minimo == null &&
        this.precio_maximo == null
      ) {
        throw new Error(
          "Hi ha d'haver un preu mínim o màxim"
        );
      }
    }
  }
});

module.exports = Alertas;