// services/financialApi.js
const { ApiClient } = require('../config/externalApi');

class FinancialService {
  constructor() {
    this.apiClient = new ApiClient();
  }

  /**
   * Get current price for a cryptocurrency
   * @param {string} symbol - Cryptocurrency symbol (e.g., 'bitcoin')
   * @returns {Promise<Object>} Price data
   */
  async getPrice(symbol) {
    try {
      // Validate input
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid symbol parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/simple/price?ids=${symbol}&vs_currencies=usd,eur&include_24h_change=true`
      );
      
      if (!response || Object.keys(response).length === 0) {
        throw new Error('No data received from API');
      }
      
      return {
        symbol,
        price: response[symbol],
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get current prices for multiple cryptocurrencies
   * @param {string} symbols - Comma-separated cryptocurrency symbols (e.g., 'bitcoin,ethereum')
   * @returns {Promise<Object>} Multiple price data
   */
  async getMultiplePrices(symbols) {
    try {
      // Validate input
      if (!symbols || typeof symbols !== 'string') {
        throw new Error('Invalid symbols parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/simple/price?ids=${symbols}&vs_currencies=usd,eur&include_24h_change=true`
      );
      
      if (!response || Object.keys(response).length === 0) {
        throw new Error('No data received from API');
      }
      
      // Normalize response to consistent structure
      const normalizedResponse = {};
      for (const [symbol, data] of Object.entries(response)) {
        normalizedResponse[symbol] = {
          usd: data.usd,
          eur: data.eur,
          usd_24h_change: data.usd_24h_change || 0
        };
      }
      
      return {
        symbols: symbols.split(','),
        prices: normalizedResponse,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching multiple prices for ${symbols}:`, error);
      throw error;
    }
  }

  /**
   * Get price change data for a cryptocurrency
   * @param {string} symbol - Cryptocurrency symbol (e.g., 'bitcoin')
   * @returns {Promise<Object>} Price change data
   */
  async getPriceChange(symbol) {
    try {
      // Validate input
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid symbol parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/simple/price?ids=${symbol}&vs_currencies=usd&include_24h_change=true`
      );
      
      if (!response || Object.keys(response).length === 0) {
        throw new Error('No data received from API');
      }
      
      const priceData = response[symbol];
      
      return {
        symbol,
        usd: priceData?.usd || 0,
        usd_24h_change: priceData?.usd_24h_change || 0,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching price change for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get historical price data for a cryptocurrency
   * @param {string} symbol - Cryptocurrency symbol (e.g., 'bitcoin')
   * @param {number} days - Number of days to fetch (1-1095)
   * @returns {Promise<Object>} Historical price data
   */
  async getPriceHistory(symbol, days = 30) {
    try {
      // Validate input
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid symbol parameter');
      }
      
      if (typeof days !== 'number' || days < 1 || days > 1095) {
        throw new Error('Days must be a number between 1 and 1095');
      }
      
      const response = await this.apiClient.fetch(
        `/coins/${symbol}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      
      if (!response || !response.prices) {
        throw new Error('No historical data received from API');
      }
      
      return {
        symbol,
        prices: response.prices,
        timestamps: response.prices.map(price => new Date(price[0]).toISOString()),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching history for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get top cryptocurrencies by market cap
   * @param {number} limit - Number of cryptocurrencies to return (1-250)
   * @returns {Promise<Object>} Top cryptocurrencies data
   */
  async getTopCrypto(limit = 10) {
    try {
      // Validate input
      if (typeof limit !== 'number' || limit < 1 || limit > 250) {
        throw new Error('Limit must be a number between 1 and 250');
      }
      
      const response = await this.apiClient.fetch(
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );
      
      if (!response || !Array.isArray(response)) {
        throw new Error('No top cryptocurrencies data received from API');
      }
      
      return {
        limit,
        cryptocurrencies: response.map(coin => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          market_cap: coin.market_cap,
          total_volume: coin.total_volume,
        })),
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error('Error fetching top cryptocurrencies:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a cryptocurrency
   * @param {string} symbol - Cryptocurrency symbol (e.g., 'bitcoin')
   * @returns {Promise<Object>} Detailed cryptocurrency data
   */
  async getCoinDetails(symbol) {
    try {
      // Validate input
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid symbol parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      
      if (!response) {
        throw new Error('No coin details received from API');
      }
      
      return {
        id: response.id,
        symbol: response.symbol,
        name: response.name,
        current_price: response.market_data?.current_price?.usd || 0,
        market_cap: response.market_data?.market_cap?.usd || 0,
        total_volume: response.market_data?.total_volume?.usd || 0,
        price_change_percentage_24h: response.market_data?.price_change_percentage_24h || 0,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching coin details for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get market data for multiple cryptocurrencies
   * @param {string} symbols - Comma-separated cryptocurrency symbols 
   * @returns {Promise<Object>} Market data for multiple coins
   */
  async getMarketData(symbols) {
    try {
      // Validate input
      if (!symbols || typeof symbols !== 'string') {
        throw new Error('Invalid symbols parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/coins/markets?vs_currency=usd&ids=${symbols}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      
      if (!response || !Array.isArray(response)) {
        throw new Error('No market data received from API');
      }
      
      return {
        symbols: symbols.split(','),
        cryptocurrencies: response.map(coin => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          market_cap: coin.market_cap,
          total_volume: coin.total_volume,
        })),
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Error fetching market data for ${symbols}:`, error);
      throw error;
    }
  }

  /**
   * Get price history with different intervals
   * @param {string} symbol - Cryptocurrency symbol 
   * @param {number} days - Number of days to fetch (1-1095)
   * @param {string} interval - Interval type ('daily', 'hourly')
   * @returns {Promise<Object>} Historical price data with intervals
   */
  async getPriceHistoryWithInterval(symbol, days = 30, interval = 'daily') {
    try {
      // Validate input
      if (!symbol || typeof symbol !== 'string') {
        throw new Error('Invalid symbol parameter');
      }
      
      if (typeof days !== 'number' || days < 1 || days > 1095) {
        throw new Error('Days must be a number between 1 and 1095');
      }
      
      if (interval !== 'daily' && interval !== 'hourly') {
        throw new Error('Interval must be either "daily" or "hourly"');
      }
      
      const response = await this.apiClient.fetch(
        `/coins/${symbol}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
      );
      
      if (!response || !response.prices) {
        throw new Error('No historical data received from API');
      }
      
      return {
        symbol,
        prices: response.prices,
        timestamps: response.prices.map(price => new Date(price[0]).toISOString()),
        interval,
        success: true
      };
    } catch (error) {
      console.error(`Error fetching history with interval for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get exchange rates for multiple currencies
   * @param {string} vsCurrencies - Comma-separated currency codes 
   * @returns {Promise<Object>} Exchange rate data
   */
  async getExchangeRates(vsCurrencies) {
    try {
      // Validate input
      if (!vsCurrencies || typeof vsCurrencies !== 'string') {
        throw new Error('Invalid vs_currencies parameter');
      }
      
      const response = await this.apiClient.fetch(
        `/simple/supported_vs_currencies`
      );
      
      // For this implementation we'll return the supported currencies
      // In a real implementation, you might want to fetch exchange rates for specific pairs
      return {
        vs_currencies: response,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw error;
    }
  }
}

// Export a single instance for use throughout the application
module.exports = new FinancialService();