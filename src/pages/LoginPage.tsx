import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Building2, X, CheckCircle, AlertCircle } from 'lucide-react'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [showRegistration, setShowRegistration] = useState(false)
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [regMessage, setRegMessage] = useState('')
  const [showEnterpriseLogin, setShowEnterpriseLogin] = useState(false)
  const [enterpriseEmail, setEnterpriseEmail] = useState('')
  const [enterprisePassword, setEnterprisePassword] = useState('')
  const [showEnterprisePassword, setShowEnterprisePassword] = useState(false)
  const [isEnterpriseLogging, setIsEnterpriseLogging] = useState(false)
  const [enterpriseMessage, setEnterpriseMessage] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginMessage('')
    
    // Field validation: Check if email is empty
    if (!email.trim()) {
      setLoginMessage('Please enter your email')
      return
    }

    // Field validation: Check if password is empty
    if (!password.trim()) {
      setLoginMessage('Please enter your password')
      return
    }

    // Email format validation
    if (!validateEmail(email)) {
      setLoginMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    // Simulate login process - always navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard')
      setIsLoading(false)
    }, 1000)
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
    setResetMessage('')
  }

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false)
    setResetEmail('')
    setNewPassword('')
    setConfirmPassword('')
    setResetMessage('')
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePasswordStrength = (password: string) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      checks: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Field validation: Check if any field is empty
    if (!resetEmail.trim()) {
      setResetMessage('Please fill in the email field first')
      return
    }

    if (!newPassword.trim()) {
      setResetMessage('Please fill in the new password field first')
      return
    }

    if (!confirmPassword.trim()) {
      setResetMessage('Please fill in the confirm password field first')
      return
    }

    // Email format validation
    if (!validateEmail(resetEmail)) {
      setResetMessage('Please enter a valid email address')
      return
    }

    // Password match validation
    if (newPassword !== confirmPassword) {
      setResetMessage('Passwords do not match')
      return
    }

    // Password strength validation
    const passwordValidation = validatePasswordStrength(newPassword)
    if (!passwordValidation.isValid) {
      setResetMessage('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters')
      return
    }

    setIsResetting(true)
    setResetMessage('')

    // Simulate password reset process
    setTimeout(() => {
      setIsResetting(false)
      setResetMessage('Password reset successful! Please login with your new password.')
      
      // Close modal after 3 seconds
      setTimeout(() => {
        handleCloseForgotPassword()
      }, 3000)
    }, 2000)
  }

  const handleRegister = () => {
    setShowRegistration(true)
    setRegMessage('')
  }

  const handleCloseRegistration = () => {
    setShowRegistration(false)
    setRegEmail('')
    setRegPassword('')
    setRegConfirmPassword('')
    setRegMessage('')
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      checks: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    }
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Check if email field is empty
    if (!regEmail.trim()) {
      setRegMessage('Please fill in the email field first')
      return
    }

    // Check if password field is empty
    if (!regPassword.trim()) {
      setRegMessage('Please fill in the password field first')
      return
    }

    // Check if confirm password field is empty
    if (!regConfirmPassword.trim()) {
      setRegMessage('Please fill in the confirm password field first')
      return
    }

    // Validate email format
    if (!validateEmail(regEmail)) {
      setRegMessage('Please enter a valid email address')
      return
    }

    // Check if passwords match
    if (regPassword !== regConfirmPassword) {
      setRegMessage('Passwords do not match')
      return
    }

    // Validate password strength
    const passwordValidation = validatePassword(regPassword)
    if (!passwordValidation.isValid) {
      setRegMessage('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters')
      return
    }

    setIsRegistering(true)
    setRegMessage('')

    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false)
      setRegMessage('A confirmation email has been sent to your email address')
      
      // Close modal and return to login after 3 seconds
      setTimeout(() => {
        handleCloseRegistration()
      }, 3000)
    }, 2000)
  }

  const handleEnterpriseLogin = () => {
    setShowEnterpriseLogin(true)
    setEnterpriseMessage('')
  }

  const handleCloseEnterpriseLogin = () => {
    setShowEnterpriseLogin(false)
    setEnterpriseEmail('')
    setEnterprisePassword('')
    setEnterpriseMessage('')
  }

  const handleEnterpriseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Field validation: Check if any field is empty
    if (!enterpriseEmail.trim()) {
      setEnterpriseMessage('Please fill in the email field first')
      return
    }

    if (!enterprisePassword.trim()) {
      setEnterpriseMessage('Please fill in the password field first')
      return
    }

    // Email format validation
    if (!validateEmail(enterpriseEmail)) {
      setEnterpriseMessage('Please enter a valid email address')
      return
    }

    // Check if it's an enterprise email (contains company domain)
    const emailDomain = enterpriseEmail.split('@')[1]
    if (!emailDomain || emailDomain.includes('gmail.com') || emailDomain.includes('yahoo.com') || emailDomain.includes('hotmail.com')) {
      setEnterpriseMessage('Please use your company email address')
      return
    }

    setIsEnterpriseLogging(true)
    setEnterpriseMessage('')

    // Simulate enterprise login process
    setTimeout(() => {
      setIsEnterpriseLogging(false)
      setEnterpriseMessage('Enterprise login successful! Redirecting to dashboard...')
      
      // Close modal and navigate to dashboard after 2 seconds
      setTimeout(() => {
        handleCloseEnterpriseLogin()
        navigate('/dashboard')
      }, 2000)
    }, 2000)
  }

  const handleMicrosoft365Login = () => {
    alert('Microsoft 365 login integration is under development...')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Task Management System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Error Message */}
          {loginMessage && (
            <div className="p-3 rounded-lg text-sm bg-red-100 text-red-700 border border-red-200">
              {loginMessage}
            </div>
          )}

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Three Options 1*/}
          <div className="space-y-3 pt-4">
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={handleRegister}
                className="text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
              >
                New User Registration
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={handleEnterpriseLogin}
                className="text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
              >
                Enterprise Login
              </button>
            </div>
          </div>
        </form>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                <button
                  onClick={handleCloseForgotPassword}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
                {/* Email Input */}
                <div>
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="resetEmail"
                      name="resetEmail"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* New Password Input */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-medium">Password Requirements:</p>
                    <div className="space-y-1">
                      <div className={`flex items-center ${newPassword.length >= 8 ? 'text-green-600' : 'text-red-600'}`}>
                        {newPassword.length >= 8 ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        At least 8 characters
                      </div>
                      <div className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                        {/[A-Z]/.test(newPassword) ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        Contains uppercase letter
                      </div>
                      <div className={`flex items-center ${/[a-z]/.test(newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                        {/[a-z]/.test(newPassword) ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        Contains lowercase letter
                      </div>
                      <div className={`flex items-center ${/\d/.test(newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                        {/\d/.test(newPassword) ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        Contains number
                      </div>
                      <div className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                        {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        Contains special character
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Display */}
                {resetMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    resetMessage.includes('successful') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {resetMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseForgotPassword}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isResetting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Resetting...
                      </div>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">New User Registration</h3>
                <button
                  onClick={handleCloseRegistration}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleRegistration} className="space-y-4" noValidate>
                {/* Email Input */}
                <div>
                  <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="regEmail"
                      name="regEmail"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="regPassword"
                      name="regPassword"
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                    >
                      {showRegPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="regConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="regConfirmPassword"
                      name="regConfirmPassword"
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                    >
                      {showRegConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Message Display */}
                {regMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    regMessage.includes('confirmation email') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {regMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseRegistration}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Registering...
                      </div>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enterprise Login Modal */}
        {showEnterpriseLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Login</h3>
                <button
                  onClick={handleCloseEnterpriseLogin}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleEnterpriseSubmit} className="space-y-4" noValidate>
                {/* Enterprise Email Input */}
                <div>
                  <label htmlFor="enterpriseEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="enterpriseEmail"
                      name="enterpriseEmail"
                      type="email"
                      value={enterpriseEmail}
                      onChange={(e) => setEnterpriseEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your company email"
                    />
                  </div>
                </div>

                {/* Enterprise Password Input */}
                <div>
                  <label htmlFor="enterprisePassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="enterprisePassword"
                      name="enterprisePassword"
                      type={showEnterprisePassword ? 'text' : 'password'}
                      value={enterprisePassword}
                      onChange={(e) => setEnterprisePassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowEnterprisePassword(!showEnterprisePassword)}
                    >
                      {showEnterprisePassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Message Display */}
                {enterpriseMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    enterpriseMessage.includes('successful') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {enterpriseMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    type="submit"
                    disabled={isEnterpriseLogging}
                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isEnterpriseLogging ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Microsoft 365 Login Button */}
                  <button
                    type="button"
                    onClick={handleMicrosoft365Login}
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                    Sign in with Microsoft 365
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseEnterpriseLogin}
                    className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
