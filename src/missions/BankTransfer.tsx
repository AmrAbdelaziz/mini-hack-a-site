import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function BankTransfer() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [token, setToken] = useState('')

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate a network request
    try {
      // Log the request details to console for educational purposes
      console.log('Making transfer request with headers:', {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer secret_token_123'
      })
      
      // Simulate a successful response
      setShowTokenInput(true)
      setError('Transfer requires authorization. Did you find the token in the network request?')
      
    } catch (err) {
      setError('Transfer failed. Check the network tab for details.')
    }
  }

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (token === 'secret_token_123') {
      setSuccess(true)
      setError('')
      // Store completion in localStorage
      localStorage.setItem('mission_completed_bank', 'true')
    } else {
      setError('Invalid token. Look for it in the network request headers.')
    }
  }

  if (success) {
    return (
      <motion.div 
        className="terminal p-8 max-w-md mx-auto mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-cyber-blue">Transfer Successful!</h2>
        <p className="mb-4">FLAG{`{NetworkRequestsAreKey}`}</p>
        <p className="text-sm text-gray-400">
          You found and used the secret token from the network request! This demonstrates how sensitive
          information can be exposed in HTTP headers and how attackers can intercept and use these tokens.
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
      <h2 className="text-2xl font-bold mb-6">Bank Transfer Portal</h2>
      <form onSubmit={handleTransfer}>
        <div className="mb-4">
          <label className="block text-sm mb-2">Recipient Account</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-cyber-black border border-matrix p-2 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-cyber-black border border-matrix p-2 rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="hacker-button w-full"
        >
          Transfer
        </button>
      </form>

      {showTokenInput && (
        <motion.form 
          onSubmit={handleTokenSubmit}
          className="mt-6 pt-6 border-t border-matrix"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4">
            <label className="block text-sm mb-2">Enter Authorization Token</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-cyber-black border border-matrix p-2 rounded"
              placeholder="Enter the token you found in the network request"
              required
            />
          </div>
          <button
            type="submit"
            className="hacker-button w-full"
          >
            Authorize Transfer
          </button>
        </motion.form>
      )}

      <p className="text-sm text-gray-400 mt-4">
        Hint: Check the console log for the request headers...
      </p>
    </motion.div>
  )
} 