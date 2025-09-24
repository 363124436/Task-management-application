import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TaskCreationPageSimple from './pages/TaskCreationPageSimple'
import TaskSettingsPage from './pages/TaskSettingsPage'
import MyTeamPage from './pages/MyTeamPage'
import TestPage from './pages/TestPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<TaskCreationPageSimple />} />
        <Route path="/task-settings" element={<TaskSettingsPage />} />
        <Route path="/my-team" element={<MyTeamPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  )
}

export default App
