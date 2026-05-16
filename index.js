/**
 * Main entry point for the hackathon project demonstrating CoinGecko API integration
 */

// Import required modules
const { getCurrentPrice, getHistoricalData } = require('./services/financialApi');
const { normalizeApiError } = require('./utils/apiResponse');

async function main() {
  console.log('=== CoinGecko API Integration Demo ===\n');
  
  try {
    // Example 1: Fetch current price for Bitcoin
    console.log('1. Fetching current price for Bitcoin:');
    const bitcoinPrice = await getCurrentPrice('bitcoin', 'usd');
    console.log('✓ Success:', bitcoinPrice.data);
    console.log();
    
    // Example 2: Fetch historical data for Ethereum
    console.log('2. Fetching historical data for Ethereum (30 days):');
    const ethereumHistory = await getHistoricalData('ethereum', { 
      days: 30, 
      interval: 'daily' 
    });
    console.log('✓ Success:', {
      coinId: ethereumHistory.data.coinId,
      days: ethereumHistory.data.days,
      priceCount: ethereumHistory.data.prices.length
    });
    console.log();
    
    // Example 3: Error handling demonstration
    console.log('3. Testing error handling:');
    try {
      await getCurrentPrice('nonexistentcoin', 'usd');
    } catch (error) {
      const normalizedError = normalizeApiError(error);
      console.log('✓ Error handled:', normalizedError.message);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
  
  console.log('\n=== Demo Complete ===');
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { main };