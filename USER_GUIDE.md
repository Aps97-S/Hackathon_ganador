# Stock & Cryptocurrency Tracker - User Guide

## Overview

This application provides a real-time dashboard for tracking stock and cryptocurrency prices. Users can select their preferred assets, set buy/sell alerts, and monitor price movements with visual indicators.

## Features

- **Real-time Price Tracking**: Live updates of selected stocks and cryptocurrencies
- **Asset Selection**: Choose from popular stocks (Apple, Google, Microsoft, Amazon, Tesla) and cryptocurrencies (Bitcoin, Ethereum, Ripple, Litecoin, Cardano)
- **Alert System**: Set buy/sell limits with visual notifications
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

1. **Prerequisites**:
   - Modern web browser (Chrome, Firefox, Safari, Edge)
   - No additional software installation required

2. **Running the Application**:
   - Open `index.html` in any web browser
   - The dashboard will load automatically

## Using the Dashboard

### 1. Asset Selection

- Select stocks or cryptocurrencies from the dropdown menus
- Click "Update Selection" to apply your choices
- Selected assets will appear in the tracking section below

### 2. Price Tracking

- Prices update every 3 seconds with simulated fluctuations
- Green indicators show price increases
- Red indicators show price decreases

### 3. Setting Alerts

- Enter a target price in the "Set Alert" field
- Choose "Buy" or "Sell" type
- Click "Set Alert" to create a new alert
- Alerts will be displayed with visual notifications when triggered

### 4. Managing Alerts

- Click the "Delete" button next to any alert to remove it
- All alerts are stored in browser local storage

## Interface Components

### Header Section
- Title and description of the application

### Asset Selection Section
- Dropdown menus for selecting stocks and cryptocurrencies
- Update button to apply selections

### Live Tracking Section
- Displays current prices for selected assets
- Shows price changes with visual indicators

### Alerts Section
- Lists all active buy/sell alerts
- Shows target prices and alert types
- Visual notifications when targets are met

## Troubleshooting

### Common Issues

1. **Prices not updating**:
   - Ensure you're using a modern browser
   - Check that JavaScript is enabled in your browser

2. **Alerts not appearing**:
   - Verify the target price is set correctly
   - Check that the asset prices are fluctuating

3. **Browser compatibility issues**:
   - Try opening in a different browser
   - Ensure your browser is up to date

## Technical Details

### Files Included
- `index.html`: Main HTML structure
- `styles.css`: Styling and responsive design
- `script.js`: JavaScript functionality for real-time updates and alerts

### How It Works
- Simulated real-time price updates using JavaScript
- Browser local storage for alert persistence
- Responsive CSS Grid layout for mobile compatibility

## Future Improvements

1. Integration with real financial APIs
2. User authentication system
3. Email/SMS notification capabilities
4. Advanced charting features
5. Portfolio tracking functionality
6. Multi-language support