import React from "react";

export default function Footer() {
  return (
    <div id="futer">
      <footer>
        <div style={{ 
          padding: '40px 20px', 
          maxWidth: '800px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '30px',
            color: '#fff'
          }}>
            Contact
          </h2>
          
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '30px',
            color: '#fff'
          }}>
            Made by Arsh Kalra
          </p>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            alignItems: 'center',
            fontSize: '1.1rem'
          }}>
            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:arshkalra17@gmail.com" style={{ color: '#4A9EFF', textDecoration: 'none' }}>
                arshkalra17@gmail.com
              </a>
            </div>
            
            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.49 21.54 20.95 20.97 20.92C10.05 20.24 3.76 13.95 3.08 3.03C3.05 2.46 3.51 2 4.08 2H7.08C7.65 2 8.13 2.47 8.14 3.04C8.23 5.39 8.67 7.64 9.41 9.75C9.56 10.16 9.43 10.61 9.09 10.89L7.57 12.08C9.2 15.36 12.64 18.8 15.92 20.43L17.11 18.91C17.39 18.57 17.84 18.44 18.25 18.59C20.36 19.33 22.61 19.77 24.96 19.86C25.53 19.87 26 20.35 26 20.92Z" fill="white"/>
              </svg>
              <span style={{ color: '#fff' }}>9871287990</span>
            </div>
            
            {/* LinkedIn */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="#0077B5"/>
              </svg>
              <a 
                href="https://www.linkedin.com/in/arsh-kalra-b813b928b/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#4A9EFF', textDecoration: 'none' }}
              >
                My LinkedIn
              </a>
            </div>
            
            {/* GitHub */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="white"/>
              </svg>
              <a 
                href="https://github.com/arshkalra17" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#4A9EFF', textDecoration: 'none' }}
              >
                My GitHub
              </a>
            </div>
          </div>
          
          <p style={{ 
            marginTop: '40px',
            fontSize: '0.9rem',
            color: '#888'
          }}>
  
          </p>
        </div>
      </footer>
    </div>
  );
}
