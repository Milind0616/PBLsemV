import React from 'react';
import './Dropdown.module.css';

const Dropdown = ({ title, features }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-header">
        <span className="dropdown-title">{title}</span>
        <span className="dropdown-arrow">▼</span>
      </div>
      <ul className="dropdown-list">
        {features.map((feature, index) => (
          <li key={index} className="dropdown-item">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
