import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { useDarkMode } from '../hooks/useDarkMode';

interface AuthScreenProps {
  onGetStarted: (userData: { name: string; age: number }) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onGetStarted }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });

  const { isDarkMode } = useDarkMode();

  const fictionalNames = [
    { name: 'Amara Okafor', age: 22 },
    { name: 'Kwame Asante', age: 24 },
    { name: 'Fatima Hassan', age: 21 },
    { name: 'Chidi Nwosu', age: 23 },
    { name: 'Zara Mwangi', age: 20 },
    { name: 'Kofi Mensah', age: 25 }
  ];

  const handleSocialAuth = (provider: string) => {
    // Use fictional names instead of generic ones
    const randomUser = fictionalNames[Math.floor(Math.random() * fictionalNames.length)];
    onGetStarted(randomUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate login with fictional name
      const randomUser = fictionalNames[Math.floor(Math.random() * fictionalNames.length)];
      onGetStarted(randomUser);
    } else {
      // Simulate signup
      if (formData.name && formData.age) {
        onGetStarted({ name: formData.name, age: parseInt(formData.age) });
      }
    }
  };

  const socialButtons = [
    { name: 'Google', color: 'bg-red-500 hover:bg-red-600', icon: '🔍' },
    { name: 'Microsoft', color: 'bg-blue-600 hover:bg-blue-700', icon: '🪟' },
    { name: 'Apple', color: 'bg-gray-800 hover:bg-gray-900', icon: '🍎' }
  ];

  return (
    <div className={`min-h-screen p-4 flex flex-col justify-center max-w-md mx-auto animate-fade-in bg-white dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
          <span className="text-2xl text-white font-bold">E</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {isLogin ? 'Welcome Back!' : 'Join Edutu'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isLogin ? 'Sign in to continue your journey' : 'Start your journey to success'}
        </p>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3 mb-6">
        {socialButtons.map((social) => (
          <button
            key={social.name}
            onClick={() => handleSocialAuth(social.name)}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl text-white font-medium transition-all transform hover:scale-105 ${social.color}`}
          >
            <span className="text-lg">{social.icon}</span>
            Continue with {social.name}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* Form */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                min="16"
                max="30"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Your age"
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {isLogin && (
          <div className="text-center mt-4">
            <button className="text-sm text-primary hover:underline">
              Forgot your password?
            </button>
          </div>
        )}
      </Card>

      {/* Switch Auth Mode */}
      <div className="text-center mt-6">
        <p className="text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-primary font-medium hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;