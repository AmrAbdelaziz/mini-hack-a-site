import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Mission {
  id: string
  title: string
  description: string
  path: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  locked: boolean
  hint: string
}

type MissionId = 'login-page' | 'bank-transfer' | 'classified-files' | 'ecommerce'

const initialMissions: Mission[] = [
  {
    id: 'login-page',
    title: 'Login Page',
    description: 'Find the hidden password in the source code.',
    path: '/mission/login-page',
    difficulty: 'Easy',
    locked: false,
    hint: 'Sometimes answers are hidden in plain sight.'
  },
  {
    id: 'bank-transfer',
    title: 'Bank Transfer Portal',
    description: 'Bypass the security check to access the transfer page.',
    path: '/mission/bank-transfer',
    difficulty: 'Medium',
    locked: true,
    hint: 'Check the network requests.'
  },
  {
    id: 'classified-files',
    title: 'Classified File Server',
    description: 'Access the hidden files by manipulating the URL.',
    path: '/mission/classified-files',
    difficulty: 'Hard',
    locked: true,
    hint: 'The path is not what it seems.'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Checkout',
    description: 'Find a way to get free items in the cart.',
    path: '/mission/ecommerce',
    difficulty: 'Medium',
    locked: true,
    hint: 'Look for client-side validation.'
  }
]

export default function MissionHub() {
  const navigate = useNavigate()
  const [missions, setMissions] = useState<Mission[]>(initialMissions)

  useEffect(() => {
    // Check for completed missions in localStorage
    const completedMissions: Record<MissionId, boolean> = {
      'login-page': localStorage.getItem('mission_completed_login') === 'true',
      'bank-transfer': localStorage.getItem('mission_completed_bank') === 'true',
      'classified-files': localStorage.getItem('mission_completed_files') === 'true',
      'ecommerce': localStorage.getItem('mission_completed_shop') === 'true'
    }

    // Update mission locked status
    setMissions((prevMissions: Mission[]) => 
      prevMissions.map((mission: Mission, index: number) => {
        // First mission is always unlocked
        if (index === 0) return mission
        
        // Unlock mission if previous mission is completed
        const previousMission = prevMissions[index - 1]
        const isUnlocked = completedMissions[previousMission.id as MissionId]
        
        return {
          ...mission,
          locked: !isUnlocked
        }
      })
    )
  }, [])

  return (
    <div className="min-h-screen p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 glitch-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mission Hub
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missions.map((mission: Mission, index: number) => (
          <motion.div
            key={mission.id}
            className="mission-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{mission.title}</h2>
              {mission.locked ? (
                <FaLock className="text-cyber-pink" />
              ) : (
                <FaLockOpen className="text-matrix" />
              )}
            </div>
            <p className="text-gray-400 mb-4">{mission.description}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${
                mission.difficulty === 'Easy' ? 'text-green-500' :
                mission.difficulty === 'Medium' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {mission.difficulty}
              </span>
              <button
                className={`hacker-button ${mission.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={mission.locked}
                onClick={() => {
                  if (!mission.locked) {
                    navigate(mission.path)
                  }
                }}
              >
                {mission.locked ? 'Locked' : 'Start Mission'}
              </button>
            </div>
            {!mission.locked && (
              <p className="text-sm text-cyber-blue mt-4">
                Hint: {mission.hint}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
} 