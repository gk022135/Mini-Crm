"use client"

import React from 'react';
import { Users, Brain, Zap, TrendingUp, Shield, Clock, Star, ArrowRight, Sparkles, Play } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
          75% { transform: translateY(-10px) rotate(1deg); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow {
          from { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
            transform: scale(1);
          }
          to { 
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.8), 0 0 60px rgba(102, 126, 234, 0.4);
            transform: scale(1.05);
          }
        }
        
        .blob {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: blob 7s infinite;
        }
        
        @keyframes blob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        .shimmer {
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        
        .card-3d:hover {
          transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
        }
      `}</style>

      <div className="pt-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"> 
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 blob gradient-bg opacity-10 floating"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 blob bg-gradient-to-br from-purple-400 to-pink-400 opacity-10" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blob bg-gradient-to-r from-blue-200 to-purple-200 opacity-20" style={{ animationDelay: '-4s' }}></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 floating"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-morphism border border-white/20 mb-8 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI-Powered CRM Solution
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block text-gray-900 text-glow">Welcome to</span>
              <span className="block gradient-text text-glow">MiniCRM</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Transform your sales process with intelligent lead management, 
              <span className="gradient-text font-semibold"> AI-powered scoring</span>, and 
              automated workflows that boost conversions by up to 
              <span className="gradient-text font-semibold"> 40%</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow overflow-hidden">
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                <span className="relative flex items-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="group flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg border border-gray-200 hover:border-purple-300 hover:bg-white transition-all duration-300 hover:shadow-lg">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
                  ))}
                </div>
                <span>Trusted by 10,000+ businesses</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(100,116,234,0.1) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Supercharge Your
                <span className="gradient-text"> Sales Pipeline</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of customer relationship management with cutting-edge features
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Lead Management */}
              <div className="group card-3d bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Lead Management</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Centralize all your leads with intelligent categorization, real-time updates, and seamless contact management.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    Advanced filtering & search
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    Bulk operations
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    Activity timeline
                  </li>
                </ul>
              </div>

              {/* AI Scoring */}
              <div className="group card-3d bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Scoring</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant conversion probability scores based on lead behavior, demographics, and engagement patterns.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                    Real-time scoring updates
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                    Predictive analytics
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                    Custom scoring models
                  </li>
                </ul>
              </div>

              {/* Auto Assignment */}
              <div className="group card-3d bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Auto Assignment</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Automatically distribute leads to the right sales team members based on territory, expertise, and workload.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                    Territory-based routing
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                    Load balancing
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                    Skill-based matching
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: "Advanced Analytics", desc: "Deep insights into your sales performance" },
                { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and data protection" },
                { icon: Clock, title: "Real-time Sync", desc: "Instant updates across all devices and team members" }
              ].map((feature, index) => (
                <div key={index} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-glow">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of businesses already crushing their sales goals with MiniCRM
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;