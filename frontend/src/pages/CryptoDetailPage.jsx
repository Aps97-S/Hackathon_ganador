import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getCryptoDetails, getCryptoPrice, formatCurrency, formatPercent, formatMarketCap } from '../services/api';

const CryptoDetailPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const [details, price] = await Promise.all([
          getCryptoDetails(symbol),
          getCryptoPrice(symbol)
        ]);
        
        setCryptoData(details);
        setPriceData(price);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error('Error fetching crypto data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchCryptoData();
    }
  }, [symbol]);

  const handleViewChart = () => {
    navigate(`/history/${symbol}`);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !cryptoData || !priceData) {
    return (
      <div>
        <Navbar />
        <ErrorState message={error || 'Cryptocurrency not found'} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const isPositiveChange = cryptoData.price_change_percentage_24h >= 0;
  const priceChangeColor = isPositiveChange ? 'var(--green)' : 'var(--red)';

  return (
    <div className="detail-page">
      <Navbar />
      <div className="container">
        <div className="coin-header">
          <h1>{cryptoData.name} ({cryptoData.symbol.toUpperCase()})</h1>
          <p className="current-price">{formatCurrency(cryptoData.current_price)}</p>
          <p className={`price-change ${isPositiveChange ? 'positive' : 'negative'}`}>
            {formatPercent(cryptoData.price_change_percentage_24h)}
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">{formatMarketCap(cryptoData.market_cap)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Volume (24h)</span>
            <span className="stat-value">{formatMarketCap(cryptoData.total_volume)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Price USD</span>
            <span className="stat-value">{formatCurrency(priceData.usd)}</span>
          </div>
          {priceData.eur && (
            <div className="stat-card">
              <span className="stat-label">Price EUR</span>
              <span className="stat-value">{formatCurrency(priceData.eur)}</span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
          <button className="btn-primary" onClick={handleViewChart}>
            View Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;