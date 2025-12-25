import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MarkdownViewer from './components/MarkdownViewer'
import CodeViewer from './components/CodeViewer'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileType, setFileType] = useState('markdown') // 'markdown' or 'code'

  useEffect(() => {
    if (selectedFile) {
      // Determine file type from extension
      const isCodeFile = /\.(js|jsx|ts|tsx|sol|py|java|go|rs|css|html|json)$/i.test(selectedFile)
      setFileType(isCodeFile ? 'code' : 'markdown')
      loadFile(selectedFile)
    }
  }, [selectedFile])

  const loadFile = async (filePath) => {
    setLoading(true)
    try {
      const response = await fetch(filePath)
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to load file: ${response.status} ${response.statusText}\n${errorText}`)
      }
      const text = await response.text()
      // Check if we got HTML instead of content (SPA fallback issue)
      if (text.trim().startsWith('<!doctype html>') || text.trim().startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML instead of file content. The file server may not be configured correctly.')
      }
      setContent(text)
    } catch (error) {
      console.error('Error loading file:', error)
      setContent(`# Error\n\nFailed to load: ${filePath}\n\n**Error:** ${error.message}\n\nPlease make sure the dev server is running and the file path is correct.`)
      setFileType('markdown') // Show error as markdown
    } finally {
      setLoading(false)
    }
  }

  const getFilename = () => {
    if (!selectedFile) return null
    return selectedFile.split('/').pop()
  }

  const getLanguage = () => {
    const filename = getFilename()
    if (!filename) return null
    const ext = filename.split('.').pop()
    if (ext === 'sol') return 'solidity'
    if (ext === 'js' || ext === 'jsx') return 'javascript'
    if (ext === 'ts' || ext === 'tsx') return 'typescript'
    return ext
  }

  return (
    <div className="app">
      <Sidebar onSelectFile={setSelectedFile} selectedFile={selectedFile} />
      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : fileType === 'code' ? (
          <CodeViewer content={content} language={getLanguage()} filename={getFilename()} />
        ) : (
          <MarkdownViewer content={content} />
        )}
      </main>
    </div>
  )
}

export default App
