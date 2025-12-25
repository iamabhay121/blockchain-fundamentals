// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * NonceDemo - Demonstrates nonce usage in smart contracts
 * 
 * This contract shows how nonces can be used to:
 * - Prevent replay attacks
 * - Ensure transaction ordering
 * - Implement one-time operations
 */
contract NonceDemo {
    // Track nonces for each address
    mapping(address => uint256) public nonces;
    
    // Track used nonces to prevent replay
    mapping(address => mapping(uint256 => bool)) public usedNonces;
    
    event NonceUsed(address indexed user, uint256 nonce);
    event ActionPerformed(address indexed user, uint256 nonce, string action);
    
    /**
     * Execute an action with a specific nonce
     * The nonce must be exactly one more than the last used nonce
     */
    function executeWithNonce(uint256 _nonce, string memory _action) public {
        address user = msg.sender;
        
        // Check that nonce is sequential
        require(_nonce == nonces[user] + 1, "Invalid nonce - must be sequential");
        
        // Check that nonce hasn't been used before
        require(!usedNonces[user][_nonce], "Nonce already used");
        
        // Mark nonce as used
        usedNonces[user][_nonce] = true;
        nonces[user] = _nonce;
        
        emit NonceUsed(user, _nonce);
        emit ActionPerformed(user, _nonce, _action);
    }
    
    /**
     * Get the next expected nonce for an address
     */
    function getNextNonce(address _user) public view returns (uint256) {
        return nonces[_user] + 1;
    }
    
    /**
     * Check if a nonce has been used
     */
    function isNonceUsed(address _user, uint256 _nonce) public view returns (bool) {
        return usedNonces[_user][_nonce];
    }
    
    /**
     * Reset nonce (for testing purposes - remove in production)
     */
    function resetNonce() public {
        nonces[msg.sender] = 0;
    }
}

/**
 * NonceDemoAdvanced - Advanced nonce patterns
 */
contract NonceDemoAdvanced {
    // Allow out-of-order nonces (up to a window)
    mapping(address => uint256) public lastNonce;
    uint256 public constant NONCE_WINDOW = 100;
    
    event ActionWithNonce(address indexed user, uint256 nonce);
    
    /**
     * Execute with nonce within a window
     * Allows nonces that are within NONCE_WINDOW of the last nonce
     */
    function executeWithNonceWindow(uint256 _nonce) public {
        address user = msg.sender;
        uint256 last = lastNonce[user];
        
        // Nonce must be greater than last used
        require(_nonce > last, "Nonce must be greater than last used");
        
        // Nonce must be within window
        require(_nonce <= last + NONCE_WINDOW, "Nonce outside allowed window");
        
        lastNonce[user] = _nonce;
        emit ActionWithNonce(user, _nonce);
    }
}

