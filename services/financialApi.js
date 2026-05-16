/**
 * Financial API Service for CoinGecko integration
 * Handles fetching cryptocurrency data using fetch with retry logic and error handling
 */

const { COIN_GECKO_CONFIG } = require('../config/externalApi');
const { normalizeError, createSuccessResponse, createErrorResponse } = require('../utils/apiResponse');

// Fetch client with retry logic and error handling
class FinancialAPIClient {
  constructor(config) {
    this.config = config;
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.retries = config.retries;
    this.retryDelay = config.retryDelay;
  }

  // Generic fetch method with retry logic
  async fetchWithRetry(url, options = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        // Add timeout to the request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on timeout or network errors
        if (error.name === 'AbortError' || attempt >= this.retries) {
          throw error;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }

    throw lastError;
  }

  // Fetch current price for a cryptocurrency
  async getCurrentPrice(id, currencies = 'usd') {
    try {
      const url = `${this.baseURL}/simple/price?ids=${id}&vs_currencies=${currencies}`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_CURRENT_PRICE_FAILED');
      return createErrorResponse(normalizedError);
    }
  }

  // Fetch historical price data for a cryptocurrency
  async getHistoricalData(id, days = 30) {
    try {
      const url = `${this.baseURL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_HISTORICAL_DATA_FAILED');
      return createErrorResponse(normalizedError);
    }
  }

  // Fetch detailed information about a cryptocurrency
  async getCoinDetails(id) {
    try {
      const url = `${this.baseURL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_COIN_DETAILS_FAILED');
      return createErrorResponse(normalizedError);
    }
  }

  // Fetch multiple cryptocurrencies' current prices
  async getMultiplePrices(ids, currencies = 'usd') {
    try {
      const idList = ids.join(',');
      const url = `${this.baseURL}/simple/price?ids=${idList}&vs_currencies=${currencies}`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_MULTIPLE_PRICES_FAILED');
      return createErrorResponse(normalizedError);
    }
  }

  // Fetch top cryptocurrencies by market cap
  async getTopCryptos(limit = 10) {
    try {
      const url = `${this.baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_TOP_CRYPTO_FAILED');
      return createErrorResponse(normalizedError);
    }
  }

  // Get price change percentage for cryptocurrencies
  async getPriceChange(id, days = 7) {
    try {
      const url = `${this.baseURL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
      const data = await this.fetchWithRetry(url);
      
      return createSuccessResponse(data);
    } catch (error) {
      const normalizedError = normalizeError(error, 'FETCH_PRICE_CHANGE_FAILED');
      return createErrorResponse(normalizedError);
    }
  }
}

// Create a singleton instance
const financialApi = new FinancialAPIClient(COIN_GECKO_CONFIG);

module.exports = {
  FinancialAPIClient,
  financialApi
};