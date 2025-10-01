import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Send, User, Shield, Bell, Check, CheckCheck } from 'lucide-react'
import { useMessages } from '../contexts/MessageContext'

const MessagesPage: React.FC = () => {
  const navigate = useNavigate()
  const { messages, unreadCount, markAsRead, markAllAsRead, sendMessageToAdmin } = useMessages()
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'admin'>('all')

  const filteredMessages = messages.filter(message => {
    switch (activeTab) {
      case 'unread':
        return !message.read
      case 'admin':
        return message.type === 'admin'
      default:
        return true
    }
  })

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-600" />
      case 'system':
        return <Bell className="h-4 w-4 text-green-600" />
      case 'admin':
        return <Shield className="h-4 w-4 text-purple-600" />
      default:
        return <Mail className="h-4 w-4 text-gray-600" />
    }
  }

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800'
      case 'system':
        return 'bg-green-100 text-green-800'
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes < 1 ? 'Just now' : `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageToAdmin(newMessage.trim())
      setNewMessage('')
    }
  }

  const handleMessageClick = (message: any) => {
    if (!message.read) {
      markAsRead(message.id)
    }
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
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Messages</h2>
          <p className="text-gray-600">Stay connected with your team and receive system notifications</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'unread', 'admin'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                {tab === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4 mb-8">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 p-6 cursor-pointer ${
                  !message.read ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getMessageIcon(message.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                      {message.senderEmail && (
                        <p className="text-sm text-gray-500">{message.senderEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.type)}`}>
                      {message.type}
                    </span>
                    {message.read ? (
                      <CheckCheck className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Check className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">{message.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatTimestamp(message.timestamp)}</span>
                  {!message.read && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">
                {activeTab === 'unread' 
                  ? "You're all caught up! No unread messages."
                  : activeTab === 'admin'
                  ? "No messages to system administrator yet."
                  : "No messages yet. Start by creating a task to receive system notifications."
                }
              </p>
            </div>
          )}
        </div>

        {/* Contact System Administrator */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Contact System Administrator</h3>
          </div>
          <p className="text-gray-600 mb-4">Send a message to the system administrator for support or feedback.</p>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                newMessage.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="h-4 w-4 inline mr-1" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
