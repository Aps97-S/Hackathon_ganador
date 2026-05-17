// controllers/marketController.js

const  FinancialService  = require('../services/financialApi');
const ApiResponse = require('../utils/apiResponse');

exports.getPrice = async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const response = await FinancialService.getPrice(symbol);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching price:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch price', 500, error.message));
  }
};

exports.getMultiplePrices = async (req, res) => {
  const { symbols } = req.params;
  
  try {
    const response = await FinancialService.getMultiplePrices(symbols);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch multiple prices', 500, error.message));
  }
};

exports.getPriceChange = async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const response = await FinancialService.getPriceChange(symbol);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching price change:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch price change', 500, error.message));
  }
};

exports.getHistory = async (req, res) => {
  const { symbol } = req.params;
  const { days = 30 } = req.query;
  
  try {
    const response = await FinancialService.getPriceHistory(symbol, parseInt(days));
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch history', 500, error.message));
  }
};

exports.getHistoryWithInterval = async (req, res) => {
  const { symbol } = req.params;
  const { days = 30, interval = 'daily' } = req.query;
  
  try {
    const response = await FinancialService.getPriceHistoryWithInterval(symbol, parseInt(days), interval);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching history with interval:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch history with interval', 500, error.message));
  }
};

exports.getTopCryptos = async (req, res) => {
  const { limit = 10 } = req.query;
  
  try {
    const response = await FinancialService.getTopCrypto(parseInt(limit));
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch top cryptocurrencies', 500, error.message));
  }
};

exports.getCoinDetails = async (req, res) => {
  const { symbol } = req.params;
  
  try {
    const response = await FinancialService.getCoinDetails(symbol);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching coin details:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch coin details', 500, error.message));
  }
};

exports.getMarketData = async (req, res) => {
  const { symbols } = req.params;
  
  try {
    const response = await FinancialService.getMarketData(symbols);
    res.json(ApiResponse.success(response));
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json(ApiResponse.error('Failed to fetch market data', 500, error.message));
  }
};