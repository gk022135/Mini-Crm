"use client"   

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import LoginForm from './login/page';
import SignupForm from './signup/page';


// Main Auth Container Component
const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = (data: any) => {
    console.log('Authentication successful:', data);
    // Handle successful authentication (redirect, etc.)
    // Example: router.push('/dashboard');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20 p-8">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">MC</span>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MiniCRM
            </h1>
          </div>

          {/* Toggle between Login and Signup */}
          {isLogin ? (
            <LoginForm onToggle={toggleForm} onSuccess={handleAuthSuccess} />
          ) : (
            <SignupForm onToggle={toggleForm} onSuccess={handleAuthSuccess} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 MiniCRM. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <button className="text-blue-600 hover:text-blue-500">Demo: user@example.com / password123</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer