/**
 * Ethereum Example 1: Connect to MetaMask
 * 
 * This example demonstrates how to connect to MetaMask
 * and get the user's account address.
 */

// For browser environment
async function connectMetaMask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask extension.');
    }
    
    console.log('Connecting to MetaMask...\n');
    
    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        const address = accounts[0];
        console.log('✅ Connected to MetaMask!');
        console.log('Account Address:', address);
        
        return address;
    } catch (error) {
        if (error.code === 4001) {
            throw new Error('User rejected the connection request.');
        }
        throw error;
    }
}

// Using ethers.js
async function connectMetaMaskWithEthers() {
    const { ethers } = require('ethers');
    
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed.');
    }
    
    // Create provider from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Request connection
    await provider.send("eth_requestAccounts", []);
    
    // Get signer
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    console.log('✅ Connected with ethers.js!');
    console.log('Account Address:', address);
    
    return { provider, signer, address };
}

// Listen for account changes
function setupAccountChangeListener(callback) {
    if (typeof window.ethereum === 'undefined') {
        return;
    }
    
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            console.log('MetaMask account disconnected');
        } else {
            console.log('Account changed:', accounts[0]);
        }
        if (callback) callback(accounts);
    });
    
    window.ethereum.on('chainChanged', (chainId) => {
        console.log('Network changed:', chainId);
        // Reload page to reset state
        window.location.reload();
    });
}

// Example usage in browser
if (typeof window !== 'undefined') {
    // Make functions available globally
    window.connectMetaMask = connectMetaMask;
    window.connectMetaMaskWithEthers = connectMetaMaskWithEthers;
    window.setupAccountChangeListener = setupAccountChangeListener;
}

// For Node.js environment (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        connectMetaMask,
        connectMetaMaskWithEthers,
        setupAccountChangeListener
    };
}

