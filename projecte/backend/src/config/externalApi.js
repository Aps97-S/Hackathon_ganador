// config/externalApi.js
class ApiClient {
  constructor() {
    this.baseUrl = process.env.EXTERNAL_API_BASE_URL || 'https://api.coingecko.com/api/v3';
    this.apiKey = process.env.EXTERNAL_API_KEY || '';
    this.timeout = parseInt(process.env.API_TIMEOUT) || 10000; // 10 seconds default
    this.maxRetries = parseInt(process.env.API_MAX_RETRIES) || 3;
    this.retryDelay = parseInt(process.env.API_RETRY_DELAY) || 1000; // 1 second delay
  }

  /**
   * Make a fetch request with retry logic
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response
   */
  async fetch(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Add API key to query parameters if it exists
    if (this.apiKey) {
      const separator = endpoint.includes('?') ? '&' : '?';
      url += `${separator}api_key=${this.apiKey}`;
    }

    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on client-side errors (4xx)
        if (error.name === 'AbortError' || (error.message && error.message.includes('HTTP 4'))) {
          throw error;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === this.maxRetries) {
          throw error;
        }
        
        console.warn(`API request failed (attempt ${attempt}/${this.maxRetries}):`, error.message);
        await this.sleep(this.retryDelay * attempt); // Exponential backoff
      }
    }
    
    throw lastError;
  }

  /**
   * Sleep utility for delays
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = { ApiClient };