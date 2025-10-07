# Task Management System

A comprehensive task management application built with React and TypeScript, featuring team collaboration, task creation, and user management capabilities.

##  Features

###  Authentication & Navigation
- **Login Page** - Clean authentication form with email and password input
- **No Form Validation** - Direct navigation to dashboard (demo-friendly)
- **Responsive Design** - Works seamlessly on desktop and mobile devices

###  Dashboard
- **Modern UI** - Soft gradient background with glassmorphism effects
- **Feature Cards** - Four main functionality modules with hover animations
- **Navigation Bar** - Clean top navigation with user info and logout

###  Modules

#### 1. cimage.pngreate New Task
- **File Upload** - Support for Word, PPT, and Excel documents
- **Drag & Drop** - Intuitive file upload interface
- **File Management** - View, remove, and manage uploaded files
- **Navigation** - Seamless flow to task settings

#### 2. Search Tasks
- **Task Discovery** - Browse and search through available team tasks
- **Advanced Search** - Filter tasks by keywords, tags, and status
- **Task Details** - View comprehensive task information including members, duration, and requirements
- **Application System** - Apply to join tasks with one-click application
- **Status Tracking** - See real-time task status (active, pending, completed)
- **Sample Tasks** - Pre-loaded with 8 diverse project examples

#### 3. Manage My Tasks
- **Task Overview** - Comprehensive view of all your created tasks
- **Status Management** - Update task status (active, pending, completed) with dropdown selection
- **Task Editing** - Edit task details, permissions, and metadata
- **Task Deletion** - Remove tasks with confirmation dialog
- **Filter System** - Filter tasks by status (all, active, pending, completed)
- **Comments System** - Add and view comments for each task
- **File Management** - View attached files and documents
- **Time Tracking** - Display creation dates and time ranges

#### 4. Messages
- **Message Center** - Centralized communication hub
- **Message Types** - Support for user, system, and admin messages
- **Read Status** - Track read/unread message status with visual indicators
- **Message Filtering** - Filter by all, unread, or admin messages
- **Timestamp Display** - Smart time formatting (just now, minutes/hours/days ago)
- **Admin Contact** - Direct messaging to system administrator
- **Unread Counter** - Real-time unread message count display
- **Mark as Read** - Individual and bulk read status management

#### 5. My Team
- **Team Members** - Browse team member information
- **Contact Details** - View emails, phone numbers, and locations
- **Private Messaging** - Send messages to team members
- **Team Statistics** - Overview of team composition and activity

###  Task Settings
- **Permission Management** - Set view and edit permissions for team members
- **Time Configuration** - Set start time, end time, and duration
- **Metadata Management** - Add keywords and tags for task organization
- **User Selection** - Choose which team members can access tasks

##  Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling Framework**: Tailwind CSS
- **Routing**: React Router v6
- **Icons Library**: Lucide React
- **State Management**: React Context API (with useState hooks)

##  Installation and Setup

### Requirements
- Node.js 16+
- npm

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

##  Usage

### Getting Started
1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the login page
3. Enter a valid email address
4. Enter a password that meets security requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character
5. Click "Sign In" to navigate to the dashboard

### Using the Application

#### Dashboard Navigation
- **Create New Task**: Click to upload files and create new tasks
- **Search Tasks**: Browse and apply to available team tasks
- **Manage My Tasks**: View, edit, and manage your created tasks
- **Messages**: Access message center and team communication
- **My Team**: Browse team members and send messages

#### Task Creation Workflow
1. Click "Create New Task" on dashboard
2. Upload Word, PPT, or Excel files
3. Click "Create Task" to proceed to settings
4. Configure permissions, timing, and metadata
5. Save settings to complete task creation

#### Task Management Workflow
1. Click "Manage My Tasks" on dashboard
2. View all your created tasks with status filters
3. Edit task details, update status, or delete tasks
4. Add comments and view task progress
5. Use "Back to Dashboard" to return to main page

#### Task Search and Application
1. Click "Search Tasks" on dashboard
2. Browse available team tasks with detailed information
3. Use search functionality to find specific tasks
4. Click "Apply" to join tasks you're interested in
5. View application status and task requirements

#### Message Center
1. Click "Messages" on dashboard
2. View all messages (user, system, admin) with filtering
3. Mark messages as read/unread
4. Send messages to system administrator
5. Track unread message count and timestamps

#### Team Management
1. Click "My Team" on dashboard
2. View team member information
3. Click envelope icon or "Send Message" to contact members
4. Use "Back to Main Page" to return to dashboard

##  Project Structure

```
src/
├── pages/                    # Page components
│   ├── LoginPage.tsx         # Authentication form
│   ├── Dashboard.tsx        # Main dashboard with feature cards
│   ├── TaskCreationPage.tsx # File upload interface
│   ├── TaskCreationPageSimple.tsx  # Simple task creation
│   ├── TaskSettingsPage.tsx # Task configuration page
│   ├── ManageMyTasksPage.tsx # Task management and editing
│   ├── SearchTasksPage.tsx  # Task search and application
│   ├── MessagesPage.tsx     # Message center and communication
│   ├── MyTeamPage.tsx       # Team member management
│   └── TestPage.tsx         # Development testing page
├── components/               # Reusable components
│   ├── CommentModal.tsx     # Task comments modal
│   └── DateTimePicker.tsx   # Date and time selection
├── contexts/                 # React Context providers
│   ├── TaskContext.tsx      # Task state management
│   └── MessageContext.tsx   # Message state management
├── App.tsx                   # Main application with routing
├── main.tsx                  # Application entry point
└── index.css                 # Global styles and Tailwind imports
```

##  Design Features

- **Modern Aesthetics**: Soft gradient backgrounds and glassmorphism effects
- **Interactive Elements**: Hover animations, smooth transitions, and visual feedback
- **Responsive Layout**: Optimized for all screen sizes
- **Professional Color Scheme**: Blue, purple, and orange gradient palette
- **Accessibility**: Clear typography and intuitive navigation

##  Team Members

The application includes five team members:
- **Cristiano** - Senior Developer (cristiano@example.com)
- **Jenny Foster** - Project Manager (jenny.foster@example.com)
- **Benjamin Will** - UI/UX Designer (benjamin.will@example.com)
- **Olivier Solin** - Marketing Specialist (olivier.solin@example.com)
- **Osman Brandon** - Data Analyst (osman.brandon@example.com)

##  Configuration Files

- **package.json**: Dependencies and scripts configuration
- **vite.config.ts**: Vite build tool configuration
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS and Autoprefixer setup
- **tsconfig.json**: TypeScript compiler options

##  Recent Bug Fixes

###  December 2024 Updates

####  **Login Page Password Validation Fix**
- **Issue**: Login page allowed weak passwords (e.g., 3-character passwords) while registration required strong passwords
- **Problem**: Password validation inconsistency between login and registration forms
- **Solution**: Implemented unified password strength validation for login
- **Requirements**: Passwords must now meet all security criteria:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter  
  - At least one number
  - At least one special character
- **UI Enhancement**: Added real-time password strength indicator with visual feedback

####  **Task Creation Calendar Date Picker Fix**
- **Issue**: Calendar date selection was buggy - selecting October 2nd would incorrectly select October 1st
- **Problem**: Invalid date string creation (`"2025-10-02T"`) causing `Invalid Date` errors
- **Solution**: Fixed date handling logic to create valid datetime strings
- **Improvements**:
  - Proper time format handling (`"2025-10-02T00:00:00"`)
  - Enhanced date validation with error checking
  - Improved timezone compatibility
- **Result**: Calendar date selection now works correctly without date offset issues

##  Notes

- **Demo Application**: Built for learning and demonstration purposes
- **No Backend Required**: All functionality is client-side
- **English Interface**: All UI elements and content in English
- **Enhanced Security**: Password validation now enforced across all forms
- **Mock Data**: Team members and permissions use sample data

##  Key Features Implemented

###  Completed Features
- **Task Management System** - Complete CRUD operations for tasks
- **Message Center** - Real-time messaging with read/unread status
- **Task Search & Application** - Browse and apply to team tasks
- **Comments System** - Task-specific commenting functionality
- **Status Management** - Task status tracking and updates
- **File Upload** - Support for Office documents
- **Responsive Design** - Mobile-friendly interface
- **State Management** - React Context for global state
- **Local Storage** - Data persistence across sessions

###  Current Capabilities
- Create, edit, and delete tasks with full metadata
- Search and filter tasks by keywords, tags, and status
- Apply to join team tasks with one-click functionality
- Send and receive messages with read status tracking
- Add comments to tasks for team collaboration
- Manage task permissions and team member access
- Track task progress with status updates
- View comprehensive task details and requirements

##  Future Enhancements

- [ ] Implement actual authentication system
- [ ] Add backend API integration
- [ ] Create real-time messaging system
- [ ] Add file storage and management
- [ ] Add notification system
- [ ] Create user profile management
- [ ] Add task assignment and delegation
- [ ] Implement calendar integration
- [ ] Add reporting and analytics dashboard
- [ ] Add task templates and workflows
- [ ] Implement task dependencies and milestones
- [ ] Add file version control and collaboration

##  Contributing

This is a learning project. Feel free to explore the codebase and experiment with new features!

##  License

This project is for educational purposes only.