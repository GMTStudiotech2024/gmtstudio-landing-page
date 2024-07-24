import React, { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthorizedUser {
  userId: string;
  passcode: string;
}

const authorizedUsers: AuthorizedUser[] = [
  { userId: 'Alston@20070119', passcode: 'GMT001A' },
  { userId: 'Lucas@Yeh', passcode: 'GMT002A' },
  { userId: 'user3@example.com', passcode: 'password3' },
  // Add more users as needed
];

const SignUpLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = authorizedUsers.find(u => u.userId === email && u.passcode === password);
      if (user) {
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); // 2-second delay
      } else {
        setError('Invalid email or password. If you need access to the beta, please contact us.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-500 dark:from-gray-900 dark:to-gray-800">
      {isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Loading to Developer Website...
          </h2>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Website Beta Access
          </h2>
          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need access to the beta? Please contact us for an account.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SignUpLoginPage;
