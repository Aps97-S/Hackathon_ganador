/**
 * Standardized API Response Utilities
 * Provides consistent response formats and error handling across the application
 */

// Error codes and messages
const ERROR_CODES = {
  // General errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  
  // API-specific errors
  FETCH_CURRENT_PRICE_FAILED: 'FETCH_CURRENT_PRICE_FAILED',
  FETCH_HISTORICAL_DATA_FAILED: 'FETCH_HISTORICAL_DATA_FAILED',
  FETCH_COIN_DETAILS_FAILED: 'FETCH_COIN_DETAILS_FAILED',
  FETCH_MULTIPLE_PRICES_FAILED: 'FETCH_MULTIPLE_PRICES_FAILED',
  FETCH_TOP_CRYPTO_FAILED: 'FETCH_TOP_CRYPTO_FAILED',
  FETCH_PRICE_CHANGE_FAILED: 'FETCH_PRICE_CHANGE_FAILED',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR'
};

// Error messages mapping
const ERROR_MESSAGES = {
  [ERROR_CODES.INTERNAL_ERROR]: 'Internal server error occurred',
  [ERROR_CODES.INVALID_INPUT]: 'Invalid input provided',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error occurred',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out',
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized access',
  [ERROR_CODES.FORBIDDEN]: 'Access forbidden',
  [ERROR_CODES.NOT_FOUND]: 'Resource not found',
  
  [ERROR_CODES.FETCH_CURRENT_PRICE_FAILED]: 'Failed to fetch current price data',
  [ERROR_CODES.FETCH_HISTORICAL_DATA_FAILED]: 'Failed to fetch historical data',
  [ERROR_CODES.FETCH_COIN_DETAILS_FAILED]: 'Failed to fetch coin details',
  [ERROR_CODES.FETCH_MULTIPLE_PRICES_FAILED]: 'Failed to fetch multiple prices',
  [ERROR_CODES.FETCH_TOP_CRYPTO_FAILED]: 'Failed to fetch top cryptocurrencies',
  [ERROR_CODES.FETCH_PRICE_CHANGE_FAILED]: 'Failed to fetch price change data'
};

// Create a success response
function createSuccessResponse(data, message = 'Operation successful') {
  return {
    success: true,
    message,
    data
  };
}

// Create an error response
function createErrorResponse(error, customMessage = null) {
  const errorType = error.constructor.name;
  
  // Determine error code based on error type
  let errorCode = ERROR_CODES.INTERNAL_ERROR;
  
  if (errorType === 'AbortError') {
    errorCode = ERROR_CODES.TIMEOUT_ERROR;
  } else if (error.message.includes('HTTP error')) {
    // Handle HTTP errors from CoinGecko API
    const status = error.message.match(/status: (\d+)/);
    if (status) {
      const statusCode = parseInt(status[1]);
      switch (statusCode) {
        case 401:
          errorCode = ERROR_CODES.UNAUTHORIZED;
          break;
        case 403:
          errorCode = ERROR_CODES.FORBIDDEN;
          break;
        case 404:
          errorCode = ERROR_CODES.NOT_FOUND;
          break;
        default:
          errorCode = ERROR_CODES.INTERNAL_ERROR;
      }
    }
  }

  const message = customMessage || ERROR_MESSAGES[errorCode] || error.message || 'An unknown error occurred';
  
  return {
    success: false,
    error: {
      code: errorCode,
      message,
      originalError: error
    }
  };
}

// Normalize errors for consistent handling
function normalizeError(error, defaultCode = ERROR_CODES.INTERNAL_ERROR) {
  if (!error) {
    return new Error('Unknown error occurred');
  }

  // If it's already a normalized error, return as is
  if (error.code && error.message) {
    return error;
  }

  // Handle timeout errors
  if (error.name === 'AbortError') {
    return {
      code: ERROR_CODES.TIMEOUT_ERROR,
      message: ERROR_MESSAGES[ERROR_CODES.TIMEOUT_ERROR],
      originalError: error
    };
  }

  // Handle network errors
  if (error.message && error.message.includes('Failed to fetch')) {
    return {
      code: ERROR_CODES.NETWORK_ERROR,
      message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      originalError: error
    };
  }

  // Handle HTTP status errors
  if (error.status) {
    let code = defaultCode;
    switch (error.status) {
      case 401:
        code = ERROR_CODES.UNAUTHORIZED;
        break;
      case 403:
        code = ERROR_CODES.FORBIDDEN;
        break;
      case 404:
        code = ERROR_CODES.NOT_FOUND;
        break;
      default:
        code = defaultCode;
    }
    return {
      code,
      message: ERROR_MESSAGES[code] || `HTTP ${error.status} error`,
      originalError: error
    };
  }

  // Default error normalization
  return {
    code: defaultCode,
    message: error.message || ERROR_MESSAGES[defaultCode],
    originalError: error
  };
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  normalizeError,
  ERROR_CODES,
  ERROR_MESSAGES
};