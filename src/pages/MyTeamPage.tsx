import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Mail, Phone, MapPin, Calendar, MessageCircle, X, Send, Paperclip } from 'lucide-react'

const MyTeamPage: React.FC = () => {
  const navigate = useNavigate()
  const [showChat, setShowChat] = useState(false)
  const [currentMember, setCurrentMember] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleBack = () => {
    navigate('/dashboard')
  }

  const handleMessage = (member: any) => {
    setCurrentMember(member)
    setShowChat(true)
  }

  const closeChat = () => {
    setShowChat(false)
    setCurrentMember(null)
    setNewMessage('')
    setSelectedFile(null)
  }

  const sendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      // Here you would typically send the message to the backend
      if (selectedFile) {
        console.log(`Sending file to ${currentMember?.name}: ${selectedFile.name}`)
      }
      if (newMessage.trim()) {
        console.log(`Sending message to ${currentMember?.name}: ${newMessage}`)
      }
      setNewMessage('')
      setSelectedFile(null)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  // Team members data 1
  const teamMembers = [
    {
      id: '1',
      name: 'Cristiano',
      email: 'cristiano@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2023-01-15',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: 'C'
    },
    {
      id: '2',
      name: 'Jenny Foster',
      email: 'jenny.foster@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      joinDate: '2023-02-20',
      role: 'Project Manager',
      department: 'Management',
      avatar: 'J'
    },
    {
      id: '3',
      name: 'Benjamin Will',
      email: 'benjamin.will@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      joinDate: '2023-03-10',
      role: 'UI/UX Designer',
      department: 'Design',
      avatar: 'B'
    },
    {
      id: '4',
      name: 'Olivier Solin',
      email: 'olivier.solin@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      joinDate: '2023-04-05',
      role: 'Marketing Specialist',
      department: 'Marketing',
      avatar: 'O'
    },
    {
      id: '5',
      name: 'Osman Brandon',
      email: 'osman.brandon@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      joinDate: '2023-05-12',
      role: 'Data Analyst',
      department: 'Analytics',
      avatar: 'O'
    }
  ]

  // Sample chat messages for each team member
  const getChatMessages = (memberId: string) => {
    const messages = {
      '1': [ // Cristiano
        { id: 1, sender: 'Cristiano', message: 'Hey! How is the new project going?', timestamp: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Great! We just finished the initial setup. How about your side?', timestamp: '10:32 AM', isOwn: true },
        { id: 3, sender: 'Cristiano', message: 'Perfect! I\'ve been working on the backend API. Should be ready by tomorrow.', timestamp: '10:35 AM', isOwn: false },
        { id: 4, sender: 'You', message: 'Excellent! Let me know when it\'s ready for testing.', timestamp: '10:36 AM', isOwn: true },
        { id: 5, sender: 'Cristiano', message: 'Will do! 👍', timestamp: '10:37 AM', isOwn: false }
      ],
      '2': [ // Jenny Foster
        { id: 1, sender: 'Jenny Foster', message: 'Good morning! Do you have a moment to discuss the project timeline?', timestamp: '9:15 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Of course! What would you like to discuss?', timestamp: '9:17 AM', isOwn: true },
        { id: 3, sender: 'Jenny Foster', message: 'I think we might need to adjust the deadline for the next milestone.', timestamp: '9:18 AM', isOwn: false },
        { id: 4, sender: 'You', message: 'I see. What\'s the new timeline you\'re thinking?', timestamp: '9:20 AM', isOwn: true },
        { id: 5, sender: 'Jenny Foster', message: 'Let\'s schedule a team meeting this afternoon to discuss it.', timestamp: '9:22 AM', isOwn: false }
      ],
      '3': [ // Benjamin Will
        { id: 1, sender: 'Benjamin Will', message: 'Hi! I\'ve finished the new UI mockups. Want to take a look?', timestamp: '2:45 PM', isOwn: false },
        { id: 2, sender: 'You', message: 'Absolutely! Send them over when you\'re ready.', timestamp: '2:47 PM', isOwn: true },
        { id: 3, sender: 'Benjamin Will', message: 'Perfect! I\'ll share the Figma link in a few minutes.', timestamp: '2:48 PM', isOwn: false },
        { id: 4, sender: 'You', message: 'Great! Looking forward to seeing your designs.', timestamp: '2:49 PM', isOwn: true },
        { id: 5, sender: 'Benjamin Will', message: 'Thanks! Let me know what you think. 😊', timestamp: '2:50 PM', isOwn: false }
      ],
      '4': [ // Olivier Solin
        { id: 1, sender: 'Olivier Solin', message: 'Hey! The marketing campaign is performing really well!', timestamp: '11:20 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'That\'s fantastic! What are the numbers looking like?', timestamp: '11:22 AM', isOwn: true },
        { id: 3, sender: 'Olivier Solin', message: 'We\'ve seen a 40% increase in engagement this week!', timestamp: '11:23 AM', isOwn: false },
        { id: 4, sender: 'You', message: 'Wow! That\'s incredible. Great work!', timestamp: '11:25 AM', isOwn: true },
        { id: 5, sender: 'Olivier Solin', message: 'Thank you! The team is really excited about these results.', timestamp: '11:26 AM', isOwn: false }
      ],
      '5': [ // Osman Brandon
        { id: 1, sender: 'Osman Brandon', message: 'Hi! I\'ve completed the data analysis for last month.', timestamp: '3:10 PM', isOwn: false },
        { id: 2, sender: 'You', message: 'Perfect! What are the key findings?', timestamp: '3:12 PM', isOwn: true },
        { id: 3, sender: 'Osman Brandon', message: 'User retention is up 15% and we\'re seeing strong growth in key metrics.', timestamp: '3:13 PM', isOwn: false },
        { id: 4, sender: 'You', message: 'Excellent! Can you share the detailed report?', timestamp: '3:15 PM', isOwn: true },
        { id: 5, sender: 'Osman Brandon', message: 'Sure! I\'ll send it over shortly with the charts and insights.', timestamp: '3:16 PM', isOwn: false }
      ]
    }
    return messages[memberId as keyof typeof messages] || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                Back to Main Page
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">My Team</h1>
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Members</h2>
            <p className="text-gray-600">Browse your team members information and connect with them</p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Member Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{member.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMessage(member)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title={`Send message to ${member.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>

                {/* Member Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{member.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{member.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {member.department}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleMessage(member)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2023</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{currentMember.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{currentMember.name}</h3>
                  <p className="text-sm text-white/80">{currentMember.role}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {getChatMessages(currentMember.id).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isOwn ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              {/* File Preview */}
              {selectedFile && (
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 truncate">{selectedFile.name}</span>
                    <span className="text-xs text-blue-600">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <div className="flex space-x-2">
                {/* File Upload Button */}
                <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <Paperclip className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                </label>
                
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() && !selectedFile}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyTeamPage
