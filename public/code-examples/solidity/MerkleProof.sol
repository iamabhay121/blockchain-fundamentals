// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * MerkleProof - Demonstrates Merkle tree verification
 * 
 * This contract shows how to verify Merkle proofs for:
 * - Airdrops
 * - Whitelists
 * - Data integrity verification
 */
contract MerkleProof {
    bytes32 public merkleRoot;
    
    // Track which addresses have already claimed
    mapping(address => bool) public claimed;
    
    event Claimed(address indexed account, uint256 amount);
    
    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }
    
    /**
     * Verify a Merkle proof
     * @param _leaf The leaf node (data being proven)
     * @param _proof Array of sibling hashes along the path to root
     * @param _root The Merkle root to verify against
     * @return valid Whether the proof is valid
     */
    function verify(
        bytes32 _leaf,
        bytes32[] memory _proof,
        bytes32 _root
    ) public pure returns (bool) {
        bytes32 computedHash = _leaf;
        
        for (uint256 i = 0; i < _proof.length; i++) {
            bytes32 proofElement = _proof[i];
            
            // Hash with sibling (order matters)
            if (computedHash < proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }
        
        return computedHash == _root;
    }
    
    /**
     * Claim tokens using Merkle proof
     * @param _amount Amount to claim
     * @param _proof Merkle proof
     */
    function claim(uint256 _amount, bytes32[] memory _proof) public {
        require(!claimed[msg.sender], "Already claimed");
        
        // Create leaf from address and amount
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));
        
        // Verify proof
        require(verify(leaf, _proof, merkleRoot), "Invalid Merkle proof");
        
        // Mark as claimed
        claimed[msg.sender] = true;
        
        emit Claimed(msg.sender, _amount);
    }
    
    /**
     * Update Merkle root (only owner - add access control in production)
     */
    function setMerkleRoot(bytes32 _newRoot) public {
        // Add onlyOwner modifier in production
        merkleRoot = _newRoot;
    }
}

/**
 * MerkleWhitelist - Use Merkle tree for whitelisting
 */
contract MerkleWhitelist {
    bytes32 public whitelistRoot;
    
    mapping(address => bool) public isWhitelisted;
    
    constructor(bytes32 _whitelistRoot) {
        whitelistRoot = _whitelistRoot;
    }
    
    /**
     * Check if address is whitelisted via Merkle proof
     */
    function checkWhitelist(
        address _address,
        bytes32[] memory _proof
    ) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_address));
        
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < _proof.length; i++) {
            bytes32 proofElement = _proof[i];
            if (computedHash < proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }
        
        return computedHash == whitelistRoot;
    }
    
    /**
     * Perform action if whitelisted
     */
    function performAction(bytes32[] memory _proof) public {
        require(checkWhitelist(msg.sender, _proof), "Not whitelisted");
        isWhitelisted[msg.sender] = true;
        // Perform your action here
    }
}

