// routes/market.js

const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const cacheMiddleware = require('../middleware/cache');

// Routes for cryptocurrency data
router.get('/api/market/price/:symbol', cacheMiddleware, marketController.getPrice);
router.get('/api/market/prices/:symbols', cacheMiddleware, marketController.getMultiplePrices);
router.get('/api/market/price-change/:symbol', cacheMiddleware, marketController.getPriceChange);
router.get('/api/market/history/:symbol', cacheMiddleware, marketController.getHistory);
router.get('/api/market/history/:symbol/interval', cacheMiddleware, marketController.getHistoryWithInterval);
router.get('/api/market/top', cacheMiddleware, marketController.getTopCryptos);
router.get('/api/market/details/:symbol', cacheMiddleware, marketController.getCoinDetails);
router.get('/api/market/data/:symbols', cacheMiddleware, marketController.getMarketData);

module.exports = router;