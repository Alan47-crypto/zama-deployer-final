import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// RainbowKit and Wagmi Imports
import '@rainbow-me/rainbowkit/styles.css';
// --- CHANGE 1: Import darkTheme ---
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Configure chains and project ID
const config = getDefaultConfig({
  appName: 'ZAMA FHE Deployer',
  projectId: 'd4df6eb029e14fa073ea8d7c57260b38',
  chains: [sepolia],
});

const queryClient = new QueryClient();

// Render the app, wrapped in the necessary providers
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* --- CHANGE 2: Apply the custom Zama theme --- */}
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#FFDA63', // Zama yellow
          accentColorForeground: '#000000', // Black text on buttons
          borderRadius: 'small',
          fontStack: 'system-ui',
        })}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
