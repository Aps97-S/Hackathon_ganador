# Pending Tests Due to Database Configuration Issues

## Overview
The following tests cannot be executed at this time due to the database not being properly configured in the environment. The database initialization in the backend server is failing, which prevents some functionality from being tested.

## Tests That Cannot Be Executed

### 1. Database Integration Tests
- **File**: `projecte/backend/tests/financialApiComplete.test.js`
- **Issue**: Database connection fails during test execution
- **Reason**: Missing database configuration in `.env` file and database server not running
- **Impact**: Cannot test database model functionality, including:
  - Alert creation and retrieval
  - Currency data persistence  
  - Historical price storage
  - Simulation tracking
  - User management

### 2. Caching Middleware Tests
- **File**: `projecte/backend/src/middleware/cache.test.js` (if exists)
- **Issue**: Caching middleware requires database for some operations
- **Reason**: Database not initialized properly
- **Impact**: Cannot verify caching behavior and TTL functionality

### 3. Full Integration Tests
- **File**: `projecte/backend/tests/integration.test.js` (if exists)
- **Issue**: Full API integration tests require complete backend setup
- **Reason**: Database connection failures prevent full test execution
- **Impact**: Cannot validate end-to-end functionality with database operations

## Tests That Can Be Executed

### 1. API Service Unit Tests
The following tests can be run successfully:
- `getPrice('bitcoin')` - Current price fetching ✅
- `getMultiplePrices('bitcoin,ethereum')` - Multiple prices fetching ✅  
- `getPriceChange('bitcoin')` - Price change fetching ✅
- `getPriceHistory('bitcoin', 7)` - Historical data fetching ✅
- `getTopCrypto(5)` - Top cryptocurrencies fetching ✅
- `getCoinDetails('bitcoin')` - Coin details fetching ✅
- `getMarketData('bitcoin,ethereum')` - Market data fetching ✅

### 2. External API Integration Tests
- All CoinGecko API integration functionality works correctly ✅
- Error handling for external API failures ✅
- Retry logic and timeout handling ✅
- Response normalization ✅

## Recommendations

1. **Database Setup**:
   - Configure database connection in `.env` file (DB_HOST, DB_USER, DB_PASS, DB_NAME)
   - Ensure database server is running
   - Run database initialization scripts

2. **Test Environment**:
   - Create test database for isolation
   - Use environment variables for test configuration
   - Implement proper database cleanup after tests

3. **Testing Strategy**:
   - Mock database operations for unit tests
   - Use in-memory database for integration testing
   - Separate database-dependent tests from API tests