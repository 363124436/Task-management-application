import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Tag, Hash, FileText, Calendar, Trash2, Edit3, MessageCircle } from 'lucide-react'
import { useTasks, Task } from '../contexts/TaskContext'
import CommentModal from '../components/CommentModal'

const ManageMyTasksPage: React.FC = () => {
  const navigate = useNavigate()
  const { tasks, updateTask, deleteTask, setEditingTask } = useTasks()
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'pending'>('all')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusChange = (taskId: string, newStatus: 'active' | 'completed' | 'pending') => {
    updateTask(taskId, { status: newStatus })
  }

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    navigate('/task-settings')
  }

  const handleOpenComments = (task: Task) => {
    setSelectedTask(task)
    setIsCommentModalOpen(true)
  }

  const handleCloseComments = () => {
    setIsCommentModalOpen(false)
    setSelectedTask(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Manage My Tasks</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/create-task')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Create New Task
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Tasks</h2>
          <p className="text-gray-600">Manage and track your created tasks</p>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'active', 'pending', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'all' ? tasks.length : tasks.filter(t => t.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 p-6">
                {/* Task Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.name}</h3>
                    <p className="text-sm text-gray-500">Created: {formatDate(task.createdAt)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as 'active' | 'completed' | 'pending')}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(task.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Task Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>

                {/* Task Details */}
                <div className="space-y-3 mb-4">
                  {/* Members and Duration */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Max {task.maxMembers} members</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{task.duration}</span>
                    </div>
                  </div>

                  {/* Time Range */}
                  {(task.startDateTime || task.endDateTime) && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {task.startDateTime && `Start: ${formatDateTime(task.startDateTime)}`}
                        {task.startDateTime && task.endDateTime && ' - '}
                        {task.endDateTime && `End: ${formatDateTime(task.endDateTime)}`}
                      </span>
                    </div>
                  )}

                  {/* Files */}
                  {task.files.length > 0 && (
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {task.files.map((file, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords */}
                  {task.keywords.length > 0 && (
                    <div className="flex items-start">
                      <Hash className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {task.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex items-start">
                      <Tag className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 flex space-x-2">
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm"
                  >
                    <Edit3 className="h-4 w-4 inline mr-1" />
                    Edit Task
                  </button>
                  <button 
                    onClick={() => handleOpenComments(task)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium text-sm"
                  >
                    <MessageCircle className="h-4 w-4 inline mr-1" />
                    Comments ({task.comments?.length || 0})
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? "You haven't created any tasks yet. Start by creating your first task!"
                : `No ${filterStatus} tasks found.`
              }
            </p>
            <button
              onClick={() => navigate('/create-task')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Create Your First Task
            </button>
          </div>
        )}
      </div>

      {/* Comment Modal */}
      {selectedTask && (
        <CommentModal
          task={selectedTask}
          isOpen={isCommentModalOpen}
          onClose={handleCloseComments}
        />
      )}
    </div>
  )
}

export default ManageMyTasksPage
