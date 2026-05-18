import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PriceWidget from '../components/PriceWidget';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getTopCryptos, getCryptoPrice, formatCurrency, formatPercent, formatMarketCap } from '../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [ethereumPrice, setEthereumPrice] = useState(null);
  const [topGainer, setTopGainer] = useState(null);
  const [topLoser, setTopLoser] = useState(null);
  const navigate = useNavigate();

  // Fetch all crypto data
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get top 20 cryptos
      const topCryptos = await getTopCryptos(20);
      setCryptos(topCryptos);

      // Find Bitcoin and Ethereum prices for highlight cards
      const bitcoin = topCryptos.find(crypto => crypto.id === 'bitcoin');
      const ethereum = topCryptos.find(crypto => crypto.id === 'ethereum');

      if (bitcoin) {
        const bitcoinData = await getCryptoPrice('bitcoin');
        setBitcoinPrice({
          name: bitcoin.name,
          symbol: bitcoin.symbol,
          price: bitcoinData.usd,
          change24h: bitcoinData.usd_24h_change
        });
      }

      if (ethereum) {
        const ethereumData = await getCryptoPrice('ethereum');
        setEthereumPrice({
          name: ethereum.name,
          symbol: ethereum.symbol,
          price: ethereumData.usd,
          change24h: ethereumData.usd_24h_change
        });
      }

      // Find top gainer and loser
      const sortedCryptos = [...topCryptos].sort((a, b) => b.change_24h - a.change_24h);
      if (sortedCryptos.length > 0) {
        setTopGainer({
          name: sortedCryptos[0].name,
          symbol: sortedCryptos[0].symbol,
          price: sortedCryptos[0].usd,
          change24h: sortedCryptos[0].change_24h
        });
      }

      if (sortedCryptos.length > 1) {
        setTopLoser({
          name: sortedCryptos[sortedCryptos.length - 1].name,
          symbol: sortedCryptos[sortedCryptos.length - 1].symbol,
          price: sortedCryptos[sortedCryptos.length - 1].usd,
          change24h: sortedCryptos[sortedCryptos.length - 1].change_24h
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and set up auto-refresh
  useEffect(() => {
    fetchCryptoData();
    
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (symbol) => {
    navigate(`/crypto/${symbol}`);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="dashboard-content">
          <div className="highlights-grid">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} rows={3} height={100} />
            ))}
          </div>
          <div className="ranking-table">
            <LoadingSkeleton rows={10} columns={6} height={30} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="dashboard-content">
          <ErrorState message={error} onRetry={fetchCryptoData} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Market Overview</h1>
        
        <div className="highlights-grid">
          {bitcoinPrice ? (
            <PriceWidget
              name={bitcoinPrice.name}
              symbol={bitcoinPrice.symbol}
              price={bitcoinPrice.price}
              change24h={bitcoinPrice.change24h}
            />
          ) : (
            <LoadingSkeleton rows={3} height={100} />
          )}
          
          {ethereumPrice ? (
            <PriceWidget
              name={ethereumPrice.name}
              symbol={ethereumPrice.symbol}
              price={ethereumPrice.price}
              change24h={ethereumPrice.change24h}
            />
          ) : (
            <LoadingSkeleton rows={3} height={100} />
          )}
          
          {topGainer ? (
            <PriceWidget
              name={topGainer.name}
              symbol={topGainer.symbol}
              price={topGainer.price}
              change24h={topGainer.change24h}
            />
          ) : (
            <LoadingSkeleton rows={3} height={100} />
          )}
          
          {topLoser ? (
            <PriceWidget
              name={topLoser.name}
              symbol={topLoser.symbol}
              price={topLoser.price}
              change24h={topLoser.change24h}
            />
          ) : (
            <LoadingSkeleton rows={3} height={100} />
          )}
        </div>

        <div className="ranking-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price (USD)</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto, index) => (
                <tr 
                  key={crypto.id} 
                  className="clickable-row"
                  onClick={() => handleRowClick(crypto.symbol)}
                >
                  <td>{index + 1}</td>
                  <td>
                    <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                    <span className="crypto-name">{crypto.name}</span>
                  </td>
                  <td>{formatCurrency(crypto.usd)}</td>
                  <td className={crypto.change_24h >= 0 ? 'change-positive' : 'change-negative'}>
                    {formatPercent(crypto.change_24h)}
                  </td>
                  <td>{formatMarketCap(crypto.market_cap)}</td>
                  <td>{formatMarketCap(crypto.volume)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;