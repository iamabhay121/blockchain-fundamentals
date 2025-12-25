# Ethereum

## Overview

Ethereum is a decentralized platform that enables smart contracts and decentralized applications (DApps).

## Key Features

### Smart Contracts
- Self-executing code
- Deployed on blockchain
- Immutable once deployed
- Written in Solidity, Vyper, etc.

### Ethereum Virtual Machine (EVM)
- Executes smart contracts
- Deterministic execution
- Gas-based computation model

### Decentralization
- Public blockchain
- Permissionless
- Thousands of nodes

## Network Types

### Mainnet
- Production network
- Real value
- Requires real ETH for gas

### Testnets
- **Sepolia**: Current recommended testnet
- **Goerli**: Being deprecated
- Free test ETH from faucets

### Local Development
- Hardhat Network
- Ganache
- Anvil (Foundry)

## Accounts

### Externally Owned Accounts (EOAs)
- Controlled by private keys
- Can send transactions
- No code storage

### Contract Accounts
- Controlled by code
- Can receive/send transactions
- Have code and storage

## Gas and Fees

### Gas
- Unit of computation
- Each operation costs gas
- Gas price × gas limit = fee

### EIP-1559
- Base fee + priority fee
- Predictable base fee
- Better UX

## Development Tools

### Libraries
- **ethers.js**: Modern, TypeScript-friendly
- **web3.js**: Original library
- **viem**: Type-safe, modern

### Frameworks
- **Hardhat**: Most popular
- **Foundry**: Fast, Rust-based
- **Truffle**: Older, still used

### IDEs
- Remix (browser-based)
- VS Code with extensions

## Getting Started

1. Install MetaMask
2. Get testnet ETH
3. Choose a framework (Hardhat recommended)
4. Write your first contract

See code examples in `code-examples/ethereum/`

