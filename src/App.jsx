import React from 'react';

// We are keeping the AppKit initialization
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia } from "@reown/appkit/networks";
// --- STEP 2: ADDING BACK THE REACT HOOK ---
import { useAppKitAccount } from '@reown/appkit/react';


const WALLETCONNECT_PROJECT_ID = 'd4df6eb029e14fa073ea8d7c57260b38';

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


function App() {
  // --- Using the hook to get wallet state ---
  const { address, isConnected, chainId } = useAppKitAccount();

  // We are also logging it to the console for good measure
  console.log("AppKit Hook Status:", { isConnected, address, chainId });

  return (
    <div style={{ 
      backgroundColor: 'white', 
      color: 'black', 
      padding: '50px', 
      fontSize: '20px', 
      textAlign: 'center',
      border: '2px solid black',
      fontFamily: 'monospace'
    }}>
      <h1>Debug Step 2: Testing AppKit Hooks</h1>
      <p>This test checks if we can read data from the wallet library.</p>
      <hr />
      <p>Is Connected: <strong>{isConnected ? '✅ Yes' : '❌ No'}</strong></p>
      <p>Your Address: <strong>{address ? address : 'Not Connected'}</strong></p>
      <p>Chain ID: <strong>{chainId ? chainId : 'Not Connected'}</strong></p>
      <hr />
      <p>If you can see this, the AppKit hooks are working and not crashing the app!</p>
    </div>
  );
}

export default App;
