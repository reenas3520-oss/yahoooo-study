import React, { useState } from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';

interface AuthPageProps {
  onLoginSuccess: (email: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (isLoginMode) {
      const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
      if (storedUsers.includes(email)) {
        onLoginSuccess(email);
      } else {
        setError('No account found with this email. Please sign up.');
      }
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
      if (storedUsers.includes(email)) {
        setError('An account with this email already exists. Please log in.');
      } else {
        const newUsers = [...storedUsers, email];
        localStorage.setItem('appUsers', JSON.stringify(newUsers));
        onLoginSuccess(email);
      }
    }
  };
  
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    const email = provider === 'google' ? 'user@google.com' : 'user@facebook.com';
    const storedUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
    if (!storedUsers.includes(email)) {
        const newUsers = [...storedUsers, email];
        localStorage.setItem('appUsers', JSON.stringify(newUsers));
    }
    onLoginSuccess(email);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                    <BrainCircuitIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Germ Study AI</h1>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-white">{isLoginMode ? 'Welcome Back!' : 'Create Your Account'}</h2>
            <p className="mt-2 text-sm text-gray-400">
            {isLoginMode ? 'Log in to continue your learning journey.' : 'Sign up to get started with your AI study buddy.'}
            </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform active:scale-[0.98] transition-transform shadow-lg">
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-gray-600" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800/60 text-gray-400">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin('google')} className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform active:scale-[0.98]">
              <GoogleIcon className="w-5 h-5 mr-3" /> Sign in with Google
            </button>
            <button onClick={() => handleSocialLogin('facebook')} className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform active:scale-[0.98]">
              <FacebookIcon className="w-5 h-5 mr-3" /> Sign in with Facebook
            </button>
        </div>

        <div className="text-sm text-center">
          <button onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }} className="font-medium text-indigo-400 hover:text-indigo-300">
            {isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};