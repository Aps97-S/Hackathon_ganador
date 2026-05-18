import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PriceWidget from '../components/PriceWidget';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getTopCryptos, formatCurrency, formatPercent } from '../services/api';
import './MarketOverviewPage.css';

const MarketOverviewPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCryptos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTopCryptos(50);
      setCryptos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchCryptos();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchCryptos, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleCryptoClick = (symbol) => {
    navigate(`/crypto/${symbol}`);
  };

  if (loading) {
    return (
      <div className="market-page">
        <Navbar />
        <div className="market-content">
          <h1 className="market-title">Market Overview</h1>
          <div className="market-grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <LoadingSkeleton key={index} rows={3} height={40} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-page">
        <Navbar />
        <div className="market-content">
          <h1 className="market-title">Market Overview</h1>
          <ErrorState message={error} onRetry={fetchCryptos} />
        </div>
      </div>
    );
  }

  return (
    <div className="market-page">
      <Navbar />
      <div className="market-content">
        <h1 className="market-title">Market Overview</h1>
        <div className="market-grid">
          {cryptos.map((crypto) => (
            <PriceWidget
              key={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol}
              price={crypto.usd}
              change24h={crypto.change_24h}
              onClick={() => handleCryptoClick(crypto.symbol)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewPage;