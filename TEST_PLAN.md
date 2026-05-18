# Comprehensive Test Plan

## 1. Project Overview

This document outlines a comprehensive test plan for the cryptocurrency market visualization project. The system consists of both backend API services and a frontend React application that visualizes cryptocurrency data from CoinGecko.

## 2. Test Strategy

### Test Categories
1. **Unit Tests** - Individual function/component testing
2. **Integration Tests** - Testing interactions between components/services
3. **End-to-End Tests** - Complete user flow testing

## 3. Unit Test Coverage Plan

### API Service Functions
**File: `frontend/src/services/api.js`**
- Test `fetchApi()` helper function with various error scenarios (network errors, HTTP errors)
- Test each exported function (`getTopCryptos`, `getCryptoPrice`, etc.) with mocked responses
- Verify proper URL construction and parameter handling
- Test error handling for network failures and API errors

### Component Rendering Tests
**Files:**
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/PriceWidget.jsx` 
- `frontend/src/components/ErrorState.jsx`
- `frontend/src/components/LoadingSkeleton.jsx`

- Test all components with different props configurations
- Verify proper rendering of loading states
- Test error state display
- Validate component structure and styling classes

### Data Formatting Utilities
**File: `frontend/src/utils/index.js`**
- Test `formatCurrency()` with various number inputs
- Test `formatPercent()` with positive/negative values
- Test `formatMarketCap()` with large numbers and edge cases
- Verify proper handling of null/undefined inputs

### Page Component Tests
**Files:**
- `frontend/src/pages/DashboardPage.jsx`
- `frontend/src/pages/CryptoDetailPage.jsx`
- `frontend/src/pages/HistoryPage.jsx`
- `frontend/src/pages/MarketOverviewPage.jsx`

- Test page rendering with mock data
- Verify proper state handling (loading, error, success)
- Test navigation functionality
- Validate data display and formatting

## 4. Integration Test Scenarios

### Full Page Flows
1. **Dashboard Navigation Flow**
   - Load dashboard page
   - Verify API calls to fetch top cryptos
   - Check loading states and error handling
   - Validate table rendering with data

2. **Crypto Detail Flow** 
   - Navigate from dashboard to crypto detail page
   - Verify API calls for detailed info and price
   - Test back navigation functionality
   - Validate proper data display

3. **History Chart Flow**
   - Navigate to history page
   - Select different time ranges
   - Verify chart rendering with historical data
   - Test error states and loading indicators

4. **Market Overview Flow**
   - Load market overview page
   - Verify API calls for top 50 cryptos
   - Check grid rendering with price widgets
   - Validate click interactions on crypto items

### Data Transformation Tests
1. **API Response Normalization**
   - Test data transformation from raw API responses to component-ready formats
   - Verify date parsing and formatting consistency
   - Validate currency/percentage formatting functions

2. **State Management Flow**
   - Test component state updates with new data
   - Validate loading and error state transitions
   - Check proper cleanup of intervals and event listeners

### User Interaction Tests
1. **Navigation Behavior**
   - Test all route transitions between pages
   - Verify parameter passing (crypto symbol)
   - Validate URL changes and browser history

2. **Data Refresh Mechanisms**
   - Test automatic data refresh intervals
   - Verify manual refresh functionality
   - Check proper interval cleanup on component unmount

## 5. Testing Framework Recommendations

### Unit Testing
**Jest** - Primary testing framework for JavaScript/React applications
- Native support for mocking and test isolation
- Excellent integration with React Testing Library
- Built-in coverage reporting

**React Testing Library** - Component testing utilities
- Focuses on user interactions rather than implementation details
- Follows best practices for testing React components
- Good accessibility support

### Integration Testing
**Vitest** - Alternative to Jest (already set up in project)
- Vite-native testing framework
- Fast execution times
- Compatible with existing Vite setup

### End-to-End Testing
**Cypress** - Browser automation framework
- Real browser testing capabilities
- Time-travel debugging
- Good for testing complete user flows
- Integration with CI/CD pipelines

## 6. Recommended Setup

### Installation Commands
```bash
# Install additional test dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
# Or for Vitest setup:
npm install --save-dev vitest jsdom @vitejs/plugin-react
```

### Configuration Files

**Jest Configuration** (`jest.config.js`):
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'frontend/src/**/*.{js,jsx}',
    '!frontend/src/index.jsx',
    '!frontend/src/main.jsx'
  ]
};
```

**Vitest Configuration** (`vite.config.js`):
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
});
```

## 7. Test Execution Instructions

### Running Unit Tests
```bash
# For Jest
npm run test

# For Vitest (if configured)
npm run test:unit
```

### Running Integration Tests
```bash
# Run with coverage
npm run test -- --coverage

# Run specific test files
npm run test DashboardPage.test.jsx
```

### Running E2E Tests
```bash
# Start development server
npm run dev

# Run Cypress tests
npx cypress open
# or for headless mode:
npx cypress run
```

## 8. Test Coverage Targets

### Unit Test Coverage (Minimum)
- **API Services**: 90% coverage
- **Components**: 85% coverage  
- **Utilities**: 100% coverage
- **Pages**: 80% coverage

### Integration Test Coverage
- **All major user flows**: 100%
- **Error handling scenarios**: 100%
- **Data transformation**: 100%

### E2E Test Coverage
- **Complete navigation flows**: 100%
- **Core functionality tests**: 80%
- **Edge case scenarios**: 70%

## 9. Continuous Integration Considerations

1. **Automated Testing Pipeline**
   - Run unit tests on every commit
   - Execute integration tests on pull requests
   - Run E2E tests in staging environment

2. **Test Reporting**
   - Generate code coverage reports
   - Provide test execution summaries
   - Integrate with CI/CD dashboards

3. **Performance Monitoring**
   - Monitor test execution times
   - Optimize slow-running tests
   - Implement parallel test execution where possible

## 10. Expected Outcomes

### Immediate Benefits
- Improved code quality through automated testing
- Early detection of regressions
- Better documentation through test cases
- Enhanced developer confidence in changes

### Long-term Benefits
- Reduced maintenance costs
- Faster development cycles
- More reliable application behavior
- Better scalability for future features

This comprehensive test plan ensures that all aspects of the cryptocurrency market visualization application are properly tested, from individual components to complete user flows.