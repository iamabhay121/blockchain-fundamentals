/**
 * Ethereum Example 2: Query Balance
 * 
 * This example demonstrates how to query ETH and token balances
 * on Ethereum using ethers.js.
 */

const { ethers } = require('ethers');

// Using ethers.js with provider
async function getEthBalance(address, providerUrl) {
    // Create provider (can be Infura, Alchemy, or public RPC)
    const provider = new ethers.JsonRpcProvider(providerUrl || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY');
    
    // Get balance (returns BigNumber in wei)
    const balance = await provider.getBalance(address);
    
    // Convert to ETH
    const balanceInEth = ethers.formatEther(balance);
    
    console.log(`Balance of ${address}:`);
    console.log(`Wei: ${balance.toString()}`);
    console.log(`ETH: ${balanceInEth}`);
    
    return {
        wei: balance.toString(),
        eth: balanceInEth
    };
}

// Get ERC-20 token balance
async function getTokenBalance(tokenAddress, walletAddress, providerUrl) {
    // ERC-20 ABI (minimal - just balanceOf)
    const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)"
    ];
    
    const provider = new ethers.JsonRpcProvider(providerUrl || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY');
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    
    // Get token info
    const [balance, decimals, symbol] = await Promise.all([
        tokenContract.balanceOf(walletAddress),
        tokenContract.decimals(),
        tokenContract.symbol()
    ]);
    
    // Format balance with decimals
    const formattedBalance = ethers.formatUnits(balance, decimals);
    
    console.log(`Token Balance (${symbol}):`);
    console.log(`Raw: ${balance.toString()}`);
    console.log(`Formatted: ${formattedBalance} ${symbol}`);
    
    return {
        raw: balance.toString(),
        formatted: formattedBalance,
        symbol: symbol,
        decimals: decimals
    };
}

// Get multiple token balances
async function getMultipleTokenBalances(walletAddress, tokenAddresses, providerUrl) {
    const provider = new ethers.JsonRpcProvider(providerUrl || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY');
    const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)"
    ];
    
    const balances = await Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
            try {
                const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
                const [balance, decimals, symbol] = await Promise.all([
                    contract.balanceOf(walletAddress),
                    contract.decimals(),
                    contract.symbol()
                ]);
                
                return {
                    tokenAddress,
                    symbol,
                    balance: ethers.formatUnits(balance, decimals),
                    raw: balance.toString()
                };
            } catch (error) {
                return {
                    tokenAddress,
                    error: error.message
                };
            }
        })
    );
    
    return balances;
}

// Example usage
async function main() {
    const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'; // Example address
    const providerUrl = 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY';
    
    try {
        // Get ETH balance
        await getEthBalance(address, providerUrl);
        
        // Get token balance (example USDC on Sepolia)
        // const usdcAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        // await getTokenBalance(usdcAddress, address, providerUrl);
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    getEthBalance,
    getTokenBalance,
    getMultipleTokenBalances
};

