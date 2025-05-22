import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface File {
  id: string
  name: string
  path: string
  content: string
  isPublic: boolean
}

const files: File[] = [
  {
    id: '1',
    name: 'public.txt',
    path: '/files/public.txt',
    content: 'This is a public file. Nothing interesting here.',
    isPublic: true
  },
  {
    id: '2',
    name: 'internal.txt',
    path: '/files/internal.txt',
    content: 'Internal document. Still not what you\'re looking for.',
    isPublic: true
  },
  {
    id: '3',
    name: 'secret.txt',
    path: '/files/secret.txt',
    content: 'FLAG{PathTraversalIsDangerous}',
    isPublic: false
  }
]

export default function ClassifiedFiles() {
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if we have a file path in the URL
    const path = location.pathname.split('/mission/classified-files')[1] || '/files/public.txt'
    
    // Simulate path traversal vulnerability
    const filePath = path.startsWith('/files/') ? path : '/files/public.txt'
    const file = files.find(f => f.path === filePath)
    
    if (file) {
      setCurrentFile(file)
      if (file.name === 'secret.txt') {
        setSuccess(true)
        localStorage.setItem('mission_completed_files', 'true')
      }
    } else {
      setError('File not found')
    }
  }, [location])

  if (success) {
    return (
      <motion.div 
        className="terminal p-8 max-w-md mx-auto mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-cyber-blue">Access Granted!</h2>
        <p className="mb-4">FLAG{`{PathTraversalIsDangerous}`}</p>
        <p className="text-sm text-gray-400">
          You found the secret file by manipulating the URL! This demonstrates a path traversal
          vulnerability, where attackers can access files outside the intended directory.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="terminal p-8 max-w-md mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6">Classified File Server</h2>
      
      <div className="mb-6">
        <h3 className="text-lg mb-2">Available Files:</h3>
        <ul className="space-y-2">
          {files.filter(file => file.isPublic).map(file => (
            <li key={file.id} className="flex items-center space-x-2">
              <span className="text-cyber-blue">→</span>
              <a 
                href={`/mission/classified-files${file.path}`}
                className="text-matrix hover:text-cyber-blue transition-colors"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {currentFile && (
        <div className="mt-6 pt-6 border-t border-matrix">
          <h3 className="text-lg mb-2">File Content:</h3>
          <pre className="bg-cyber-black p-4 rounded text-sm">
            {currentFile.content}
          </pre>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      <p className="text-sm text-gray-400 mt-4">
        Hint: Try accessing files that aren't in the list...
      </p>
    </motion.div>
  )
} 