import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// --- FINAL BUILD FIX: Corrected the import paths for Web3Modal ---
import { createWeb3Modal, defaultEthersConfig, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5';

import { initFhevm, createInstance } from 'fhevmjs';

// All other imports and config are the same...
import { sepolia } from "@reown/appkit/networks"; // Note: This seems to be a leftover, but we'll leave it in case it's a peer dependency. The real sepolia object is in ethers or web3modal now.

const WALLETCONNECT_PROJECT_ID = 'd4df6eb029e14fa073ea8d7c57260b38'; 
const contractABI = [{"inputs":[{"internalType":"externalEuint32","name":"inputEuint32","type":"bytes32"},{"internalType":"bytes","name":"inputProof","type":"bytes"}],"name":"decrement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"euint32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"externalEuint32","name":"inputEuint32","type":"bytes32"},{"internalType":"bytes","name":"inputProof","type":"bytes"}],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractBytecode = '0x608060405234801561000f575f80fd5b5061018a6100ae604080516080810182525f80825260208201819052918101829052606081019190915250604080516080810182527350157cffd6bbfa2dece204a89ec419c23ef5755d815273cd3ab3bd6bcc0c0bf3e27912a92043e817b1cf696020820152731364cbbf2cdf5032c47d8226a6f6fbd2afcdacac9181019190915273901f8942346f7ab3a01f6d7613119bca447bb030606082015290565b80517fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea60080546001600160a01b03199081166001600160a01b039384161790915560208301517fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6018054831691841691909117905560408301517fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6028054831691841691909117905560608301517fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6038054909216921691909117905550565b7f5ea69329017273582817d320489fbd94f775580e90c092699ca6f3d12fdf7d0080546001600160a01b03191673a02cda4ca3a71d7c46997716f4283aa851c28812179055610737806101dc5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c80635941195d14610043578063a87d942c14610058578063e055f8f91461006c575b5f80fd5b6100566100513660046105f8565b61007f565b005b5f5460405190815260200160405180910390f35b61005661007a3660046105f8565b6100ec565b5f6100bf8484848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061013992505050565b90506100cc5f548261014d565b5f8190556100d99061017b565b506100e55f543361018a565b5050505050565b5f61012c8484848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061013992505050565b90506100cc5f548261019c565b5f610146838360046101ca565b9392505050565b5f8261015f5761015c5f6102ea565b92505b816101705761016d5f6102ea565b91505b61014683835f610302565b5f61018682306103fd565b5090565b5f61019583836103fd565b5090919050565b5f826101ae576101ab5f6102ea565b92505b816101bf576101bc5f6102ea565b91505b61014683835f610486565b7fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6015460405163196d0b9b60e01b81525f917fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea600916001600160a01b039091169063196d0b9b9061024390889033908990899060040161068d565b6020604051808303815f875af115801561025f573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061028391906106ff565b8154604051630f8e573b60e21b8152600481018390523360248201529193506001600160a01b031690633e395cec906044015f604051808303815f87803b1580156102cc575f80fd5b505af11580156102de573d5f803e3d5ffd5b50505050509392505050565b5f6102fc8263ffffffff16600461053b565b92915050565b5f8082156103155750600160f81b610318565b505f5b7fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6015460405163022f65e760e31b815260048101879052602481018690527fff00000000000000000000000000000000000000000000000000000000000000831660448201527fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea600916001600160a01b03169063117b2f38906064015b6020604051808303815f875af11580156103cf573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103f391906106ff565b9695505050505050565b5f7fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea6008054604051635ca4b5b160e11b8152600481018690526001600160a01b03858116602483015292935091169063b9496b62906044015f604051808303815f87803b15801561046b575f80fd5b505af115801561047d573d5f803e3d5ffd5b50505050505050565b5f8082156104995750600160f81b61049c565b505f5b7fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea601546040516303056db360e31b815260048101879052602481018690527fff00000000000000000000000000000000000000000000000000000000000000831660448201527fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea600916001600160a01b03169063182b6d98906064016103b3565b7fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea60154604051639cd07acb60e01b81525f917fed8d60e34876f751cc8b014c560745351147d9de11b9347c854e881b128ea600916001600160a01b0390911690639cd07acb906105b09087908790600401610716565b6020604051808303815f875af11580156105cc573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105f091906106ff565b949350505050565b5f805f6040848603121561060a575f80fd5b83359250602084013567ffffffffffffffff80821115610628575f80fd5b818601915086601f83011261063b575f80fd5b813581811115610649575f80fd5b87602082850101111561065a575f80fd5b6020830194508093505050509250925092565b6054811061068957634e487b7160e01b5f52602160045260245ffd5b9052565b8481525f60206001600160a01b03861660208401526080604084015284518060808501525f5b818110156106cf5786810183015185820160a0015282016106b3565b505f60a0828601015260a0601f19601f830116850101925050506106f6606083018461066d565b95945050505050565b5f6020828403121561070f575f80fd5b5051919050565b82815260408101610146602083018461066d56fea164736f6c6343000818000a';

// 2. Set up Web3Modal
const chains = [{
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}];

const ethersConfig = defaultEthersConfig({
  metadata: { name: "ZAMA FHE Contract Deployer", description: "Final dApp", url: window.location.href, icons: ["https://avatars.githubusercontent.com/u/37784886"] },
  defaultChainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
});

createWeb3Modal({
  ethersConfig,
  chains,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: false,
});


// 3. Main Application Component
export default function App() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  // Application-specific state
  const [deployedAddress, setDeployedAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [count, setCount] = useState(null);
  const [inputValue, setInputValue] = useState(1);
  const [status, setStatus] = useState('Connect wallet to begin.');
  const [isLoading, setIsLoading] = useState(false);
  const [fhevmInstance, setFhevmInstance] = useState(null);
  const [balance, setBalance] = useState('');

  // This effect initializes the FHEVM instance once a contract is deployed
  useEffect(() => {
    const initializeFhevm = async () => {
      if (deployedAddress && walletProvider) {
        setStatus('Initializing FHE instance...');
        try {
          const provider = new ethers.providers.Web3Provider(walletProvider);
          const fhenixPublicKey = await provider.call({ to: "0x0000000000000000000000000000000000000044" });
          
          await initFhevm();
          const instance = createInstance(deployedAddress, fhenixPublicKey, provider);
          setFhevmInstance(instance);

          setStatus('FHE instance ready. Fetching count...');
          const signer = provider.getSigner();
          const deployedContract = new ethers.Contract(deployedAddress, contractABI, signer);
          setContract(deployedContract);
          await updateCount(deployedContract, instance);
        } catch (e) {
          console.error("Error during FHEVM initialization:", e);
          setStatus('Error initializing FHE instance.');
        }
      }
    };
    initializeFhevm();
  }, [deployedAddress, walletProvider]);

  // This effect fetches wallet balance when connection status changes
  useEffect(() => {
    if (isConnected && walletProvider && address) {
      const fetchBalance = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(walletProvider);
          const balanceWei = await provider.getBalance(address);
          setBalance(parseFloat(ethers.utils.formatEther(balanceWei)).toFixed(4));
        } catch (error) {
          console.error("Balance fetch failed:", error);
          setBalance('N/A');
        }
      };
      fetchBalance();
    }
  }, [isConnected, walletProvider, address]);

  // Function to get and decrypt the current count
  const updateCount = async (contractToUpdate, instance) => {
    try {
      setStatus('Fetching encrypted count...');
      const encryptedCount = await contractToUpdate.getCount();
      setStatus('Decrypting count...');
      const decryptedCount = await instance.decrypt(deployedAddress, encryptedCount);
      setCount(decryptedCount);
      setStatus(`Count updated to: ${decryptedCount}`);
    } catch(e) {
      console.error("Could not update count:", e);
      setStatus("Error: Could not retrieve count.");
      setCount("N/A");
    }
  };

  // Function to handle contract deployment
  const handleDeploy = async () => {
    if (!walletProvider) {
      setStatus('Wallet not ready. Please reconnect.');
      return;
    }
    if (chainId !== sepolia.chainId) {
        setStatus('Error: Please switch to Sepolia Testnet in your wallet.');
        return;
    }
    setIsLoading(true);
    setStatus('Deploying contract... Please confirm in wallet.');
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
      const deployedContract = await factory.deploy();
      await deployedContract.deployTransaction.wait();
      setStatus('✅ Contract Deployed! Initializing FHE...');
      setDeployedAddress(deployedContract.address);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle increment/decrement transactions
  const handleTransaction = async (operation) => {
    if (!contract || !fhevmInstance) return setStatus('Contract or FHE instance not ready.');
    
    setIsLoading(true);
    setStatus(`Encrypting value ${inputValue}...`);
    try {
      const encryptedValue = await fhevmInstance.encrypt32(inputValue);
      setStatus(`Sending ${operation} transaction... Please confirm in wallet.`);
      const tx = await contract[operation](encryptedValue);
      setStatus('Mining transaction...');
      await tx.wait();
      setStatus('Transaction successful! Updating count...');
      await updateCount(contract, fhevmInstance);
    } catch(e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
    if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
      setStatus('❌ Transaction Rejected by User');
    } else {
      setStatus(`An unexpected error occurred.`);
    }
  };

  // Main UI Render
  return (
    <div className="container">
      <div className="header">
        <h1>ZAMA FHE Contract Deployer</h1>
        <w3m-button />
      </div>
      
      {!deployedAddress ? (
        <div className="deploy-view">
          <p>Launch your confidential smart contract on the Sepolia Testnet.</p>
          <button onClick={handleDeploy} disabled={!isConnected || isLoading}>
            {isLoading ? 'Deploying...' : 'Deploy Contract'}
          </button>
        </div>
      ) : (
        <div className="interact-view">
          <div className="count-display">
            Current Confidential Count: <span>{count === null ? 'Loading...' : count}</span>
          </div>
          <div className="interaction-box">
            <input 
              type="number" 
              value={inputValue} 
              onChange={(e) => setInputValue(parseInt(e.target.value, 10) || 0)}
              min="1"
            />
            <button onClick={() => handleTransaction('increment')} disabled={isLoading || count === null}>
              {isLoading ? '...' : 'Increment'}
            </button>
            <button onClick={() => handleTransaction('decrement')} disabled={isLoading || count === null}>
              {isLoading ? '...' : 'Decrement'}
            </button>
          </div>
        </div>
      )}
      
      <div className="status">{status}</div>

      {deployedAddress && (
        <div className="contractAddress">
          Deployed Contract: <a href={`https://sepolia.etherscan.io/address/${deployedAddress}`} target="_blank" rel="noopener noreferrer">{deployedAddress}</a>
        </div>
      )}

      <footer className="footer">
        <p>Created by <a href="https://x.com/0xKangLiu" target="_blank" rel="noopener noreferrer">Alan</a></p>
        <p className="disclaimer">This tool is an independent project and is not affiliated with the official Zama team.</p>
      </footer>
    </div>
  );
}
