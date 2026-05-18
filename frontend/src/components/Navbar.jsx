import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">CryptoDash</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Dashboard</Link>
          <Link to="/market" className="navbar-link">Market</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;