'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, BarChart3, Users, Shield, ChevronRight, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { signUp, signIn, signOutUser, onAuthStateChange, getCurrentUser, getUserData } from './components/auth.js';

// Type definitions
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  // Add other user data properties as needed
}

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  // Add other auth user properties as needed
}

export default function LandingPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser: AuthUser | null) => {
      if (authUser) {
        setUser(authUser);
        // Get additional user data from Firestore
        const result = await getUserData(authUser.uid);
        if (result.success) {
          setUserData(result.data as UserData);
        }
        setLoading(false);
        // Redirect authenticated users to dashboard
        console.log('User authenticated, redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        // User is not authenticated, stay on landing page
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [router]);

  // Check for existing user on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('Current user on mount:', currentUser);
    if (currentUser) {
      console.log('Existing user found, redirecting to dashboard...');
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ text: '', type: '' });
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validation for sign up
        if (formData.password !== formData.confirmPassword) {
          showMessage('Passwords do not match!', 'error');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          showMessage('Password must be at least 6 characters long', 'error');
          setIsLoading(false);
          return;
        }
        if (!formData.name.trim()) {
          showMessage('Name is required', 'error');
          setIsLoading(false);
          return;
        }

        // Call actual Firebase signUp function
        const result = await signUp(formData.email, formData.password, formData.name.trim());
        
        if (result.success) {
          showMessage('Account created successfully! Redirecting to dashboard...', 'success');
          // Reset form
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          // User state will be updated by onAuthStateChange listener
        } else {
          showMessage(result.error, 'error');
        }
      } else {
        // Call actual Firebase signIn function
        const result = await signIn(formData.email, formData.password);
        
        if (result.success) {
          showMessage('Welcome back! Redirecting to dashboard...', 'success');
          // Reset form
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          // User state will be updated by onAuthStateChange listener
        } else {
          showMessage(result.error, 'error');
        }
      }
    } catch (error) {
      showMessage('An unexpected error occurred. Please try again.', 'error');
      console.error('Auth error:', error);
    }

    setIsLoading(false);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">TradeSim</span>
          </div>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </nav>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Hero Content */}
        <div className="flex-1 px-6 py-12 flex items-center">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Master Trading
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {' '}Risk-Free
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8">
              Practice trading with real market data, compete with others, and build your skills without risking a penny.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-emerald-400" />
                <span className="text-slate-200">Real-time market simulation</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-emerald-400" />
                <span className="text-slate-200">Competitive leaderboards</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="text-slate-200">100% risk-free trading</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-emerald-400">
              <span className="text-lg font-semibold">Get started today</span>
              <ChevronRight className="h-5 w-5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 px-6 py-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-2 text-center">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-slate-300 text-center mb-8">
                {isSignUp ? 'Start your trading journey' : 'Continue your trading journey'}
              </p>

              {/* Message Display */}
              {message.text && (
                <div className={`flex items-center space-x-2 p-3 rounded-lg mb-6 ${
                  message.type === 'success' 
                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading 
                    ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                    : (isSignUp ? 'Create Account' : 'Sign In')
                  }
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  disabled={isLoading}
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}