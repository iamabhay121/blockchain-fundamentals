# Nonce and Merkle Trees

## Nonce

### What is a Nonce?

A nonce (number used once) is a value that can only be used once in a cryptographic operation.

### Uses in Blockchain

#### Transaction Nonce (Ethereum)
- Prevents replay attacks
- Ensures transaction ordering
- Must be sequential
- Example: First tx = nonce 0, second = nonce 1

#### Mining Nonce (Bitcoin)
- Random value miners try
- Combined with block data to find valid hash
- Proof of Work mechanism

#### Account Nonce (Ethereum)
- Tracks number of transactions sent
- Must match expected nonce
- Prevents double-spending

### Nonce Management

```javascript
// Get current nonce
const nonce = await provider.getTransactionCount(address);

// Send transaction with nonce
const tx = {
    to: recipient,
    value: ethers.utils.parseEther("1.0"),
    nonce: nonce
};
```

## Merkle Trees

### What is a Merkle Tree?

A Merkle tree is a binary tree where:
- Leaf nodes contain data hashes
- Parent nodes contain hash of children
- Root hash represents entire dataset

### Structure

```
        Root Hash
       /        \
    Hash1      Hash2
   /    \      /    \
  H1    H2    H3    H4
  |     |     |     |
Data1 Data2 Data3 Data4
```

### Properties

- **Efficient verification**: Prove data inclusion with minimal proof
- **Tamper detection**: Any change affects root hash
- **Scalability**: O(log n) proof size

### Use Cases

#### Blockchain
- Verify transaction inclusion
- Light clients (SPV)
- State roots

#### Ethereum
- Transaction Merkle root
- State Merkle root
- Receipt Merkle root

#### Hedera
- File storage verification
- Transaction proofs

### Merkle Proof

A Merkle proof contains:
- The data being proven
- Sibling hashes along path to root
- Root hash

### Example Implementation

```solidity
function verifyMerkleProof(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
) public pure returns (bool) {
    bytes32 computedHash = leaf;
    
    for (uint256 i = 0; i < proof.length; i++) {
        bytes32 proofElement = proof[i];
        
        if (computedHash < proofElement) {
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
        } else {
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
        }
    }
    
    return computedHash == root;
}
```

## Practical Applications

### Light Clients
- Download only block headers
- Request Merkle proofs for specific transactions
- Verify without full node

### Airdrops
- Efficient token distribution
- Merkle tree of eligible addresses
- Users submit proofs to claim

### State Verification
- Prove account balances
- Verify contract state
- Cross-chain bridges

## Security Considerations

- Nonce reuse can lead to replay attacks
- Merkle tree construction must be deterministic
- Always verify Merkle proofs before trusting data

