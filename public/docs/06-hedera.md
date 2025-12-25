# Hedera Hashgraph

## Overview

Hedera is a public distributed ledger technology that uses hashgraph consensus instead of traditional blockchain.

## Key Features

### Hashgraph Consensus
- Asynchronous Byzantine Fault Tolerant (aBFT)
- Fast finality (3-5 seconds)
- Fair ordering of transactions
- Energy efficient

### Network Architecture
- **Mainnet**: Production network
- **Testnet**: Free testing environment
- **Previewnet**: Latest features

### Governance
- Council of 39 organizations
- Decentralized governance model
- Transparent decision-making

## Core Services

### Hedera Token Service (HTS)
- Native token creation
- Fungible and non-fungible tokens
- Low fees ($0.001 per transaction)
- Built-in compliance

### Smart Contracts
- Solidity support
- EVM compatibility
- Deploy and interact with contracts

### Consensus Service
- Timestamping
- File storage
- Scheduled transactions

### Cryptocurrency (HBAR)
- Native cryptocurrency
- Used for fees
- Staking rewards

## Account System

### Account Structure
- Account ID format: `0.0.123456`
- Shard.Realm.Account
- Human-readable format

### Account Creation
- Requires initial balance
- Can set custom keys
- Auto-renewal for accounts

## Transaction Fees

### Fee Structure
- Very low fees
- Predictable pricing
- No gas price volatility
- Examples:
  - Transfer HBAR: $0.0001
  - Create token: $1.00
  - Transfer token: $0.001

## Development Tools

### SDKs
- JavaScript/TypeScript: `@hashgraph/sdk`
- Java SDK
- Go SDK

### Explorers
- HashScan
- DragonGlass

### Wallets
- HashPack
- Blade Wallet
- Yamgo

## Getting Started

1. Create a Hedera account
2. Get testnet HBAR from faucet
3. Install `@hashgraph/sdk`
4. Start building!

See code examples in `code-examples/hedera/`

