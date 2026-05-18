import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

// Import page components
import DashboardPage from './pages/DashboardPage'
import CryptoDetailPage from './pages/CryptoDetailPage'
import HistoryPage from './pages/HistoryPage'
import MarketOverviewPage from './pages/MarketOverviewPage'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/crypto/:symbol" element={<CryptoDetailPage />} />
          <Route path="/history/:symbol" element={<HistoryPage />} />
          <Route path="/market" element={<MarketOverviewPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App