# Cryptography in Blockchain

## Hash Functions

### Properties
- **Deterministic**: Same input always produces same output
- **One-way**: Cannot reverse the hash to get original input
- **Avalanche effect**: Small input change = completely different output
- **Fixed size**: Output is always the same length

### Common Hash Functions
- SHA-256 (Bitcoin)
- Keccak-256 (Ethereum)

## Public Key Cryptography

### Key Pairs
- **Private Key**: Secret, must be kept secure
- **Public Key**: Can be shared, derived from private key
- **Asymmetric**: Different keys for encryption/decryption

### Digital Signatures
1. Sign transaction with private key
2. Verify signature with public key
3. Proves authenticity and integrity

## Address Generation

### Process
1. Generate random private key
2. Derive public key from private key
3. Hash public key to create address

### Examples
- Bitcoin: Base58 encoding
- Ethereum: Last 20 bytes of Keccak-256 hash
- Hedera: Account ID format

## Security Best Practices

- Never share private keys
- Use hardware wallets for large amounts
- Verify addresses before sending
- Use secure random number generators

