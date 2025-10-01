import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TaskCreationPageSimple from './pages/TaskCreationPageSimple'
import TaskSettingsPage from './pages/TaskSettingsPage'
import MyTeamPage from './pages/MyTeamPage'
import SearchTasksPage from './pages/SearchTasksPage'
import ManageMyTasksPage from './pages/ManageMyTasksPage'
import MessagesPage from './pages/MessagesPage'
import TestPage from './pages/TestPage'
import { TaskProvider } from './contexts/TaskContext'
import { MessageProvider } from './contexts/MessageContext'

function App() {
  return (
    <TaskProvider>
      <MessageProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-task" element={<TaskCreationPageSimple />} />
            <Route path="/task-settings" element={<TaskSettingsPage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
            <Route path="/search-tasks" element={<SearchTasksPage />} />
            <Route path="/manage-tasks" element={<ManageMyTasksPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </MessageProvider>
    </TaskProvider>
  )
}

export default App
