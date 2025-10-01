import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Comment {
  id: string
  author: string
  authorEmail: string
  content: string
  timestamp: Date
}

export interface Task {
  id: string
  name: string
  description: string
  files: string[]
  maxMembers: number
  duration: string
  keywords: string[]
  tags: string[]
  status: 'active' | 'completed' | 'pending'
  createdAt: Date
  startDateTime?: string
  endDateTime?: string
  permissions: {
    view: string[]
    edit: string[]
  }
  comments: Comment[]
}

interface TaskContextType {
  tasks: Task[]
  editingTask: Task | null
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setEditingTask: (task: Task | null) => void
  clearEditingTask: () => void
  addComment: (taskId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

interface TaskProviderProps {
  children: ReactNode
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagement_tasks')
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        // Convert createdAt strings back to Date objects and initialize comments
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          comments: task.comments ? task.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp)
          })) : []
        }))
        setTasks(tasksWithDates)
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskManagement_tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      comments: taskData.comments || []
    }
    setTasks(prev => [newTask, ...prev])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const clearEditingTask = () => {
    setEditingTask(null)
  }

  const addComment = (taskId: string, commentData: Omit<Comment, 'id' | 'timestamp'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, comments: [...task.comments, newComment] }
        : task
    ))
  }

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      editingTask,
      addTask, 
      updateTask, 
      deleteTask, 
      setEditingTask,
      clearEditingTask,
      addComment
    }}>
      {children}
    </TaskContext.Provider>
  )
}
