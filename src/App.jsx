import React from 'react';
// --- THIS IS THE CORRECTED IMPORT ---
import * as FHEVM from 'fhevmjs';

// We don't need the other imports for this test

// This is a minimal App component for our debug test
export default function App() {

  const handleDebugClick = () => {
    // The only purpose of this button is to log the imported library
    console.log('Inspecting the imported FHEVM module:', FHEVM);
    alert('Debug info logged to console. Please open it, expand the object, and take a screenshot.');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Debugging FHEVM Library</h1>
      <p>Click the button below to log the library's contents to the developer console.</p>
      <button onClick={handleDebugClick} style={{ fontSize: '18px', padding: '10px 20px' }}>
        Run Debug Test
      </button>
    </div>
  );
}
