# 🚀 ZAMA FHE Contract Deployer & Interactor

A simple yet powerful one-click web tool to deploy and interact with a confidential FHE (Fully Homomorphic Encryption) counter smart contract on the Sepolia testnet, built with a modern tech stack.

![App Screenshot](https://i.imgur.com/eB3fT0g.png)

### ✨ Features

* **🌐 One-Click Deployment:** Connect your wallet and deploy a fresh `FHECounter` contract to the Sepolia testnet with a single button click.
* **🔐 Confidential Interactions:** Perform `increment` and `decrement` operations with encrypted values. The contract logic runs without ever decrypting the numbers on-chain, thanks to the power of Zama's FHEVM.
* **📟 Real-Time State:** After each transaction, the dApp automatically fetches the new encrypted count from the contract and decrypts it client-side for you to view.
* **🎨 Modern, Branded UI:** A clean, responsive user interface built with React, featuring a custom Zama-branded theme.
* **🦊 Seamless Wallet Connection:** Uses RainbowKit to provide a smooth, professional multi-wallet connection experience.

### 🛠️ Tech Stack

* **Frontend:** React (bootstrapped with Vite)
* **Wallet Connection:** RainbowKit, wagmi, viem
* **Blockchain Interaction:** ethers.js v5
* **Client-Side Encryption:** fhevmjs
* **Deployment:** Hosted live on Vercel

### 🤔 How It Works

This application provides a full lifecycle for your smart contract in two stages:

1.  **Deploy Stage:** First, you connect your wallet and ensure you are on the Sepolia network. Clicking "Deploy Contract" sends the transaction to create your own unique instance of the `FHECounter`.
2.  **Interact Stage:** Once the contract is deployed, the UI automatically updates to an interaction panel. Here you can input a number, click "Increment" or "Decrement", approve the transaction in your wallet, and watch the confidential count update in real-time.

### ▶️ Getting Started (Using the Live App)

1.  Visit the live site: [zama-deployer-final.vercel.app](https://zama-deployer-final.vercel.app/)
2.  Make sure your browser wallet (e.g., MetaMask) is connected to the **Sepolia Testnet**.
3.  Click **"Connect Wallet"** and approve the connection.
4.  Click **"Deploy Contract"** and approve the transaction.
5.  Once deployed, use the input field and buttons to interact with your new confidential contract!

### 💻 Local Development

To run this project on your own machine:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Alan47-crypto/zama-deployer-final.git](https://github.com/Alan47-crypto/zama-deployer-final.git)
    ```
2.  Navigate into the project directory:
    ```bash
    cd zama-deployer-final
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the local development server:
    ```bash
    npm run dev
    ```

### ⚖️ Disclaimer

This tool is an independent project created for demonstration and learning purposes. It is not affiliated with the official Zama team.

### 👨‍💻 Created By

This application was built by [Alan](https://x.com/0xKangLiu).
