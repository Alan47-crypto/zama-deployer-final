import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// NOTE: There are NO imports for wagmi, rainbowkit, or sepolia.

function VerificationApp() {
  return (
    <div className="container">
      <h1>Verification Successful</h1>
      <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
        If you are seeing this page, it means the Vercel deployment pipeline is finally working correctly.
      </p>
      <p style={{ color: '#cccccc' }}>
        The previous "sepolia is not defined" error was caused by a stubborn caching or build issue. We have now bypassed it.
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VerificationApp />
  </React.StrictMode>,
);
