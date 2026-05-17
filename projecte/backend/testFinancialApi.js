// testFinancialApi.js

const FinancialService = require('./src/services/financialApi');

async function testFinancialApi() {
  console.log('Testing CoinGecko API Integration...\n');
  
  try {
    // Test 1: Get current price for Bitcoin
    console.log('1. Testing current price for Bitcoin...');
    const bitcoinPrice = await FinancialService.getPrice('bitcoin');
    console.log('✓ Bitcoin price retrieved:', bitcoinPrice.price.usd);
    
    // Test 2: Get top cryptocurrencies
    console.log('\n2. Testing top cryptocurrencies...');
    const topCrypto = await FinancialService.getTopCrypto(5);
    console.log('✓ Top 5 cryptocurrencies retrieved:', topCrypto.cryptocurrencies.length);
    
    // Test 3: Get historical data for Bitcoin (last 7 days)
    console.log('\n3. Testing historical data for Bitcoin...');
    const bitcoinHistory = await FinancialService.getPriceHistory('bitcoin', 7);
    console.log('✓ Bitcoin history retrieved:', bitcoinHistory.prices.length, 'data points');
    
    console.log('\n✅ All tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testFinancialApi();
}

module.exports = { testFinancialApi };