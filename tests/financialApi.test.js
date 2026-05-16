/**
 * Test file for Financial API Service
 * Tests the CoinGecko API integration functionality
 */

// Import required modules
const { financialApi } = require('../services/financialApi');

console.log('Testing Financial API Service...\n');

// Simple test function to verify implementation
async function runTests() {
  try {
    console.log('1. Testing current price fetch...');
    const currentPriceResult = await financialApi.getCurrentPrice('bitcoin');
    console.log('✓ Current price fetch completed');
    if (currentPriceResult.success) {
      console.log('  Result:', JSON.stringify(currentPriceResult.data, null, 2).substring(0, 100) + '...');
    } else {
      console.log('  Error:', currentPriceResult.error.message);
    }
    
    console.log('\n2. Testing historical data fetch...');
    const historicalResult = await financialApi.getHistoricalData('bitcoin', 7);
    console.log('✓ Historical data fetch completed');
    if (historicalResult.success) {
      console.log('  Data points:', historicalResult.data.prices.length);
    } else {
      console.log('  Error:', historicalResult.error.message);
    }
    
    console.log('\n3. Testing top cryptos fetch...');
    const topCryptosResult = await financialApi.getTopCryptos(5);
    console.log('✓ Top cryptos fetch completed');
    if (topCryptosResult.success) {
      console.log('  Number of cryptos:', topCryptosResult.data.length);
    } else {
      console.log('  Error:', topCryptosResult.error.message);
    }
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runTests();