# Solidity

## Overview

Solidity is an object-oriented programming language for writing smart contracts on Ethereum and other EVM-compatible blockchains.

## Basic Syntax

### Contract Structure
```solidity
pragma solidity ^0.8.0;

contract MyContract {
    // State variables
    uint256 public value;
    
    // Functions
    function setValue(uint256 _value) public {
        value = _value;
    }
}
```

## Data Types

### Value Types
- `uint256`, `int256`: Integers
- `bool`: Boolean
- `address`: Ethereum address
- `bytes32`: Fixed-size byte array

### Reference Types
- `string`: Dynamic string
- `array`: Fixed or dynamic
- `mapping`: Key-value store
- `struct`: Custom data structure

## Visibility Modifiers

- `public`: Accessible everywhere
- `private`: Only within contract
- `internal`: Contract and inheritors
- `external`: Only from outside

## Function Modifiers

- `view`: Reads state, no modification
- `pure`: No state access
- `payable`: Can receive ETH

## Common Patterns

### Ownable Pattern
```solidity
address public owner;

modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

### Reentrancy Guard
```solidity
bool private locked;

modifier nonReentrant() {
    require(!locked, "Reentrant call");
    locked = true;
    _;
    locked = false;
}
```

## Security Best Practices

1. Use `require()` for input validation
2. Check-effects-interactions pattern
3. Use SafeMath (or Solidity 0.8+)
4. Avoid external calls in loops
5. Use events for important state changes

## Events

```solidity
event ValueSet(uint256 newValue);

function setValue(uint256 _value) public {
    value = _value;
    emit ValueSet(_value);
}
```

## Inheritance

```solidity
contract Base {
    function baseFunction() public virtual {}
}

contract Derived is Base {
    function baseFunction() public override {}
}
```

## Interfaces

```solidity
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}
```

## Common Standards

- **ERC-20**: Fungible tokens
- **ERC-721**: NFTs
- **ERC-1155**: Multi-token standard

See examples in `code-examples/solidity/`

