import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Message {
  id: string
  type: 'user' | 'system' | 'admin'
  sender: string
  content: string
  timestamp: Date
  read: boolean
  senderEmail?: string
}

interface MessageContextType {
  messages: Message[]
  unreadCount: number
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (messageId: string) => void
  markAllAsRead: () => void
  sendMessageToAdmin: (content: string) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export const useMessages = () => {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider')
  }
  return context
}

interface MessageProviderProps {
  children: ReactNode
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('taskManagement_messages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((message: any) => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error loading messages from localStorage:', error)
      }
    } else {
      // Initialize with some sample messages
      const initialMessages: Message[] = [
        {
          id: '1',
          type: 'user',
          sender: 'Cristiano',
          senderEmail: 'cristiano@example.com',
          content: 'Hi! I\'m interested in joining your project. Can you provide more details?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false
        },
        {
          id: '2',
          type: 'user',
          sender: 'Jenny Foster',
          senderEmail: 'jenny.foster@example.com',
          content: 'Great work on the project! Looking forward to collaborating.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          read: true
        },
        {
          id: '3',
          type: 'system',
          sender: 'System',
          content: 'Welcome to Task Management System! You can now start creating and managing your tasks.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true
        }
      ]
      setMessages(initialMessages)
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('taskManagement_messages', JSON.stringify(messages))
  }, [messages])

  // Calculate unread count
  const unreadCount = messages.filter(message => !message.read).length

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    setMessages(prev => [newMessage, ...prev])
  }

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId ? { ...message, read: true } : message
    ))
  }

  const markAllAsRead = () => {
    setMessages(prev => prev.map(message => ({ ...message, read: true })))
  }

  const sendMessageToAdmin = (content: string) => {
    const adminMessage: Message = {
      id: Date.now().toString(),
      type: 'admin',
      sender: 'You',
      content,
      timestamp: new Date(),
      read: true
    }
    setMessages(prev => [adminMessage, ...prev])
  }

  return (
    <MessageContext.Provider value={{ 
      messages, 
      unreadCount, 
      addMessage, 
      markAsRead, 
      markAllAsRead,
      sendMessageToAdmin 
    }}>
      {children}
    </MessageContext.Provider>
  )
}
