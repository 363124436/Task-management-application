import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Users, Clock, Tag, Hash, X } from 'lucide-react'

interface TaskItem {
  id: number
  name: string
  description: string
  maxMembers: number
  duration: string
  keywords: string[]
  tags: string[]
  status: 'active' | 'completed' | 'pending'
}

const SearchTasksPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  const sampleTasks: TaskItem[] = [
    {
      id: 1,
      name: "Website Redesign Project",
      description: "Complete redesign of company website with modern UI/UX",
      maxMembers: 8,
      duration: "6 weeks",
      keywords: ["design", "frontend", "UI/UX", "responsive"],
      tags: ["urgent", "high-priority"],
      status: "active"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Develop cross-platform mobile application for iOS and Android",
      maxMembers: 6,
      duration: "12 weeks",
      keywords: ["mobile", "react-native", "cross-platform", "API"],
      tags: ["development", "mobile"],
      status: "pending"
    },
    {
      id: 3,
      name: "Database Migration",
      description: "Migrate legacy database to cloud-based solution",
      maxMembers: 4,
      duration: "4 weeks",
      keywords: ["database", "migration", "cloud", "AWS"],
      tags: ["infrastructure", "critical"],
      status: "active"
    },
    {
      id: 4,
      name: "Marketing Campaign Launch",
      description: "Launch comprehensive digital marketing campaign",
      maxMembers: 5,
      duration: "8 weeks",
      keywords: ["marketing", "digital", "campaign", "analytics"],
      tags: ["marketing", "launch"],
      status: "pending"
    },
    {
      id: 5,
      name: "Security Audit & Compliance",
      description: "Conduct security audit and ensure compliance standards",
      maxMembers: 3,
      duration: "3 weeks",
      keywords: ["security", "audit", "compliance", "GDPR"],
      tags: ["security", "compliance"],
      status: "active"
    },
    {
      id: 6,
      name: "Customer Support System",
      description: "Implement new customer support ticketing system",
      maxMembers: 7,
      duration: "5 weeks",
      keywords: ["support", "ticketing", "customer", "automation"],
      tags: ["customer-service", "system"],
      status: "completed"
    },
    {
      id: 7,
      name: "Data Analytics Dashboard",
      description: "Create comprehensive analytics dashboard for business insights",
      maxMembers: 6,
      duration: "7 weeks",
      keywords: ["analytics", "dashboard", "data", "visualization"],
      tags: ["analytics", "dashboard"],
      status: "pending"
    },
    {
      id: 8,
      name: "API Integration Project",
      description: "Integrate third-party APIs for enhanced functionality",
      maxMembers: 4,
      duration: "4 weeks",
      keywords: ["API", "integration", "third-party", "REST"],
      tags: ["integration", "API"],
      status: "active"
    },
    {
      id: 9,
      name: "Content Management System",
      description: "Develop custom CMS for content publishing workflow",
      maxMembers: 5,
      duration: "9 weeks",
      keywords: ["CMS", "content", "publishing", "workflow"],
      tags: ["content", "management"],
      status: "pending"
    },
    {
      id: 10,
      name: "Performance Optimization",
      description: "Optimize application performance and reduce load times",
      maxMembers: 3,
      duration: "3 weeks",
      keywords: ["performance", "optimization", "speed", "monitoring"],
      tags: ["optimization", "performance"],
      status: "completed"
    }
  ]

  const filteredTasks = sampleTasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleJoinTask = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
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
              <h1 className="text-xl font-semibold text-gray-900">Search Online Tasks</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks, keywords, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Tasks</h2>
          <p className="text-gray-600">Found {filteredTasks.length} tasks matching your search</p>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 p-6">
              {/* Task Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>

              {/* Task Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>

              {/* Task Details */}
              <div className="space-y-3">
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

                {/* Keywords */}
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

                {/* Tags */}
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
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
                  View Details
                </button>
                <button 
                  onClick={handleJoinTask}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium"
                >
                  Apply to Join Task Group
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all available tasks.</p>
          </div>
        )}
      </div>

      {/* Application Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Application Sent</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">
                Your application has already send to the group leader
              </p>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchTasksPage
