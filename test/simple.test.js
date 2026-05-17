/**
 * Simple test for financial API service functionality
 */

const { createApiResponse, createApiError } = require('../utils/apiResponse');

describe('API Response Utilities', () => {
  test('should create a successful response', () => {
    const response = createApiResponse(true, 'Test message', { data: 'test' });
    expect(response.success).toBe(true);
    expect(response.message).toBe('Test message');
    expect(response.data.data).toBe('test');
  });

  test('should create an error response', () => {
    const error = createApiError(404, 'Not found', 'NOT_FOUND');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not found');
    expect(error.errorCode).toBe('NOT_FOUND');
  });
});

describe('API Error Handling', () => {
  test('should handle invalid input gracefully', () => {
    const error = createApiError(400, 'Invalid input', 'INVALID_INPUT');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid input');
    expect(error.errorCode).toBe('INVALID_INPUT');
  });
});