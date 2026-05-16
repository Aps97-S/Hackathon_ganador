// models/priceHistory.js

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class PriceHistory extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

PriceHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price_usd: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price_eur: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  market_cap_usd: {
    type: DataTypes.BIGINT,
    allowNull: true,
  }
}, {
  modelName: 'priceHistory',
  timestamps: true,
  sequelize,
});

module.exports = PriceHistory;