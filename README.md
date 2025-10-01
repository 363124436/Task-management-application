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

#### 1. create New Task
- **File Upload** - Support for Word, PPT, and Excel documents
- **Drag & Drop** - Intuitive file upload interface
- **File Management** - View, remove, and manage uploaded files
- **Navigation** - Seamless flow to task settings

#### 2. Search online tasks
- **Task Discovery** - Find tasks your team is working on
- **Search Interface** - Quick access to task search functionality

#### 3. Manage My Tasks
- **Task Overview** - Easily view task progress and details
- **Personal Dashboard** - Track your individual task status

#### 4. My Team
- **Team Members** - Browse team member information
- **Contact Details** - View emails, phone numbers, and locations
- **Private Messaging** - Send messages to team members
- **Team Statistics** - Overview of team composition and activity

### ⚙️ Task Settings
- **Permission Management** - Set view and edit permissions for team members
- **Time Configuration** - Set start time, end time, and duration
- **Metadata Management** - Add keywords and tags for task organization
- **User Selection** - Choose which team members can access tasks

## 🛠 Tech Stack

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
3. Enter any email and password (or leave empty)
4. Click "Sign In" to navigate to the dashboard

### Using the Application

#### Dashboard Navigation
- **Create New Task**: Click to upload files and create new tasks
- **Search Tasks**: Access task search functionality
- **Manage My Tasks**: View your personal task progress
- **My Team**: Browse team members and send messages

#### Task Creation Workflow
1. Click "Create New Task" on dashboard
2. Upload Word, PPT, or Excel files
3. Click "Create Task" to proceed to settings
4. Configure permissions, timing, and metadata
5. Save settings to complete task creation

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
│   ├── TaskCreationPageSimple.tsx  # File upload interface
│   ├── TaskSettingsPage.tsx # Task configuration page
│   ├── MyTeamPage.tsx       # Team member management
│   └── TestPage.tsx         # Development testing page
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

##  Notes

- **Demo Application**: Built for learning and demonstration purposes
- **No Backend Required**: All functionality is client-side
- **English Interface**: All UI elements and content in English
- **Form Validation Disabled**: Simplified for demo purposes
- **Mock Data**: Team members and permissions use sample data

##  Future Enhancements

- [ ] Implement actual authentication system
- [ ] Add backend API integration
- [ ] Create real-time messaging system
- [ ] Add file storage and management
- [ ] Implement task status tracking
- [ ] Add notification system
- [ ] Create user profile management
- [ ] Add task assignment and delegation
- [ ] Implement calendar integration
- [ ] Add reporting and analytics dashboard

##  Contributing

This is a learning project. Feel free to explore the codebase and experiment with new features!

##  License

This project is for educational purposes only.