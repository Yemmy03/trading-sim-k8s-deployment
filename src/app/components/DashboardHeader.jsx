'use client';

import { RefreshCw, User, Bell, Settings, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function DashboardHeader({ 
  isRefreshing, 
  onRefresh, 
  userName = "User",
  userEmail,
  activeTab = "Portfolio", 
  onTabChange,
  onSignOut
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const tabs = ['Portfolio', 'Watchlist', 'Orders', 'Analytics'];

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside mobile menu (include both button and menu content)
      if (showMobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        // Also check if click is on the mobile menu button
        const mobileMenuButton = document.querySelector('.lg\\:hidden[class*="p-2"]');
        if (!mobileMenuButton || !mobileMenuButton.contains(event.target)) {
          setShowMobileMenu(false);
        }
      }
      
      // Check if click is outside user menu
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    // Only add event listener if at least one menu is open
    if (showMobileMenu || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showMobileMenu, showUserMenu]);

  return (
    <div className="bg-white border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Left side - Mobile Menu, Logo and Navigation */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                console.log('Hamburger menu clicked, current showMobileMenu:', showMobileMenu);
                setShowMobileMenu(!showMobileMenu);
                console.log('Setting showMobileMenu to:', !showMobileMenu);
              }}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs lg:text-sm">T</span>
              </div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">TradingApp</h1>
            </div>
            
            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 lg:h-5 lg:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <button className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
            
            <button className="hidden sm:block p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
            
            {/* User Menu */}
            <div className="relative pl-2 lg:pl-4 border-l border-gray-200" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 lg:space-x-2 hover:bg-gray-100 rounded-lg p-1 lg:p-2 transition-colors"
              >
                <div className="w-7 h-7 lg:w-8 lg:h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs lg:text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  {userEmail && (
                    <div className="text-xs text-gray-500 truncate max-w-32">{userEmail}</div>
                  )}
                </div>
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{userName}</div>
                    {userEmail && (
                      <div className="text-xs text-gray-500 truncate">{userEmail}</div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Add profile navigation logic here
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Add settings navigation logic here
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  {/* Mobile-only menu items */}
                  <div className="sm:hidden border-t border-gray-100">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add notifications logic here
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </button>
                  </div>
                  {onSignOut && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Overlay */}
        {showMobileMenu && (
          <div 
            className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-40"
            ref={mobileMenuRef}
          >
            {console.log('Mobile menu is rendering, showMobileMenu:', showMobileMenu)}
            <nav className="flex flex-col space-y-1 px-4 sm:px-6 py-3">
              {tabs.map((tab) => {
                console.log('Rendering mobile tab:', tab);
                return (
                  <button
                    key={tab}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Mobile tab clicked:', tab, 'activeTab:', activeTab, 'onTabChange exists:', !!onTabChange);
                      console.log('onTabChange function:', onTabChange);
                      if (onTabChange) {
                        console.log('Calling onTabChange with:', tab);
                        onTabChange(tab);
                      } else {
                        console.log('onTabChange is not defined!');
                      }
                      // Close menu after tab change
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}