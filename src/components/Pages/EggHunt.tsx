import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbEgg, TbEggCracked, TbEggFried } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const EasterEggPage: React.FC = () => {
  type EggState = 'initial' | 'shiver-cracked' | 'cracked' | 'shiver-fried' | 'fried';

  const [eggState, setEggState] = useState<EggState>('initial');
  const [isEggDisabled, setIsEggDisabled] = useState(false);

  const handleEggClick = () => {
    if (isEggDisabled) return;

    setIsEggDisabled(true);

    if (eggState === 'initial') {
      setEggState('shiver-cracked');
      setTimeout(() => {
        setEggState('cracked');
        setIsEggDisabled(false);
      }, 2000);
    } else if (eggState === 'cracked') {
      setEggState('shiver-fried');
      setTimeout(() => {
        setEggState('fried');
        setIsEggDisabled(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <motion.div
          className={`mb-5 ${isEggDisabled ? 'pointer-events-none' : 'cursor-pointer'}`}
          onClick={handleEggClick}
          animate={
            eggState === 'shiver-cracked' || eggState === 'shiver-fried'
              ? { rotate: [0, -10, 10, -10, 10, 0] }
              : {}
          }
          transition={
            eggState === 'shiver-cracked' || eggState === 'shiver-fried'
              ? { duration: 0.5, repeat: 3 }
              : {}
          }
        >
          {eggState === 'initial' && <TbEgg className="w-40 h-40 mx-auto text-yellow-500" />}
          {(eggState === 'cracked' || eggState === 'shiver-cracked') && (
            <TbEggCracked className="w-40 h-40 mx-auto text-yellow-500" />
          )}
          {(eggState === 'fried' || eggState === 'shiver-fried') && (
            <TbEggFried className="w-40 h-40 mx-auto text-yellow-500" />
          )}
        </motion.div>
        {eggState === 'fried' || eggState === 'shiver-fried' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-2xl mb-4 text-gray-800 dark:text-white">
              Congratulations! You've discovered the secret.
            </p>
            <Link
              to="/egg-hunter"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold"
            >
              Start the Egg Hunt
            </Link>
          </motion.div>
        ) : (
          <motion.p
            className="text-xl mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Press it, I know you want to
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default EasterEggPage;
