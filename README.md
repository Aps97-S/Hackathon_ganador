# CoinGecko API Integration

This project implements a complete CoinGecko API integration using fetch instead of axios, following modern best practices for API consumption.

## Architecture

The implementation follows a layered architecture with the following components:

1. **Configuration** (`projecte/backend/src/config/externalApi.js`) - Contains API base URLs and configuration
2. **Service Layer** (`projecte/backend/src/services/financialApi.js`) - Main API client with retry logic and error handling
3. **Database Models** (`projecte/backend/src/models/`) - Data persistence for price history and market data
4. **Controllers** (`projecte/backend/src/controllers/marketController.js`) - Request handlers for API endpoints
5. **Routes** (`projecte/backend/src/routes/market.js`) - API endpoint definitions

## Key Features

- **Fetch-based implementation** - Uses native fetch API instead of axios
- **Retry Logic** - Automatic retries with configurable delays
- **Error Handling** - Comprehensive error normalization and standardized responses
- **Timeout Management** - Configurable timeouts to prevent hanging requests
- **Logging** - Request/response logging capabilities
- **Validation** - Response validation for data integrity
- **Database Integration** - Persistent storage of historical price data
- **Caching** - Middleware support for API response caching

## Usage Examples

### Basic Usage

```javascript
const FinancialService = require('./projecte/backend/src/services/financialApi');

// Fetch current price of Bitcoin
const currentPrice = await FinancialService.getPrice('bitcoin');
console.log(currentPrice);

// Fetch historical data for Bitcoin (last 30 days)
const historicalData = await FinancialService.getPriceHistory('bitcoin', 30);
console.log(historicalData);

// Fetch top cryptocurrencies by market cap
const topCryptos = await FinancialService.getTopCrypto(10);
console.log(topCryptos);
```

### Response Format

All responses follow a consistent format:

```javascript
// Success response
{
  success: true,
  data: { /* API response data */ }
}

// Error response
{
  success: false,
  error: {
    code: 'FETCH_CURRENT_PRICE_FAILED',
    message: 'Failed to fetch current price data',
    originalError: { /* Original error object */ }
  }
}
```

## Configuration

API configuration is stored in `projecte/.env`:

```javascript
# External API Configuration
EXTERNAL_API_PROVIDER=coingecko
EXTERNAL_API_BASE_URL=https://api.coingecko.com/api/v3
API_TIMEOUT=10000
API_MAX_RETRIES=3
API_RETRY_DELAY=1000
API_CACHE_TTL=60
```

## API Methods

- `getPrice(symbol)` - Fetch current price of a cryptocurrency
- `getMultiplePrices(symbols)` - Fetch prices for multiple cryptocurrencies
- `getPriceChange(symbol)` - Fetch price change percentage
- `getPriceHistory(symbol, days)` - Fetch historical price data
- `getPriceHistoryWithInterval(symbol, days, interval)` - Fetch historical data with specific intervals
- `getTopCrypto(limit)` - Fetch top cryptocurrencies by market cap
- `getCoinDetails(symbol)` - Fetch detailed information about a cryptocurrency
- `getMarketData(symbols)` - Fetch market data for multiple cryptocurrencies

## API Endpoints

The service exposes the following REST endpoints:

### Market Data
- `GET /api/market/price/:symbol` - Get current price of a cryptocurrency
- `GET /api/market/prices/:symbols` - Get current prices for multiple cryptocurrencies
- `GET /api/market/price-change/:symbol` - Get price change percentage
- `GET /api/market/history/:symbol` - Get historical price data (default 30 days)
- `GET /api/market/history/:symbol/interval` - Get historical data with interval parameter
- `GET /api/market/top` - Get top cryptocurrencies by market cap
- `GET /api/market/details/:symbol` - Get detailed cryptocurrency information
- `GET /api/market/data/:symbols` - Get market data for multiple cryptocurrencies

## Testing

Run the tests with:

```bash
npm test
```

The test file `projecte/backend/tests/financialApiComplete.test.js` includes comprehensive tests for all implemented methods.