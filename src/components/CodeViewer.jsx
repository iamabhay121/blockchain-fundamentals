import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './CodeViewer.css'

function CodeViewer({ content, language, filename }) {
  if (!content) {
    return (
      <div className="code-viewer empty">
        <div className="empty-state">
          <h2>No code to display</h2>
          <p>Select a code example from the sidebar.</p>
        </div>
      </div>
    )
  }

  // Detect language from filename if not provided
  let detectedLanguage = language
  if (!detectedLanguage && filename) {
    const ext = filename.split('.').pop()
    const langMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'sol': 'solidity',
      'py': 'python',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
    }
    detectedLanguage = langMap[ext] || ext || 'text'
  }

  return (
    <div className="code-viewer">
      {filename && (
        <div className="code-header">
          <span className="code-filename">{filename}</span>
          {detectedLanguage && (
            <span className="code-language">{detectedLanguage}</span>
          )}
        </div>
      )}
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={detectedLanguage || 'text'}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: filename ? '0 0 8px 8px' : '8px',
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeViewer

