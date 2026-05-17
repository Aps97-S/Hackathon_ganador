// Global variables to store tracking data and alerts
let trackedAssets = [];
let alerts = [];
let assetData = {};

// DOM Elements
const stockSelector = document.getElementById('stockSelector');
const cryptoSelector = document.getElementById('cryptoSelector');
const updateButton = document.getElementById('updateButton');
const assetList = document.getElementById('assetList');
const noAssetsMessage = document.getElementById('noAssetsMessage');
const selectedAsset = document.getElementById('selectedAsset');
const buyLimit = document.getElementById('buyLimit');
const sellLimit = document.getElementById('sellLimit');
const setLimitsButton = document.getElementById('setLimitsButton');
const alertsList = document.getElementById('alertsList');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    updateButton.addEventListener('click', updateAssetSelection);
    setLimitsButton.addEventListener('click', setBuySellLimits);
    
    // Initialize with some default assets
    initializeDefaultAssets();
    
    // Start real-time updates
    startRealTimeUpdates();
});

// Initialize with default assets
function initializeDefaultAssets() {
    // Add some default stocks and cryptocurrencies to be tracked
    const defaultStocks = ['AAPL', 'GOOGL'];
    const defaultCryptos = ['BTC', 'ETH'];
    
    // Select default assets in the dropdowns
    stockSelector.value = defaultStocks;
    cryptoSelector.value = defaultCryptos;
    
    // Update the selection to show them
    updateAssetSelection();
}

// Update selected assets for tracking
function updateAssetSelection() {
    const selectedStocks = Array.from(stockSelector.selectedOptions).map(option => ({
        symbol: option.value,
        name: option.text.split(' (')[0],
        type: 'stock'
    }));
    
    const selectedCryptos = Array.from(cryptoSelector.selectedOptions).map(option => ({
        symbol: option.value,
        name: option.text.split(' (')[0],
        type: 'crypto'
    }));
    
    // Combine all selected assets
    trackedAssets = [...selectedStocks, ...selectedCryptos];
    
    // Update the dropdown for alerts
    updateAlertAssetDropdown();
    
    // Display the assets
    displayTrackedAssets();
    
    // Start tracking these assets
    if (trackedAssets.length > 0) {
        noAssetsMessage.style.display = 'none';
        assetList.style.display = 'grid';
    } else {
        noAssetsMessage.style.display = 'block';
        assetList.style.display = 'none';
    }
}

// Update the dropdown for alerts with currently tracked assets
function updateAlertAssetDropdown() {
    // Clear existing options
    selectedAsset.innerHTML = '<option value="">-- Select an asset --</option>';
    
    // Add tracked assets to the dropdown
    trackedAssets.forEach(asset => {
        const option = document.createElement('option');
        option.value = asset.symbol;
        option.textContent = `${asset.name} (${asset.symbol})`;
        selectedAsset.appendChild(option);
    });
}

// Display all tracked assets in the UI
function displayTrackedAssets() {
    // Clear existing asset cards
    assetList.innerHTML = '';
    
    if (trackedAssets.length === 0) {
        noAssetsMessage.style.display = 'block';
        return;
    }
    
    noAssetsMessage.style.display = 'none';
    
    trackedAssets.forEach(asset => {
        const assetCard = createAssetCard(asset);
        assetList.appendChild(assetCard);
        
        // Initialize data for this asset
        if (!assetData[asset.symbol]) {
            assetData[asset.symbol] = {
                price: generateRandomPrice(asset.type === 'crypto' ? 50000 : 150),
                change: 0,
                changePercent: 0
            };
        }
    });
}

// Create a card element for an asset
function createAssetCard(asset) {
    const card = document.createElement('div');
    card.className = 'asset-card';
    
    // Get current price data
    const priceData = assetData[asset.symbol];
    
    card.innerHTML = `
        <div class="asset-header">
            <div class="asset-name">${asset.name}</div>
            <div class="asset-symbol">${asset.symbol}</div>
        </div>
        <div class="asset-price ${priceData.change >= 0 ? 'price-positive' : 'price-negative'}">
            $${priceData.price.toFixed(2)}
        </div>
        <div class="asset-change ${priceData.change >= 0 ? 'change-up' : 'change-down'}">
            ${priceData.change >= 0 ? '↑' : '↓'} ${Math.abs(priceData.changePercent).toFixed(2)}% 
            (${priceData.change >= 0 ? '+' : ''}${priceData.change.toFixed(2)})
        </div>
    `;
    
    return card;
}

// Set buy/sell limits for an asset
function setBuySellLimits() {
    const symbol = selectedAsset.value;
    const buyValue = parseFloat(buyLimit.value);
    const sellValue = parseFloat(sellLimit.value);
    
    if (!symbol) {
        alert('Please select an asset.');
        return;
    }
    
    if (isNaN(buyValue) && isNaN(sellValue)) {
        alert('Please enter a valid limit value for buy or sell.');
        return;
    }
    
    // Find the asset name
    const asset = trackedAssets.find(a => a.symbol === symbol);
    if (!asset) {
        alert('Asset not found in tracking list.');
        return;
    }
    
    // Create alert object
    const newAlert = {
        id: Date.now(),
        assetSymbol: symbol,
        assetName: asset.name,
        buyLimit: isNaN(buyValue) ? null : buyValue,
        sellLimit: isNaN(sellValue) ? null : sellValue,
        timestamp: new Date()
    };
    
    // Add to alerts array
    alerts.push(newAlert);
    
    // Display the alert
    displayAlerts();
    
    // Clear form
    buyLimit.value = '';
    sellLimit.value = '';
    
    alert(`Alert set for ${asset.name}!`);
}

// Display all active alerts
function displayAlerts() {
    alertsList.innerHTML = '';
    
    if (alerts.length === 0) {
        alertsList.innerHTML = '<p>No active alerts</p>';
        return;
    }
    
    alerts.forEach(alert => {
        const alertCard = createAlertCard(alert);
        alertsList.appendChild(alertCard);
    });
}

// Create a card element for an alert
function createAlertCard(alert) {
    const card = document.createElement('div');
    card.className = 'alert-card';
    
    // Get the asset name
    const asset = trackedAssets.find(a => a.symbol === alert.assetSymbol);
    
    card.innerHTML = `
        <div class="alert-header">
            <div class="alert-name">${asset ? asset.name : alert.assetSymbol}</div>
            <div class="alert-type">Alert</div>
        </div>
        <div class="alert-details">
            <span>Buy Limit: ${alert.buyLimit !== null ? '$' + alert.buyLimit.toFixed(2) : 'None'}</span>
            <span>Sell Limit: ${alert.sellLimit !== null ? '$' + alert.sellLimit.toFixed(2) : 'None'}</span>
        </div>
        <div class="alert-actions">
            <button class="delete-btn" onclick="deleteAlert(${alert.id})">Delete</button>
        </div>
    `;
    
    return card;
}

// Delete an alert
function deleteAlert(id) {
    alerts = alerts.filter(alert => alert.id !== id);
    displayAlerts();
}

// Start real-time updates for asset prices
function startRealTimeUpdates() {
    // Update every 3 seconds to simulate real-time data
    setInterval(() => {
        updateAssetPrices();
        checkAlerts();
    }, 3000);
}

// Update asset prices with simulated real-time changes
function updateAssetPrices() {
    trackedAssets.forEach(asset => {
        const priceData = assetData[asset.symbol];
        
        // Generate small random price change (between -2% and +2%)
        const changePercent = (Math.random() * 4 - 2) / 100;
        const change = priceData.price * changePercent;
        
        // Update price data
        priceData.price += change;
        priceData.change = change;
        priceData.changePercent = changePercent * 100;
        
        // Ensure price is not negative
        if (priceData.price < 0) {
            priceData.price = 0;
        }
    });
    
    // Update displayed prices
    displayTrackedAssets();
}

// Update displayed prices with animation
function displayTrackedAssets() {
    // Clear existing asset cards
    assetList.innerHTML = '';
    
    if (trackedAssets.length === 0) {
        noAssetsMessage.style.display = 'block';
        return;
    }
    
    noAssetsMessage.style.display = 'none';
    
    trackedAssets.forEach(asset => {
        const assetCard = createAssetCard(asset);
        assetList.appendChild(assetCard);
        
        // Initialize data for this asset
        if (!assetData[asset.symbol]) {
            assetData[asset.symbol] = {
                price: generateRandomPrice(asset.type === 'crypto' ? 50000 : 150),
                change: 0,
                changePercent: 0
            };
        }
    });
}
    });
    
    // Update displayed prices
    displayTrackedAssets();
}

// Check if any alerts should be triggered
function checkAlerts() {
    trackedAssets.forEach(asset => {
        const priceData = assetData[asset.symbol];
        
        // Find active alerts for this asset
        const assetAlerts = alerts.filter(alert => alert.assetSymbol === asset.symbol);
        
        assetAlerts.forEach(alert => {
            // Check if buy limit is reached (price drops below or equals buy limit)
            if (alert.buyLimit !== null && priceData.price <= alert.buyLimit) {
                triggerAlert(asset, alert, 'buy');
            }
            
            // Check if sell limit is reached (price rises above or equals sell limit)
            if (alert.sellLimit !== null && priceData.price >= alert.sellLimit) {
                triggerAlert(asset, alert, 'sell');
            }
        });
    });
}

// Trigger an alert notification
function triggerAlert(asset, alert, type) {
    // In a real app, this would show a notification or send an email
    const alertType = type === 'buy' ? 'BUY' : 'SELL';
    
    // Get the current price data for this asset
    const priceData = assetData[asset.symbol];
    
    // Create a notification in the UI
    const notification = document.createElement('div');
    notification.className = 'alert-notification';
    notification.innerHTML = `
        <strong>${asset.name} (${asset.symbol})</strong> - ${alertType} ALERT! 
        Current price: $${priceData.price.toFixed(2)}
    `;
    
    // Add to UI (this would be more sophisticated in a real app)
    console.log(`ALERT: ${asset.name} (${asset.symbol}) - ${alertType} at $${priceData.price.toFixed(2)}`);
    
    // Remove the alert after triggering it
    alerts = alerts.filter(a => a.id !== alert.id);
    displayAlerts();
}

// Generate a random price for initialization
function generateRandomPrice(basePrice) {
    return basePrice + (Math.random() * basePrice * 0.1 - (basePrice * 0.05));
}