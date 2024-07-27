import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthorizedUser {
  userId: string;
  passcode: string;
}

const authorizedUsers: AuthorizedUser[] = [
  { userId: 'Alston@20070119', passcode: 'GMT001A' },
  { userId: 'Lucas@Yeh', passcode: 'GMT002A' },
  { userId: 'Willy@lin', passcode: 'GMT003A' },
  { userId: 'jerry20070513@gmail.com', passcode: 'GMT004A' },
  { userId: 'Waiting@666', passcode: 'GMT005A' }
];

interface SignUpLoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

const SignUpLoginPage: React.FC<SignUpLoginPageProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const user = authorizedUsers.find(u => u.userId === email && u.passcode === password);
    if (user) {
      setIsAuthenticated(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          GMTStudio Beta
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Need beta access?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Request an invite
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpLoginPage;