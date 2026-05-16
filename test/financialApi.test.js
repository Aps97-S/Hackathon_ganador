/**
 * Test file for financial API service
 */

const { getCurrentPrice, getHistoricalData } = require('../services/financialApi');
const { createApiResponse, createApiError } = require('../utils/apiResponse');

// Mock axios to avoid actual API calls during tests
jest.mock('axios');
const axios = require('axios');

describe('Financial API Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getCurrentPrice', () => {
    it('should fetch current price successfully', async () => {
      const mockResponse = {
        data: {
          bitcoin: {
            usd: 50000.00
          }
        },
        status: 200,
        statusText: 'OK'
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await getCurrentPrice('bitcoin', 'usd');
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Current price fetched successfully');
      expect(result.data.coinId).toBe('bitcoin');
      expect(result.data.price).toBe(50000.00);
    });

    it('should handle invalid input parameters', async () => {
      await expect(getCurrentPrice('', 'usd')).rejects.toThrow();
    });
  });

  describe('getHistoricalData', () => {
    it('should fetch historical data successfully', async () => {
      const mockResponse = {
        data: {
          prices: [
            [1609459200000, 50000.00],
            [1609545600000, 51000.00]
          ]
        },
        status: 200,
        statusText: 'OK'
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await getHistoricalData('bitcoin', { days: 7 });
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Historical data fetched successfully');
      expect(result.data.coinId).toBe('bitcoin');
      expect(result.data.days).toBe(7);
    });

    it('should handle invalid input parameters', async () => {
      await expect(getHistoricalData('bitcoin', { days: 1096 })).rejects.toThrow();
    });
  });
});