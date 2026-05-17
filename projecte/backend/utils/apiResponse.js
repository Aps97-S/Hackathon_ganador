// utils/apiResponse.js
class ApiResponse {
  /**
   * Create a successful response
   * @param {any} data - Response data
   * @param {string} message - Success message
   * @returns {Object} Formatted response
   */
  static success(data, message = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create an error response
   * @param {string} message - Error message
   * @param {number} code - HTTP status code
   * @param {any} details - Additional error details
   * @returns {Object} Formatted error response
   */
  static error(message, code = 500, details = null) {
    return {
      success: false,
      message,
      code,
      details,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create a paginated response
   * @param {Array} data - Response data
   * @param {Object} pagination - Pagination information
   * @returns {Object} Paginated response
   */
  static paginate(data, pagination) {
    return {
      success: true,
      data,
      pagination,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ApiResponse;