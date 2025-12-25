/**
 * Hedera Example 3: Create Token
 * 
 * This example demonstrates how to create a fungible token
 * using Hedera Token Service (HTS).
 */

const {
    Client,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    PrivateKey
} = require("@hashgraph/sdk");
require("dotenv").config();

async function createToken() {
    // Get operator account ID and key from environment
    const operatorId = process.env.OPERATOR_ID;
    const operatorKey = process.env.OPERATOR_KEY;
    
    if (!operatorId || !operatorKey) {
        throw new Error("OPERATOR_ID and OPERATOR_KEY must be set in .env");
    }
    
    // Create client
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    console.log("Creating new fungible token...\n");
    
    // Token configuration
    const tokenName = "My Learning Token";
    const tokenSymbol = "MLT";
    const initialSupply = 1000000; // 1 million tokens
    const decimals = 2; // 2 decimal places
    
    // Create the token
    const transaction = new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(decimals)
        .setInitialSupply(initialSupply)
        .setTreasuryAccountId(operatorId)
        .setSupplyType(TokenSupplyType.Infinite); // Can mint more later
    
    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    const tokenId = receipt.tokenId;
    
    console.log("✅ Token created successfully!");
    console.log("Token ID:", tokenId.toString());
    console.log("Token Name:", tokenName);
    console.log("Token Symbol:", tokenSymbol);
    console.log("Initial Supply:", initialSupply);
    console.log("Decimals:", decimals);
    
    return {
        tokenId: tokenId.toString(),
        name: tokenName,
        symbol: tokenSymbol,
        supply: initialSupply
    };
}

// Run the example
if (require.main === module) {
    createToken()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            process.exit(1);
        });
}

module.exports = { createToken };

