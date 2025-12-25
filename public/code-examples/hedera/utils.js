/**
 * Hedera Utility Functions
 * 
 * Common helper functions for Hedera development
 */

const {
    Client,
    AccountBalanceQuery,
    AccountId,
    TokenId,
    Hbar
} = require("@hashgraph/sdk");

/**
 * Initialize Hedera client for testnet
 */
function getTestnetClient(accountId, privateKey) {
    const client = Client.forTestnet();
    if (accountId && privateKey) {
        client.setOperator(accountId, privateKey);
    }
    return client;
}

/**
 * Initialize Hedera client for mainnet
 */
function getMainnetClient(accountId, privateKey) {
    const client = Client.forMainnet();
    if (accountId && privateKey) {
        client.setOperator(accountId, privateKey);
    }
    return client;
}

/**
 * Get account balance in HBAR
 */
async function getAccountBalance(client, accountId) {
    const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
    
    return {
        hbar: balance.hbars.toString(),
        hbarValue: balance.hbars.toTinybars().toString(),
        tokens: balance.tokens.toString()
    };
}

/**
 * Convert tinybars to HBAR
 */
function tinybarsToHbar(tinybars) {
    return Hbar.fromTinybars(tinybars);
}

/**
 * Convert HBAR to tinybars
 */
function hbarToTinybars(hbar) {
    return Hbar.from(hbar).toTinybars();
}

/**
 * Validate Hedera account ID format
 */
function isValidAccountId(accountId) {
    try {
        AccountId.fromString(accountId);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Validate Hedera token ID format
 */
function isValidTokenId(tokenId) {
    try {
        TokenId.fromString(tokenId);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Format account ID for display
 */
function formatAccountId(accountId) {
    return AccountId.fromString(accountId).toString();
}

module.exports = {
    getTestnetClient,
    getMainnetClient,
    getAccountBalance,
    tinybarsToHbar,
    hbarToTinybars,
    isValidAccountId,
    isValidTokenId,
    formatAccountId
};

