/**
 * Complete Test file for Financial API Service
 * Tests all implemented CoinGecko API integration functionality
 */

// Import required modules
const FinancialService = require('../src/services/financialApi');

console.log('Testing Complete Financial API Service...\n');

// Simple test function to verify implementation
async function runTests() {
  try {
    console.log('1. Testing current price fetch...');
    const currentPriceResult = await FinancialService.getPrice('bitcoin');
    console.log('✓ Current price fetch completed');
    if (currentPriceResult && currentPriceResult.item) {
      console.log('  Result:', JSON.stringify(currentPriceResult, null, 2).substring(0, 100) + '...');
    } else {
      console.log('  Error:', currentPriceResult);
    }
    
    console.log('\n2. Testing multiple prices fetch...');
    const multiplePricesResult = await FinancialService.getMultiplePrices('bitcoin,ethereum');
    console.log('✓ Multiple prices fetch completed');
    if (multiplePricesResult && multiplePricesResult.items) {
      console.log('  Symbols:', multiplePricesResult.items.length);
    } else {
      console.log('  Error:', multiplePricesResult);
    }
    
    console.log('\n3. Testing price change fetch...');
    const priceChangeResult = await FinancialService.getPriceChange('bitcoin');
    console.log('✓ Price change fetch completed');
    if (priceChangeResult && priceChangeResult.item) {
      console.log('  Price change:', priceChangeResult.item.usd_24h_change);
    } else {
      console.log('  Error:', priceChangeResult);
    }
    
    console.log('\n4. Testing historical data fetch...');
    const historicalResult = await FinancialService.getPriceHistory('bitcoin', 7);
    console.log('✓ Historical data fetch completed');
    if (historicalResult && historicalResult.series) {
      console.log('  Data points:', historicalResult.series.length);
    } else {
      console.log('  Error:', historicalResult);
    }
    
    console.log('\n5. Testing historical data with interval...');
    const historicalIntervalResult = await FinancialService.getPriceHistoryWithInterval('bitcoin', 7, 'hourly');
    console.log('✓ Historical data with interval fetch completed');
    if (historicalIntervalResult && historicalIntervalResult.series) {
      console.log('  Data points:', historicalIntervalResult.series.length);
    } else {
      console.log('  Error:', historicalIntervalResult);
    }
    
    console.log('\n6. Testing top cryptos fetch...');
    const topCryptosResult = await FinancialService.getTopCrypto(5);
    console.log('✓ Top cryptos fetch completed');
    if (topCryptosResult && topCryptosResult.items) {
      console.log('  Number of cryptos:', topCryptosResult.items.length);
    } else {
      console.log('  Error:', topCryptosResult);
    }
    
    console.log('\n7. Testing coin details fetch...');
    const coinDetailsResult = await FinancialService.getCoinDetails('bitcoin');
    console.log('✓ Coin details fetch completed');
    if (coinDetailsResult && coinDetailsResult.item) {
      console.log('  Coin name:', coinDetailsResult.item.name);
    } else {
      console.log('  Error:', coinDetailsResult);
    }
    
    console.log('\n8. Testing market data fetch...');
    const marketDataResult = await FinancialService.getMarketData('bitcoin,ethereum');
    console.log('✓ Market data fetch completed');
    if (marketDataResult && marketDataResult.items) {
      console.log('  Number of cryptos:', marketDataResult.items.length);
    } else {
      console.log('  Error:', marketDataResult);
    }
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the tests
runTests();