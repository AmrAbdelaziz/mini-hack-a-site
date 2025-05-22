import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Hidden password in the source code
const HIDDEN_PASSWORD = 'admin123' // This will be visible in the source code

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple password check
    if (password === HIDDEN_PASSWORD) {
      setSuccess(true)
      setError('')
      // Store completion in localStorage
      localStorage.setItem('mission_completed_login', 'true')
    } else {
      setError('Invalid credentials')
    }
  }

  if (success) {
    return (
      <motion.div 
        className="terminal p-8 max-w-md mx-auto mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-cyber-blue">Access Granted!</h2>
        <p className="mb-4">FLAG{`{SourceCodeIsYourFriend}`}</p>
        <p className="text-sm text-gray-400">
          You found the hidden password in the source code! This is a common security vulnerability
          where sensitive information is stored in client-side code.
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
      <h2 className="text-2xl font-bold mb-6">Secure Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-cyber-black border border-matrix p-2 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-cyber-black border border-matrix p-2 rounded"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="hacker-button w-full"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4">
        Hint: The password is hidden somewhere in the source code...
      </p>
    </motion.div>
  )
} 