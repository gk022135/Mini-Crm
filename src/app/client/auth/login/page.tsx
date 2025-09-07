"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

// Types
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Simulated API calls (replace with actual axios calls)
const apiCall = async (endpoint: string, data: any): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint === '/api/auth/login') {
        // Mock login validation
        if (data.email === 'user@example.com' && data.password === 'password123') {
          resolve({
            success: true,
            message: 'Login successful',
            data: { token: 'mock-jwt-token', user: { id: 1, name: 'John Doe' } }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      } else if (endpoint === '/api/auth/signup') {
        // Mock signup validation
        if (data.email === 'existing@example.com') {
          resolve({
            success: false,
            message: 'An account with this email already exists'
          });
        } else {
          resolve({
            success: true,
            message: 'Account created successfully',
            data: { token: 'mock-jwt-token', user: { id: 2, name: `${data.firstName} ${data.lastName}` } }
          });
        }
      }
    }, 2000);
  });
};

// Login Component
const LoginForm: React.FC<{
  onToggle: () => void;
  onSuccess?: (data: any) => void;
}> = ({ onToggle, onSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Replace this with actual axios call:
      // const response = await axios.post('/api/auth/login', formData);
      const response = await apiCall('/api/auth/login', formData);

      if (response.success) {
        setSuccess('Login successful! Redirecting...');
        
        // Store token if provided
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        
        // Call success callback after a short delay
        setTimeout(() => {
          onSuccess?.(response.data);
        }, 1500);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      <div onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-6">
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
              required
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
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
              required
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center p-3 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center p-3 mb-6 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 mr-2" />
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-6"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Toggle to Signup */}
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={onToggle}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
