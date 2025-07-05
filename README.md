# 🚀 ZAMA FHE Contract Deployer

A simple and beautifully designed one-click web tool to deploy a confidential FHE (Fully Homomorphic Encryption) counter smart contract to the Sepolia testnet.

![App Screenshot](https://i.imgur.com/3nBZmC0.png)
### ✨ Features

* **🚀 One-Click Deployment:** Connect your wallet and deploy a fresh `FHECounter` contract to the Sepolia testnet with a single button click.
* **🎨 Modern, Branded UI:** A clean, responsive user interface built with React, featuring a custom Zama-branded theme.
* **🦊 Seamless Wallet Connection:** Uses the industry-standard RainbowKit library to provide a smooth, professional multi-wallet connection experience.
* **✅ Instant Feedback:** The UI provides clear status updates during the deployment process and displays the final contract address upon success.

### 🛠️ Tech Stack

* **Frontend:** React (bootstrapped with Vite)
* **Wallet Connection:** RainbowKit, wagmi, viem
* **Blockchain Interaction:** ethers.js v5
* **Deployment:** Hosted live on Vercel

### 🤔 How It Works

This tool simplifies the process of deploying the `FHECounter` smart contract. A user can visit the web page, connect their wallet, and ensure they are on the Sepolia network. Clicking a single "Deploy Contract" button will send the transaction to the blockchain. The tool then provides the address of the newly deployed contract, which can be viewed on a block explorer.

### ▶️ Getting Started

1.  Visit the live site for the application.
2.  Make sure your browser wallet (e.g., MetaMask) is connected to the **Sepolia Testnet**.
3.  Click the connect button in the top-right corner and approve the connection in your wallet.
4.  Click **"Deploy Contract"** and approve the transaction in your wallet.
5.  Once successful, copy your new contract address from the bottom of the tool!

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
