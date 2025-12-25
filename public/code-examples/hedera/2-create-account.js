/**
 * Hedera Example 2: Create Account
 * 
 * This example demonstrates how to create a new Hedera account
 * using the Hedera SDK.
 */

const {
    Client,
    AccountCreateTransaction,
    PrivateKey,
    Hbar
} = require("@hashgraph/sdk");
require("dotenv").config();

async function createAccount() {
    // Get operator account ID and key from environment
    const operatorId = process.env.OPERATOR_ID;
    const operatorKey = process.env.OPERATOR_KEY;
    
    if (!operatorId || !operatorKey) {
        throw new Error("OPERATOR_ID and OPERATOR_KEY must be set in .env");
    }
    
    // Create client
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    console.log("Creating new Hedera account...\n");
    
    // Generate a new key pair for the account
    const newPrivateKey = PrivateKey.generateED25519();
    const newPublicKey = newPrivateKey.publicKey;
    
    console.log("New Account Public Key:", newPublicKey.toString());
    
    // Create the account
    const transaction = new AccountCreateTransaction()
        .setKey(newPublicKey)
        .setInitialBalance(Hbar.from(1000)); // Initial balance in tinybars
    
    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);
    
    const newAccountId = receipt.accountId;
    
    console.log("\n✅ Account created successfully!");
    console.log("Account ID:", newAccountId.toString());
    console.log("\n⚠️  IMPORTANT: Save these credentials securely:");
    console.log("Private Key:", newPrivateKey.toString());
    console.log("Account ID:", newAccountId.toString());
    
    return {
        accountId: newAccountId.toString(),
        privateKey: newPrivateKey.toString(),
        publicKey: newPublicKey.toString()
    };
}

// Run the example
if (require.main === module) {
    createAccount()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            process.exit(1);
        });
}

module.exports = { createAccount };

