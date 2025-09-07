"use client"

import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';

// Types
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isActive?: boolean;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Navigation items array
const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
    isActive: true
  },
  {
    id: 'leads',
    label: 'Leads',
    href: '/client/crm',
    icon: Users,
    badge: '12'
  },
  {
    id: 'Leads2',
    label: 'Analytics',
    href: '/client/crm/lead',
    icon: BarChart3
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '#settings',
    icon: Settings
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: Phone
  }
];

// Mock user data
const currentUser: User = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/api/placeholder/32/32'
};

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle nav item click
  const handleNavClick = (itemId: string, href: string) => {
    setActiveItem(itemId);

    // Smooth scroll to section
    // const element = document.querySelector(href);
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }

  };

  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
        : 'bg-white/80 backdrop-blur-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href='/client/dashboard'>
              <div className="flex-shrink-0">
                <div className="flex items-center">

                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">MC</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MiniCRM
                  </span>

                </div>

              </div>
            </a>


            {/* Desktop Navigation Items */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a href={item.href}>
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id, item.href)}
                        className={`relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeItem === item.id
                          ? 'bg-blue-100 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {item.label}
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                  <div className="text-xs text-gray-500">{currentUser.email}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                  }`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{currentUser.name}</div>
                        <div className="text-sm text-gray-500">{currentUser.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      View Profile
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Account Settings
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav >

      {/* Mobile Navbar - Bottom */}
      < nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg" >
        <div className="px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${activeItem === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <div className="relative">
                    <IconComponent className="w-6 h-6" />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium mt-1">{item.label}</span>

                  {/* Active indicator */}
                  {activeItem === item.id && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav >

      {/* Mobile Profile Button - Top Right Corner */}
      < div className="md:hidden fixed top-4 right-4 z-50" >
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className={`p-3 rounded-xl transition-all duration-300 ${isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg border border-gray-200/50'
            : 'bg-white/80 backdrop-blur-sm border border-white/20'
            }`}
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>

        {/* Mobile Profile Dropdown */}
        {
          isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{currentUser.name}</div>
                    <div className="text-sm text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4 mr-3" />
                  View Profile
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </button>
                <hr className="my-2 border-gray-100" />
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )
        }
      </div >

      {/* Click outside to close profile dropdown */}
      {
        isProfileOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsProfileOpen(false)}
          />
        )
      }

      {/* Mobile bottom padding to prevent content overlap */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default Navbar;