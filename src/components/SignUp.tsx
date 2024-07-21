import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Eye, EyeOff, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    google: any;
  }
}

const SignUpLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        callback: handleGoogleSignIn
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login or signup logic
    console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password, username });
  };

  const handleGoogleSignIn = (response: any) => {
    // Handle the Google Sign-In response
    console.log('Google Sign-In successful', response);
    // Here you would typically send the ID token to your backend
    // and create a session for the user
  };

  const handleGitHubSignIn = () => {
    // GitHub OAuth flow
    const githubClientId = 'Ov23liKnsJDLfVgmCEMx';
    const redirectUri = encodeURIComponent('https://gmtstudio-tech.vercel.app/');
    const scope = 'read:user user:email';
    const state = generateRandomString(16); // Generate a random state parameter
    
    // Store the state in localStorage to verify it when GitHub redirects back
    localStorage.setItem('githubOAuthState', state);

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    
    window.location.href = githubAuthUrl;
  };

  // Helper function to generate a random string for the state parameter
  const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
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
        {/* ... (rest of the component remains the same) ... */}
        <div className="mt-4 space-y-2">
          <div id="googleSignInButton"></div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGitHubSignIn}
            className="w-full flex items-center justify-center bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition-all duration-300 font-semibold"
          >
            <Github className="mr-2" size={20} />
            Sign in with GitHub
          </motion.button>
        </div>
        {/* ... (rest of the component remains the same) ... */}
      </motion.div>
    </div>
  );
};

export default SignUpLoginPage;