import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthorizedUser {
  userId: string;
  passcode: string;
}

const authorizedUsers: AuthorizedUser[] = [
  { userId: 'Alston@20070119', passcode: 'GMT001A' },
  { userId: 'Lucas@Yeh', passcode: 'GMT002A' },
  { userId: 'Willy@lin', passcode: 'GMT003A' },
  // Add more users as needed
];

interface SignUpLoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

const SignUpLoginPage: React.FC<SignUpLoginPageProps> = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = authorizedUsers.find(u => u.userId === email && u.passcode === password);
      if (user) {
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        await new Promise(resolve => setTimeout(resolve, 4000));
        navigate('/dashboard');
      } else {
        setError('Access denied. Contact support for beta access.');
      }
    } catch (error) {
      console.error(error);
      setError('System error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.1 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <AnimatePresence mode="wait">
        {isLoggedIn ? (
          <motion.div
            key="logged-in"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl w-full max-w-md text-center backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30"
          >
            <h2 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 dark:from-blue-300 dark:to-purple-400">
              Welcome to GMTStudio
            </h2>
            <p className="text-xl text-white dark:text-gray-200 mb-8">
              Initializing your developer environment...
            </p>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-500 border-opacity-30 rounded-full animate-ping"></div>
              <div className="absolute top-0 left-0 w-full h-full border-8 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30"
          >
            <h2 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 dark:from-blue-300 dark:to-purple-400">
              GMTStudio Beta
            </h2>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl flex items-center"
                >
                  <AlertCircle className="mr-3 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-white dark:text-gray-200 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-transparent rounded-xl bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white dark:text-gray-200 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border-2 border-transparent rounded-xl bg-white bg-opacity-20 dark:bg-gray-700 dark:bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none transition duration-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  ) : (
                    <LogIn className="mr-3" />
                  )}
                  {loading ? 'Authenticating...' : 'Access Beta'}
                </button>
              </div>
            </form>
            <div className="mt-10 text-center">
              <p className="text-sm text-white dark:text-gray-300">
                Need beta access?{' '}
                <a href="#" className="text-blue-300 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition duration-200 underline">
                  Request an invite
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpLoginPage;
