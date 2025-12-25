import { useState } from 'react'
import './Sidebar.css'

const DOCS = [
  { name: 'Blockchain Basics', path: '/docs/01-blockchain-basics.md', category: 'Foundations' },
  { name: 'Cryptography', path: '/docs/02-cryptography.md', category: 'Foundations' },
  { name: 'Consensus', path: '/docs/03-consensus.md', category: 'Foundations' },
  { name: 'Tokens', path: '/docs/04-tokens.md', category: 'Foundations' },
  { name: 'Wallets', path: '/docs/05-wallets.md', category: 'Foundations' },
  { name: 'Hedera', path: '/docs/06-hedera.md', category: 'Platforms' },
  { name: 'Ethereum', path: '/docs/07-ethereum.md', category: 'Platforms' },
  { name: 'Solidity', path: '/docs/08-solidity.md', category: 'Platforms' },
  { name: 'Nonce & Merkle Tree', path: '/docs/09-nonce-merkle-tree.md', category: 'Advanced' },
  { name: 'Glossary', path: '/docs/10-glossary.md', category: 'Reference' },
]

const CODE_EXAMPLES = {
  'Hedera': [
    { name: 'Generate Keys', path: '/code-examples/hedera/1-generate-keys.js', type: 'javascript' },
    { name: 'Create Account', path: '/code-examples/hedera/2-create-account.js', type: 'javascript' },
    { name: 'Create Token', path: '/code-examples/hedera/3-create-token.js', type: 'javascript' },
    { name: 'Send Tokens', path: '/code-examples/hedera/4-send-tokens.js', type: 'javascript' },
    { name: 'Utils', path: '/code-examples/hedera/utils.js', type: 'javascript' },
  ],
  'Ethereum': [
    { name: 'Connect MetaMask', path: '/code-examples/ethereum/1-connect-metamask.js', type: 'javascript' },
    { name: 'Query Balance', path: '/code-examples/ethereum/2-query-balance.js', type: 'javascript' },
    { name: 'Send Tokens', path: '/code-examples/ethereum/3-send-tokens.js', type: 'javascript' },
    { name: 'SimpleToken Contract', path: '/code-examples/ethereum/contracts/SimpleToken.sol', type: 'solidity' },
  ],
  'Solidity': [
    { name: 'Token', path: '/code-examples/solidity/Token.sol', type: 'solidity' },
    { name: 'HTS Integration', path: '/code-examples/solidity/HTS-Integration.sol', type: 'solidity' },
    { name: 'Merkle Proof', path: '/code-examples/solidity/MerkleProof.sol', type: 'solidity' },
    { name: 'Nonce Demo', path: '/code-examples/solidity/NonceDemo.sol', type: 'solidity' },
  ],
}

const RESOURCES = [
  { name: 'Tools', path: '/resources/tools.md' },
  { name: 'Hedera Links', path: '/resources/hedera-links.md' },
  { name: 'Ethereum Links', path: '/resources/ethereum-links.md' },
  { name: 'Faucets', path: '/resources/faucets.md' },
]

const OTHER_FILES = [
  { name: 'Learning Path', path: '/LEARNING_PATH.md', category: 'Reference' },
  { name: 'README', path: '/README.md', category: 'Reference' },
]

function Sidebar({ onSelectFile, selectedFile }) {
  const [isOpen, setIsOpen] = useState(true)

  const groupedDocs = {}
  DOCS.forEach(doc => {
    if (!groupedDocs[doc.category]) {
      groupedDocs[doc.category] = []
    }
    groupedDocs[doc.category].push(doc)
  })

  const handleFileSelect = (filePath) => {
    onSelectFile(filePath)
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="header-content">
          <img 
            src="/blockchainlogo.png" 
            alt="Blockchain Learning Logo" 
            className="logo"
          />
          <h2>Blockchain Fundamentals</h2>
        </div>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
      
      {isOpen && (
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3>Documentation</h3>
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <div key={category} className="nav-group">
                <div className="nav-group-title">{category}</div>
                {docs.map((doc) => (
                  <button
                    key={doc.path}
                    className={`nav-item ${selectedFile === doc.path ? 'active' : ''}`}
                    onClick={() => handleFileSelect(doc.path)}
                  >
                    {doc.name}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <h3>Code Examples</h3>
            {Object.entries(CODE_EXAMPLES).map(([platform, examples]) => (
              <div key={platform} className="nav-group">
                <div className="nav-group-title">{platform}</div>
                {examples.map((example) => (
                  <button
                    key={example.path}
                    className={`nav-item ${selectedFile === example.path ? 'active' : ''}`}
                    onClick={() => handleFileSelect(example.path)}
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <h3>Resources</h3>
            {RESOURCES.map((resource) => (
              <button
                key={resource.path}
                className={`nav-item ${selectedFile === resource.path ? 'active' : ''}`}
                onClick={() => handleFileSelect(resource.path)}
              >
                {resource.name}
              </button>
            ))}
          </div>

          <div className="nav-section">
            <h3>Other Files</h3>
            {OTHER_FILES.map((file) => (
              <button
                key={file.path}
                className={`nav-item ${selectedFile === file.path ? 'active' : ''}`}
                onClick={() => handleFileSelect(file.path)}
              >
                {file.name}
              </button>
            ))}
          </div>
        </nav>
      )}
      
      {isOpen && (
        <div className="sidebar-footer">
          <div className="author-info">
            <p className="author-name">Abhay Agarwal</p>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/iamabhayagarwal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/iamabhay121" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar

