import React from 'react';
import './FloatingHeartsBackground.css';

const FloatingHeartsBackground = ({ slow }) => (
  <div className="floating-hearts">
    {Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="floating-heart"
        style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: slow ? `${Math.random() * 10 + 15}s` : `${Math.random() * 5 + 8}s`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

export default FloatingHeartsBackground;
