import React from "react";

export default function Header() {
  return (
    <div>
      <div className="top"></div>
      <nav className="flexX">
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginRight: 'auto',
          color: 'var(--accent-color-1)',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          StructScan
        </div>
        <ul className="navlinks flexX">
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#demo">DEMO</a>
          </li>
          <li>
            <a href="#futer">CONTACT</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
