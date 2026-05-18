import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCryptoHistory, formatCurrency } from '../services/api';
import Navbar from '../components/Navbar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import './HistoryPage.css';

const HistoryPage = () => {
  const { symbol } = useParams();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState(30);

  // Time ranges in days
  const timeRanges = [
    { label: '7d', days: 7 },
    { label: '30d', days: 30 },
    { label: '90d', days: 90 },
    { label: '1y', days: 365 }
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!symbol) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await getCryptoHistory(symbol, selectedRange);
        
        // Transform data for Recharts
        const transformedData = data.map(([timestamp, price]) => ({
          date: new Date(timestamp),
          price: price
        }));
        
        setHistoryData(transformedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch historical data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [symbol, selectedRange]);

  const handleRangeChange = (days) => {
    setSelectedRange(days);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{formattedDate}</p>
          <p className="tooltip-price">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  // Format X-axis tick labels
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="history-page">
        <Navbar />
        <div className="history-content">
          <LoadingSkeleton rows={1} columns={1} height={40} />
          <div className="chart-container">
            <LoadingSkeleton rows={10} columns={1} height={300} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <Navbar />
        <div className="history-content">
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  // Get the coin name for header
  const coinName = symbol.charAt(0).toUpperCase() + symbol.slice(1);

  return (
    <div className="history-page">
      <Navbar />
      <div className="history-content">
        <div className="history-header">
          <h1>{coinName}</h1>
          <p className="symbol">({symbol.toUpperCase()})</p>
        </div>
        
        <div className="range-selector">
          {timeRanges.map((range) => (
            <button
              key={range.days}
              className={`range-btn ${selectedRange === range.days ? 'active' : ''}`}
              onClick={() => handleRangeChange(range.days)}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={historyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis}
                tick={{ fill: 'var(--text-secondary)' }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => formatCurrency(value)}
                tick={{ fill: 'var(--text-secondary)' }}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'var(--accent)', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: 'var(--accent)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;