import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Users, Edit3, Clock, Tag, Hash, Save } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import { useMessages } from '../contexts/MessageContext'
import DateTimePicker from '../components/DateTimePicker'

const TaskSettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { addTask, updateTask, editingTask, clearEditingTask } = useTasks()
  const { addMessage } = useMessages()
  
  // Get uploaded files from location state
  const uploadedFiles = location.state?.uploadedFiles || []
  
  // State for task details
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [maxMembers, setMaxMembers] = useState(5)
  
  // State for permissions
  const [viewPermissions, setViewPermissions] = useState<string[]>([])
  const [editPermissions, setEditPermissions] = useState<string[]>([])
  
  // State for time settings
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [duration, setDuration] = useState('')
  
  // State for keywords and tags
  const [keywords, setKeywords] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newKeyword, setNewKeyword] = useState('')
  const [newTag, setNewTag] = useState('')

  // Mock users for permission selection
  const availableUsers = [
    { id: '1', name: 'Cristiano', email: 'cristiano@example.com' },
    { id: '2', name: 'Jenny Foster', email: 'jenny.foster@example.com' },
    { id: '3', name: 'Benjamin Will', email: 'benjamin.will@example.com' },
    { id: '4', name: 'Olivier Solin', email: 'olivier.solin@example.com' },
    { id: '5', name: 'Osman Brandon', email: 'osman.brandon@example.com' },
  ]

  // Initialize form with editing task data if available
  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name)
      setTaskDescription(editingTask.description)
      setMaxMembers(editingTask.maxMembers)
      setViewPermissions(editingTask.permissions.view)
      setEditPermissions(editingTask.permissions.edit)
      setStartDateTime(editingTask.startDateTime || '')
      setEndDateTime(editingTask.endDateTime || '')
      setDuration(editingTask.duration)
      setKeywords(editingTask.keywords)
      setTags(editingTask.tags)
    }
  }, [editingTask])

  const handleBack = () => {
    clearEditingTask()
    if (editingTask) {
      navigate('/manage-tasks')
    } else {
      navigate('/create-task')
    }
  }

  const toggleViewPermission = (userId: string) => {
    setViewPermissions(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const toggleEditPermission = (userId: string) => {
    setEditPermissions(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()])
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag))
  }

  const handleSubmit = () => {
    if (!taskName.trim()) {
      alert('Please enter a task name.')
      return
    }
    
    if (!taskDescription.trim()) {
      alert('Please enter a task description.')
      return
    }

    if (editingTask) {
      // Update existing task
      const updatedTask = {
        name: taskName,
        description: taskDescription,
        files: editingTask.files,
        maxMembers,
        duration: duration || '2 weeks',
        keywords,
        tags,
        status: editingTask.status,
        startDateTime,
        endDateTime,
        permissions: {
          view: viewPermissions,
          edit: editPermissions
        },
        comments: editingTask.comments || []
      }

      updateTask(editingTask.id, updatedTask)
      clearEditingTask()
      
      // Add system notification
      addMessage({
        type: 'system',
        sender: 'System',
        content: 'You have successfully edited a project'
      })
      
      alert('Task updated successfully!')
      navigate('/manage-tasks')
    } else {
      // Create new task
      const fileNames = uploadedFiles.map((file: File) => file.name)
      const newTask = {
        name: taskName,
        description: taskDescription,
        files: fileNames,
        maxMembers,
        duration: duration || '2 weeks',
        keywords,
        tags,
        status: 'active' as const,
        startDateTime,
        endDateTime,
        permissions: {
          view: viewPermissions,
          edit: editPermissions
        },
        comments: []
      }

      addTask(newTask)
      
      // Add system notification
      addMessage({
        type: 'system',
        sender: 'System',
        content: 'You have successfully created a project'
      })
      
      alert('Task created successfully!')
      navigate('/manage-tasks')
    }
  }

  const calculateDuration = () => {
    if (startDateTime && endDateTime) {
      const start = new Date(startDateTime)
      const end = new Date(endDateTime)
      const diffMs = end.getTime() - start.getTime()
      
      if (diffMs > 0) {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        
        if (diffDays > 0) {
          setDuration(`${diffDays}d ${diffHours}h ${diffMinutes}m`)
        } else if (diffHours > 0) {
          setDuration(`${diffHours}h ${diffMinutes}m`)
        } else {
          setDuration(`${diffMinutes}m`)
        }
      } else {
        setDuration('Invalid time range')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" lang="en">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Previous Page
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Edit3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Task Settings</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Edit3 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {editingTask ? 'Edit Task Settings' : 'Configure Task Settings'}
            </h2>
            <p className="text-gray-600">
              {editingTask ? 'Update permissions, timing, and metadata for your task' : 'Set permissions, timing, and metadata for your task'}
            </p>
          </div>

          {/* Task Basic Information */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Name *</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                <input
                  type="number"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Description *</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Describe the task details..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Permissions */}
            <div className="space-y-6">
              {/* View Permissions */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">View Permissions</h3>
                </div>
                <p className="text-gray-600 mb-4">Select users who can view this task</p>
                <div className="space-y-3">
                  {availableUsers.map(user => (
                    <label key={user.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={viewPermissions.includes(user.id)}
                        onChange={() => toggleViewPermission(user.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Edit Permissions */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Edit3 className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Edit Permissions</h3>
                </div>
                <p className="text-gray-600 mb-4">Select users who can edit this task</p>
                <div className="space-y-3">
                  {availableUsers.map(user => (
                    <label key={user.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editPermissions.includes(user.id)}
                        onChange={() => toggleEditPermission(user.id)}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Time & Metadata */}
            <div className="space-y-6">
              {/* Time Settings */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Time Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
                    <DateTimePicker
                      value={startDateTime}
                      onChange={(value) => {
                        setStartDateTime(value)
                        calculateDuration()
                      }}
                      placeholder="Select start date and time"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                    <DateTimePicker
                      value={endDateTime}
                      onChange={(value) => {
                        setEndDateTime(value)
                        calculateDuration()
                      }}
                      placeholder="Select end date and time"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Auto-calculated)</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 2d 3h 30m"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Duration is automatically calculated from start and end times</p>
                  </div>
                </div>
                
                {/* Extra space to ensure time picker has room */}
                <div className="h-96"></div>
              </div>

              {/* Keywords */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Hash className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Keywords</h3>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="Add keyword..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Tag className="h-6 w-6 text-pink-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Tags</h3>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-pink-600 hover:text-pink-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <Save className="h-5 w-5 mr-2" />
              {editingTask ? 'Update Task Settings' : 'Save Task Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskSettingsPage
