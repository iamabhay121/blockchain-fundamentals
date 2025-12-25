/**
 * Hedera Example 1: Generate Key Pairs
 * 
 * This example demonstrates how to generate a new key pair
 * for use with Hedera accounts.
 */

const { PrivateKey } = require("@hashgraph/sdk");

async function generateKeys() {
    console.log("Generating new Hedera key pair...\n");
    
    // Generate a new private key
    const privateKey = PrivateKey.generateED25519();
    
    // Get the corresponding public key
    const publicKey = privateKey.publicKey;
    
    console.log("Private Key (keep this secret!):");
    console.log(privateKey.toString());
    console.log("\nPublic Key:");
    console.log(publicKey.toString());
    console.log("\nPrivate Key (raw bytes):");
    console.log(privateKey.toStringRaw());
    
    return {
        privateKey: privateKey.toString(),
        publicKey: publicKey.toString()
    };
}

// Run the example
if (require.main === module) {
    generateKeys()
        .then(() => {
            console.log("\n✅ Key generation complete!");
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Error:", error);
            process.exit(1);
        });
}

module.exports = { generateKeys };

