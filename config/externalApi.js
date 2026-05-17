/**
 * External API Configuration
 * Contains base URLs and configuration for external services
 */

// CoinGecko API configuration
const COIN_GECKO_CONFIG = {
  baseURL: 'https://api.coingecko.com/api/v3',
  apiKey: process.env.COINGECKO_API_KEY || '', // Optional for free tier
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second delay between retries
};

module.exports = {
  COIN_GECKO_CONFIG
};