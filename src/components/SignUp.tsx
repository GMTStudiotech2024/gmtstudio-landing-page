import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { account } from '../appwriteConfig';

const SignUpLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null); // Reset error on form switch
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on form submit

    try {
      if (isLogin) {
        // Login
        await account.createSession(email, password);
        alert('Logged in successfully');
      } else {
        // Sign Up
        await account.create('unique()', email, password, username);
        alert('Signed up successfully');
      }
    } catch (error) {
      console.error(error);
      setError('The Login and Sign Up function is not implemented yet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-500 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                Username
              </label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <User className="mr-2 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Email
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <Mail className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Password
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <Lock className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500 dark:text-gray-400" />
                ) : (
                  <Eye className="text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-500"
              disabled={loading}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpLoginPage;
