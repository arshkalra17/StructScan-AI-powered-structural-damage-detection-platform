import React from "react";

export default function Header() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <div className="top"></div>
      <nav className="flexX">
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginRight: 'auto',
          color: '#ffffff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          cursor: 'pointer'
        }}
        onClick={() => scrollToSection('home')}
        >
          StructScan
        </div>
        <ul className="navlinks flexX">
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>HOME</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a>
          </li>
          <li>
            <a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo'); }}>DEMO</a>
          </li>
          <li>
            <a href="#futer" onClick={(e) => { e.preventDefault(); scrollToSection('futer'); }}>CONTACT</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
