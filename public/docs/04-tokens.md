# Tokens and Token Standards

## What are Tokens?

Tokens are digital assets that exist on a blockchain. They can represent:
- Currency
- Assets (real estate, art)
- Utility (access, voting rights)
- Securities (stocks, bonds)

## Token Types

### Fungible Tokens
- Interchangeable (1 token = 1 token)
- Examples: Currency, stablecoins
- Standards: ERC-20, HTS (Hedera Token Service)

### Non-Fungible Tokens (NFTs)
- Unique, not interchangeable
- Examples: Art, collectibles, game items
- Standards: ERC-721, ERC-1155

## Ethereum Token Standards

### ERC-20
- Fungible tokens
- Standard interface
- Functions: `transfer`, `approve`, `balanceOf`

### ERC-721
- Non-fungible tokens
- Each token is unique
- Metadata support

### ERC-1155
- Multi-token standard
- Can be fungible or non-fungible
- Batch operations

## Hedera Token Service (HTS)

### Features
- Native token service
- Low fees
- Fast transactions
- Built-in compliance features

### Token Types
- Fungible tokens
- Non-fungible tokens (NFTs)
- Custom token configurations

## Creating Tokens

### Ethereum (ERC-20)
```solidity
contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}
```

### Hedera
- Use TokenCreateTransaction
- Configure supply, decimals, admin keys
- Associate with accounts

## Token Operations

- **Mint**: Create new tokens
- **Burn**: Destroy tokens
- **Transfer**: Send tokens
- **Freeze**: Prevent transfers (Hedera)
- **Pause**: Temporarily halt operations

