import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ rows = 3, columns = 1, height = 20 }) => {
  const renderRows = () => {
    const skeletons = [];
    
    for (let i = 0; i < rows; i++) {
      skeletons.push(
        <div key={i} className="skeleton-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className="skeleton-box"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      );
    }
    
    return skeletons;
  };

  return <div className="loading-skeleton">{renderRows()}</div>;
};

export default LoadingSkeleton;