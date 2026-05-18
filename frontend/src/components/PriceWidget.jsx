import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatPercent } from '../utils';
import './PriceWidget.css';

const PriceWidget = ({ name, symbol, price, change24h, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/crypto/${symbol}`);
    }
  };

  const changeClass = change24h >= 0 ? 'change-positive' : 'change-negative';

  return (
    <div className="price-widget" onClick={handleClick} role="button" tabIndex={0}>
      <div className="price-widget-header">
        <span className="price-widget-name">{name}</span>
        <span className="price-widget-symbol">{symbol.toUpperCase()}</span>
      </div>
      <div className="price-widget-price">{formatCurrency(price)}</div>
      <div className={`price-widget-change ${changeClass}`}>
        {formatPercent(change24h)}
      </div>
    </div>
  );
};

export default PriceWidget;
