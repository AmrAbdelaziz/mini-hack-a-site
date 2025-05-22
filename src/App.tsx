import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MissionHub from './components/MissionHub'
import LoginPage from './missions/LoginPage'
import BankTransfer from './missions/BankTransfer'
import ClassifiedFiles from './missions/ClassifiedFiles'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-black">
        <nav className="border-b border-matrix p-4">
          <Link to="/" className="text-xl font-bold hover:text-cyber-blue transition-colors">
            Mini Hack-a-Site
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<MissionHub />} />
          <Route path="/mission/login-page" element={<LoginPage />} />
          <Route path="/mission/bank-transfer" element={<BankTransfer />} />
          <Route path="/mission/classified-files/*" element={<ClassifiedFiles />} />
        </Routes>
      </div>
    </Router>
  )
} 