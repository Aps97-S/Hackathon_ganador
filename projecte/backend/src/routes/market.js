// routes/market.js

const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const cacheMiddleware = require('../middleware/cache');

// Routes for cryptocurrency data
router.get('/market/price/:symbol', cacheMiddleware, marketController.getPrice);
router.get('/market/prices/:symbols', cacheMiddleware, marketController.getMultiplePrices);
router.get('/market/price-change/:symbol', cacheMiddleware, marketController.getPriceChange);
router.get('/market/history/:symbol', cacheMiddleware, marketController.getHistory);
router.get('/market/history/:symbol/interval', cacheMiddleware, marketController.getHistoryWithInterval);
router.get('/market/top', cacheMiddleware, marketController.getTopCryptos);
router.get('/market/details/:symbol', cacheMiddleware, marketController.getCoinDetails);
router.get('/market/data/:symbols', cacheMiddleware, marketController.getMarketData);

module.exports = router;