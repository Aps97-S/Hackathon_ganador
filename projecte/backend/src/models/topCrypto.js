// models/topCrypto.js

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class TopCrypto extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

TopCrypto.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  current_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  price_change_percentage_24h: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  market_cap: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  total_volume: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  modelName: 'topCrypto',
  timestamps: true,
  sequelize,
});

module.exports = TopCrypto;