import React from 'react';

// --- We are adding back the AppKit imports and initialization ---
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia } from "@reown/appkit/networks";

const WALLETCONNECT_PROJECT_ID = 'd4df6eb029e14fa073ea8d7c57260b38';

// This is the first potential point of failure.
// It initializes the wallet connection library.
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: {
    name: "ZAMA FHE Contract Deployer",
    description: "Final dApp",
    url: window.location.href,
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  networks: [sepolia],
  projectId: WALLETCONNECT_PROJECT_ID,
});
// --- End of added code ---


function App() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      color: 'black', 
      padding: '50px', 
      fontSize: '24px', 
      textAlign: 'center',
      border: '2px solid black'
    }}>
      <h1>Debug Step 1: AppKit Initialization</h1>
      <p>If you can see this text, it means initializing the wallet library did NOT crash the app.</p>
      <p>This is a very good sign!</p>
    </div>
  );
}

export default App;
