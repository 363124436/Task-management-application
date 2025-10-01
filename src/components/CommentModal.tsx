import React, { useState } from 'react'
import { X, Send, MessageCircle, User } from 'lucide-react'
import { useTasks } from '../contexts/TaskContext'
import { useMessages } from '../contexts/MessageContext'
import { Task } from '../contexts/TaskContext'

interface CommentModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
}

const CommentModal: React.FC<CommentModalProps> = ({ task, isOpen, onClose }) => {
  const { addComment } = useTasks()
  const { addMessage } = useMessages()
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const handleSubmitComment = () => {
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      alert('Please fill in all fields.')
      return
    }

    // Add comment to task
    addComment(task.id, {
      author: authorName,
      authorEmail,
      content: newComment
    })

    // Send notification to all task members
    const allMembers = [...new Set([
      ...task.permissions.view,
      ...task.permissions.edit
    ])]

    allMembers.forEach(memberId => {
      addMessage({
        type: 'user',
        sender: authorName,
        content: `New comment on task "${task.name}": ${newComment}`,
        senderEmail: authorEmail
      })
    })

    // Clear form
    setNewComment('')
    setAuthorName('')
    setAuthorEmail('')
    
    alert('Comment added successfully!')
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Task Comments</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-1">{task.name}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 max-h-96">
          {task.comments.length > 0 ? (
            <div className="space-y-4">
              {task.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500 ml-2">({comment.authorEmail})</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
              <p className="text-gray-600">Be the first to comment on this task!</p>
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Add a Comment</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || !authorName.trim() || !authorEmail.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  newComment.trim() && authorName.trim() && authorEmail.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="h-4 w-4 inline mr-1" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
