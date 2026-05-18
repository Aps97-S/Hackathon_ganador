import { formatCurrency, formatPercent, formatMarketCap } from '../utils';

// Base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Helper function to fetch from API and handle responses
 * @param {string} endpoint - The API endpoint to call
 * @returns {Promise<any>} - The data from the API response
 */
async function fetchApi(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data.data;
  } catch (error) {
    // Re-throw the error so it can be handled by the caller
    throw new Error(`API Error: ${error.message}`);
  }
}

/**
 * Get top cryptocurrencies
 * @param {number} limit - Number of items to return
 * @returns {Promise<Array>} - Array of top cryptocurrencies
 */
export async function getTopCryptos(limit = 10) {
  const data = await fetchApi(`/market/top?limit=${limit}`);
  return data.items;
}

/**
 * Get price for a single cryptocurrency
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'bitcoin')
 * @returns {Promise<Object>} - The cryptocurrency price data
 */
export async function getCryptoPrice(symbol) {
  const data = await fetchApi(`/market/price/${symbol}`);
  return data.item;
}

/**
 * Get prices for multiple cryptocurrencies
 * @param {string[]} symbols - Array of cryptocurrency symbols
 * @returns {Promise<Array>} - Array of cryptocurrency price data
 */
export async function getCryptoPrices(symbols) {
  const data = await fetchApi(`/market/prices/${symbols.join(',')}`);
  return data.items;
}

/**
 * Get price change for a single cryptocurrency
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'bitcoin')
 * @returns {Promise<Object>} - The cryptocurrency price change data
 */
export async function getCryptoPriceChange(symbol) {
  const data = await fetchApi(`/market/price-change/${symbol}`);
  return data.item;
}

/**
 * Get historical price data for a cryptocurrency
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'bitcoin')
 * @param {number} days - Number of days of history to retrieve
 * @returns {Promise<Array>} - Array of timestamp and price pairs
 */
export async function getCryptoHistory(symbol, days = 30) {
  const data = await fetchApi(`/market/history/${symbol}?days=${days}`);
  return data.series;
}

/**
 * Get historical price data with specified interval
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'bitcoin')
 * @param {number} days - Number of days of history to retrieve
 * @param {string} interval - Interval type (e.g., 'daily')
 * @returns {Promise<Object>} - Object containing series data and interval
 */
export async function getCryptoHistoryInterval(symbol, days = 30, interval = 'daily') {
  const data = await fetchApi(`/market/history/${symbol}/interval?days=${days}&interval=${interval}`);
  return {
    series: data.series,
    interval: data.interval
  };
}

/**
 * Get detailed information for a cryptocurrency
 * @param {string} symbol - The cryptocurrency symbol (e.g., 'bitcoin')
 * @returns {Promise<Object>} - The cryptocurrency detailed data
 */
export async function getCryptoDetails(symbol) {
  const data = await fetchApi(`/market/details/${symbol}`);
  return data.item;
}

/**
 * Get market data for multiple cryptocurrencies
 * @param {string[]} symbols - Array of cryptocurrency symbols
 * @returns {Promise<Array>} - Array of cryptocurrency market data
 */
export async function getCryptoMarketData(symbols) {
  const data = await fetchApi(`/market/data/${symbols.join(',')}`);
  return data.items;
}

// Export utility functions for reuse in components
export { formatCurrency, formatPercent, formatMarketCap };