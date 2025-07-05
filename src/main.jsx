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

const config = getDefaultConfig({
  appName: 'ZAMA FHE Deployer',
  projectId: 'd4df6eb029e14fa073ea8d7c57260b38',
  chains: [sepolia],
});

const queryClient = new QueryClient();

// --- CHANGE 2: Create a custom Zama dark theme ---
const zamaTheme = darkTheme({
    accentColor: '#FFDA63', // Zama yellow for highlights
    accentColorForeground: '#000000', // Black text on yellow elements
    borderRadius: 'medium',
    fontStack: 'system-ui',
    overlayBlur: 'small',
});
// Override specific colors to better match our UI
zamaTheme.colors.connectButtonBackground = '#000000';
zamaTheme.colors.modalBackground = 'rgba(0, 0, 0, 0.85)';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* --- CHANGE 3: Apply the custom theme --- */}
        <RainbowKitProvider theme={zamaTheme}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
