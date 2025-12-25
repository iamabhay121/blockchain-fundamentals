/**
 * Hedera Example 4: Send Tokens
 * 
 * This example demonstrates how to transfer HBAR and HTS tokens
 * between accounts on Hedera.
 */

const {
    Client,
    TransferTransaction,
    TokenId,
    Hbar
} = require("@hashgraph/sdk");
require("dotenv").config();

async function sendHbar(fromAccountId, fromPrivateKey, toAccountId, amount) {
    // Create client
    const client = Client.forTestnet();
    client.setOperator(fromAccountId, fromPrivateKey);
    
    console.log(`Sending ${amount} HBAR from ${fromAccountId} to ${toAccountId}...\n`);
    
    // Create transfer transaction
    const transaction = new TransferTransaction()
        .addHbarTransfer(fromAccountId, Hbar.from(amount).negated())
        .addHbarTransfer(toAccountId, Hbar.from(amount));
    
    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    console.log("✅ HBAR transfer successful!");
    console.log("Transaction ID:", receipt.transactionId.toString());
    console.log("Status:", receipt.status.toString());
    
    return receipt;
}

async function sendToken(fromAccountId, fromPrivateKey, toAccountId, tokenId, amount) {
    // Create client
    const client = Client.forTestnet();
    client.setOperator(fromAccountId, fromPrivateKey);
    
    console.log(`Sending ${amount} tokens (${tokenId}) from ${fromAccountId} to ${toAccountId}...\n`);
    
    // Create transfer transaction
    const transaction = new TransferTransaction()
        .addTokenTransfer(TokenId.fromString(tokenId), fromAccountId, -amount)
        .addTokenTransfer(TokenId.fromString(tokenId), toAccountId, amount);
    
    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    console.log("✅ Token transfer successful!");
    console.log("Transaction ID:", receipt.transactionId.toString());
    console.log("Status:", receipt.status.toString());
    
    return receipt;
}

// Example usage
async function main() {
    const fromAccountId = process.env.OPERATOR_ID;
    const fromPrivateKey = process.env.OPERATOR_KEY;
    const toAccountId = process.env.RECIPIENT_ACCOUNT_ID || "0.0.123456";
    const tokenId = process.env.TOKEN_ID || "0.0.123456";
    
    if (!fromAccountId || !fromPrivateKey) {
        throw new Error("OPERATOR_ID and OPERATOR_KEY must be set in .env");
    }
    
    try {
        // Send HBAR
        await sendHbar(fromAccountId, fromPrivateKey, toAccountId, 10);
        
        // Send tokens (uncomment to use)
        // await sendToken(fromAccountId, fromPrivateKey, toAccountId, tokenId, 100);
        
    } catch (error) {
        console.error("❌ Error:", error);
        throw error;
    }
}

// Run the example
if (require.main === module) {
    main()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            process.exit(1);
        });
}

module.exports = { sendHbar, sendToken };

