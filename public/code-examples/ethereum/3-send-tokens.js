/**
 * Ethereum Example 3: Send Tokens
 * 
 * This example demonstrates how to send ETH and ERC-20 tokens
 * on Ethereum using ethers.js.
 */

const { ethers } = require('ethers');

// Send ETH
async function sendEth(senderPrivateKey, recipientAddress, amountInEth, providerUrl) {
    const provider = new ethers.JsonRpcProvider(providerUrl || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY');
    const wallet = new ethers.Wallet(senderPrivateKey, provider);
    
    console.log(`Sending ${amountInEth} ETH from ${wallet.address} to ${recipientAddress}...\n`);
    
    // Convert ETH to wei
    const amount = ethers.parseEther(amountInEth);
    
    // Get current gas price
    const feeData = await provider.getFeeData();
    
    // Create transaction
    const tx = {
        to: recipientAddress,
        value: amount,
        gasLimit: 21000, // Standard ETH transfer
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    };
    
    // Send transaction
    const transaction = await wallet.sendTransaction(tx);
    console.log('Transaction sent:', transaction.hash);
    
    // Wait for confirmation
    const receipt = await transaction.wait();
    console.log('✅ Transaction confirmed!');
    console.log('Block number:', receipt.blockNumber);
    console.log('Gas used:', receipt.gasUsed.toString());
    
    return receipt;
}

// Send ERC-20 tokens
async function sendToken(senderPrivateKey, tokenAddress, recipientAddress, amount, providerUrl) {
    const provider = new ethers.JsonRpcProvider(providerUrl || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY');
    const wallet = new ethers.Wallet(senderPrivateKey, provider);
    
    // ERC-20 ABI (minimal - just transfer)
    const erc20Abi = [
        "function transfer(address to, uint256 amount) returns (bool)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function balanceOf(address owner) view returns (uint256)"
    ];
    
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet);
    
    // Get token decimals and symbol
    const [decimals, symbol] = await Promise.all([
        tokenContract.decimals(),
        tokenContract.symbol()
    ]);
    
    console.log(`Sending ${amount} ${symbol} from ${wallet.address} to ${recipientAddress}...\n`);
    
    // Convert amount to token units
    const amountInUnits = ethers.parseUnits(amount.toString(), decimals);
    
    // Check balance
    const balance = await tokenContract.balanceOf(wallet.address);
    if (balance < amountInUnits) {
        throw new Error(`Insufficient balance. Have ${ethers.formatUnits(balance, decimals)} ${symbol}, need ${amount} ${symbol}`);
    }
    
    // Send transaction
    const transaction = await tokenContract.transfer(recipientAddress, amountInUnits);
    console.log('Transaction sent:', transaction.hash);
    
    // Wait for confirmation
    const receipt = await transaction.wait();
    console.log('✅ Token transfer confirmed!');
    console.log('Block number:', receipt.blockNumber);
    console.log('Gas used:', receipt.gasUsed.toString());
    
    return receipt;
}

// Send ETH with MetaMask (browser)
async function sendEthWithMetaMask(recipientAddress, amountInEth) {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const amount = ethers.parseEther(amountInEth);
    
    const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amount
    });
    
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('✅ Transaction confirmed!');
    
    return receipt;
}

// Example usage
async function main() {
    // WARNING: Never commit private keys to version control!
    const senderPrivateKey = process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY_HERE';
    const recipientAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    const providerUrl = 'https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY';
    
    try {
        // Send ETH
        // await sendEth(senderPrivateKey, recipientAddress, '0.001', providerUrl);
        
        // Send tokens (example)
        // const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
        // await sendToken(senderPrivateKey, tokenAddress, recipientAddress, '100', providerUrl);
        
        console.log('Uncomment the lines above to send transactions');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    sendEth,
    sendToken,
    sendEthWithMetaMask
};

