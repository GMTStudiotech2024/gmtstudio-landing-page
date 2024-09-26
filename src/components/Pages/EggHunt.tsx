import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TbEgg,
  TbEggCracked,
  TbEggFried,
  TbBrandMinecraft,
  TbTicket,
  TbMap,
} from 'react-icons/tb';
import { GiAchievement } from "react-icons/gi";
import { TbBorderAll } from "react-icons/tb";

const EggHuntGame: React.FC = () => {
  // Define the egg types with their prices and probabilities
  type Egg = {
    id: number;
    name: string;
    price: number;
    winMultiplier: number; // Multiplier for big win
    winChance: number; // Chance to win something
    bigWinChance: number; // Chance to get a big win
    smallWinAmount: number; // Fixed small win amount
    color: string; // Color of the egg
    icon: JSX.Element; // Icon representing the egg
    description: string; // Description of the egg
    unlockLevel: number; // Level required to unlock the egg
  };

  const eggs: Egg[] = [
    {
      id: 1,
      name: 'Small Egg',
      price: 1,
      winMultiplier: 2,
      winChance: 90, // 90% chance to win
      bigWinChance: 2, // Reduced big win chance
      smallWinAmount: 5, // Small win amount
      color: '#FFD700',
      icon: <TbEgg className="w-16 h-16 text-yellow-500" />,
      description: 'A basic egg with high chances of winning.',
      unlockLevel: 1,
    },
    {
      id: 2,
      name: 'Medium Egg',
      price: 10,
      winMultiplier: 3,
      winChance: 65,
      bigWinChance: 6,
      smallWinAmount: 12,
      color: '#C0C0C0',
      icon: <TbEgg className="w-16 h-16 text-gray-400" />,
      description: 'A medium egg with balanced stats.',
      unlockLevel: 2,
    },
    {
      id: 3,
      name: 'Large Egg',
      price: 100,
      winMultiplier: 5,
      winChance: 55,
      bigWinChance: 7,
      smallWinAmount: 130,
      color: '#CD7F32',
      icon: <TbEgg className="w-16 h-16 text-yellow-800" />,
      description: 'A large egg with bigger rewards.',
      unlockLevel: 3,
    },
    {
      id: 4,
      name: 'Golden Egg',
      price: 1000,
      winMultiplier: 10,
      winChance: 45,
      bigWinChance: 8,
      smallWinAmount: 2500,
      color: '#FFD700',
      icon: <TbEgg className="w-16 h-16 text-yellow-500" />,
      description: 'A rare golden egg with great rewards.',
      unlockLevel: 5,
    },
    {
      id: 5,
      name: 'Diamond Egg',
      price: 10000,
      winMultiplier: 20,
      winChance: 30,
      bigWinChance: 10,
      smallWinAmount: 5000,
      color: '#B9F2FF',
      icon: <TbEgg className="w-16 h-16 text-blue-300" />,
      description: 'An exquisite diamond egg with massive rewards.',
      unlockLevel: 7,
    },
    {
      id: 6,
      name: 'Dragon Egg',
      price: 50000,
      winMultiplier: 25,
      winChance: 20,
      bigWinChance: 15,
      smallWinAmount: 10000,
      color: '#8B0000',
      icon: <TbEgg className="w-16 h-16 text-red-800" />,
      description: 'A mythical dragon egg with fiery rewards.',
      unlockLevel: 10,
    },
    {
      id: 7,
      name: 'Mystic Egg',
      price: 100000,
      winMultiplier: 30,
      winChance: 15,
      bigWinChance: 20,
      smallWinAmount: 20000,
      color: '#4B0082',
      icon: <TbEgg className="w-16 h-16 text-indigo-700" />,
      description: 'A mystic egg shrouded in mystery.',
      unlockLevel: 12,
    },
    {
      id: 8,
      name: 'Shadow Egg',
      price: 500000,
      winMultiplier: 50,
      winChance: 10,
      bigWinChance: 25,
      smallWinAmount: 50000,
      color: '#0D0D0D',
      icon: <TbEgg className="w-16 h-16 text-gray-900" />,
      description: 'An enigmatic egg with mysterious powers.',
      unlockLevel: 15,
    },
    {
      id: 9,
      name: 'Celestial Egg',
      price: 1000000,
      winMultiplier: 100,
      winChance: 5,
      bigWinChance: 30,
      smallWinAmount: 100000,
      color: '#E0FFFF',
      icon: <TbEgg className="w-16 h-16 text-blue-200" />,
      description: 'A legendary egg from the heavens.',
      unlockLevel: 20,
    },
  ];

  type EggState =
    | 'initial'
    | 'shiver-cracked'
    | 'cracked'
    | 'shiver-fried'
    | 'fried'
    | 'win'
    | 'big-win';

  const [eggState, setEggState] = useState<EggState>('initial');
  const [isEggDisabled, setIsEggDisabled] = useState(false);
  const [funds, setFunds] = useState<number>(10);
  const [eggInventory, setEggInventory] = useState<{ [key: number]: number }>({});
  const [selectedEggType, setSelectedEggType] = useState<Egg | null>(null);
  const [message, setMessage] = useState<string>('');
  const [tickets, setTickets] = useState<number>(0);
  const [slotResult, setSlotResult] = useState<string>('');
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [quests, setQuests] = useState<string[]>([]);
  const [showQuests, setShowQuests] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);

  useEffect(() => {
    // Load data from localStorage
    const storedFunds = localStorage.getItem('funds');
    if (storedFunds !== null) setFunds(parseFloat(storedFunds));

    const storedInventory = localStorage.getItem('eggInventory');
    if (storedInventory) setEggInventory(JSON.parse(storedInventory));

    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets !== null) setTickets(parseInt(storedTickets));

    const storedXp = localStorage.getItem('xp');
    if (storedXp !== null) setXp(parseInt(storedXp));

    const storedLevel = localStorage.getItem('level');
    if (storedLevel !== null) setLevel(parseInt(storedLevel));

    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));

    const storedQuests = localStorage.getItem('quests');
    if (storedQuests) setQuests(JSON.parse(storedQuests));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('funds', funds.toString());
    localStorage.setItem('eggInventory', JSON.stringify(eggInventory));
    localStorage.setItem('tickets', tickets.toString());
    localStorage.setItem('xp', xp.toString());
    localStorage.setItem('level', level.toString());
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [funds, eggInventory, tickets, xp, level, achievements, quests]);

  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMessage(`Congratulations! You've reached level ${newLevel}!`);
    }
  }, [xp]);

  const handleEggPurchase = (egg: Egg, quantity: number) => {
    const totalCost = egg.price * quantity;
    if (funds >= totalCost) {
      if (level >= egg.unlockLevel) {
        setFunds(funds - totalCost);
        setEggInventory((prevInventory) => ({
          ...prevInventory,
          [egg.id]: (prevInventory[egg.id] || 0) + quantity,
        }));
        setMessage(`You purchased ${quantity} ${egg.name}(s)!`);
        checkForQuests('PurchaseEggs');
      } else {
        setMessage(`You need to be level ${egg.unlockLevel} to buy ${egg.name}.`);
      }
    } else {
      setMessage("You don't have enough funds to buy these eggs.");
    }
  };

  const handleEggSelect = (egg: Egg) => {
    if (!eggInventory[egg.id] || eggInventory[egg.id] <= 0) {
      setMessage(`You don't have any ${egg.name}s. Purchase some first!`);
      return;
    }
    setSelectedEggType(egg);
    setEggState('initial');
    setIsEggDisabled(false);
    setMessage('');
  };

  const handleEggClick = () => {
    if (isEggDisabled || !selectedEggType) return;
    setIsEggDisabled(true);

    if (eggState === 'initial') {
      setEggState('shiver-cracked');
      setTimeout(() => {
        setEggState('cracked');
        setIsEggDisabled(false);
      }, 1000);
    } else if (eggState === 'cracked') {
      setEggInventory((prevInventory) => ({
        ...prevInventory,
        [selectedEggType.id]: Math.max(
          (prevInventory[selectedEggType.id] || 0) - 1,
          0
        ),
      }));

      setEggState('shiver-fried');
      setTimeout(() => {
        const randomNum = Math.random() * 100;
        if (randomNum < selectedEggType.winChance) {
          const bigWinNum = Math.random() * 100;
          if (bigWinNum < selectedEggType.bigWinChance) {
            setEggState('big-win');
            const winnings = selectedEggType.price * selectedEggType.winMultiplier * 0.5;
            setFunds((prevFunds) => prevFunds + winnings);
            setMessage(`Jackpot! You won $${winnings.toLocaleString()}!`);
          } else {
            setEggState('win');
            setFunds((prevFunds) => prevFunds + selectedEggType.smallWinAmount);
            setMessage(
              `Congratulations! You won $${selectedEggType.smallWinAmount.toLocaleString()}!`
            );
          }
          setXp((prevXp) => prevXp + 20);
          checkForQuests('WinPrize');
        } else {
          setEggState('fried');
          setMessage("Oh no! The egg was fried. You didn't get anything.");
          setXp((prevXp) => prevXp + 5);
        }

        const ticketChance = Math.random() * 100;
        if (ticketChance < 50) {
          setTickets((prevTickets) => prevTickets + 1);
          setMessage((prev) => prev + ' You found a ticket!');
        }

        checkForAchievements();
        setTimeout(() => {
          setEggState('initial');
          setMessage('');
          setIsEggDisabled(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleResetGame = () => {
    setFunds(10);
    setTickets(0);
    setEggInventory({});
    setXp(0);
    setLevel(1);
    setAchievements([]);
    setQuests([]);
    localStorage.clear();
    setMessage('Game over. Your game has been reset.');
    setSelectedEggType(null);
    setEggState('initial');
  };

  const checkForAchievements = () => {
    if (funds >= 100000 && !achievements.includes('Wealthy')) {
      setAchievements((prev) => [...prev, 'Wealthy']);
      setMessage('Achievement Unlocked: Wealthy!');
    }
    if (xp >= 1000 && !achievements.includes('Veteran')) {
      setAchievements((prev) => [...prev, 'Veteran']);
      setMessage('Achievement Unlocked: Veteran!');
    }
    // More achievement checks...
  };

  const checkForQuests = (action: string) => {
    // Implement quest logic based on actions
    if (action === 'PurchaseEggs' && !quests.includes('Egg Buyer')) {
      setQuests((prev) => [...prev, 'Egg Buyer']);
      setFunds((prevFunds) => prevFunds + 10);
      setMessage('Quest Completed: Egg Buyer! You received $10!');
    }
    if (action === 'WinPrize' && !quests.includes('Lucky Winner')) {
      setQuests((prev) => [...prev, 'Lucky Winner']);
      setXp((prevXp) => prevXp + 1);
      setMessage('Quest Completed: Lucky Winner! You gained 100 XP!');
    }
    // More quest conditions...
  };

  const handlePlaySlotMachine = () => {
    if (tickets <= 0) {
      setMessage("You don't have any tickets to play the slot machine.");
      return;
    }

    setTickets(tickets - 1);
    const outcomes = ['Win', 'Lose', 'Win', 'Lose', 'Jackpot'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    if (result === 'Win') {
      const winnings = 100;
      setFunds((prevFunds) => prevFunds + winnings);
      setSlotResult(`You won $${winnings}!`);
      setXp((prevXp) => prevXp + 50);
    } else if (result === 'Jackpot') {
      const winnings = 1000;
      setFunds((prevFunds) => prevFunds + winnings);
      setSlotResult(`Jackpot! You won $${winnings}!`);
      setXp((prevXp) => prevXp + 200);
    } else {
      setSlotResult('You lost on the slot machine.');
    }
  };

  // useEffect hook to monitor egg counts
  useEffect(() => {
    if (selectedEggType && eggInventory[selectedEggType.id] === 0) {
      // Find the next available egg that the user has
      const availableEgg = eggs.find(
        (egg) => eggInventory[egg.id] > 0 && level >= egg.unlockLevel
      );
      setSelectedEggType(availableEgg || null);

      if (!availableEgg) {
        setMessage('No eggs available. Please purchase more eggs.');
      } else {
        setMessage(`Switched to ${availableEgg.name} as you ran out of ${selectedEggType.name}s.`);
      }
    }
  }, [eggInventory, selectedEggType, level]);

  // Updated handlePlay function
  const handlePlay = () => {
    if (!selectedEggType) {
      setMessage('No egg selected or no eggs available.');
      return;
    }

    if (eggInventory[selectedEggType.id] <= 0) {
      setMessage(`No ${selectedEggType.name}s left. Please buy more or select another egg.`);
      return;
    }

    // ... existing play logic ...

    // Deduct one egg
    setEggInventory((prevInventory) => ({
      ...prevInventory,
      [selectedEggType.id]: prevInventory[selectedEggType.id] - 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
          Egg Hunt Game
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <p className="text-xl text-gray-800 dark:text-white">
            Funds: ${funds.toFixed(2)}
          </p>
          <p className="text-xl text-gray-800 dark:text-white">
            Tickets: {tickets}
          </p>
          <p className="text-xl text-gray-800 dark:text-white">
            Level: {level} (XP: {xp})
          </p>
          <button
            onClick={() => setShowAchievements(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold flex items-center"
          >
            <GiAchievement className="w-5 h-5 mr-2" />
            Achievements
          </button>
          <button
            onClick={() => setShowQuests(true)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold flex items-center"
          >
            <TbMap className="w-5 h-5 mr-2" />
            Quests
          </button>
          <button
            onClick={() => setShowInventory(true)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold flex items-center"
          >
            <TbBorderAll className="w-5 h-5 mr-2" />
            Inventory
          </button>
        </div>
      </div>

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Achievements
            </h2>
            <ul className="list-disc list-inside">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {achievement}
                  </li>
                ))
              ) : (
                <li className="text-gray-700 dark:text-gray-300">
                  No achievements yet.
                </li>
              )}
            </ul>
            <button
              onClick={() => setShowAchievements(false)}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Quests Modal */}
      {showQuests && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Quests
            </h2>
            <ul className="list-disc list-inside">
              {quests.length > 0 ? (
                quests.map((quest, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {quest}
                  </li>
                ))
              ) : (
                <li className="text-gray-700 dark:text-gray-300">
                  No quests completed yet.
                </li>
              )}
            </ul>
            <button
              onClick={() => setShowQuests(false)}
              className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Inventory content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Inventory
            </h2>
            {/* Inventory items can be added here */}
            <button
              onClick={() => setShowInventory(false)}
              className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Egg Inventory */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
        {eggs.map((egg) => (
          <div
            key={egg.id}
            className={`flex flex-col items-center p-2 rounded-lg ${
              eggInventory[egg.id] > 0
                ? 'cursor-pointer bg-white/10'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => eggInventory[egg.id] > 0 && handleEggSelect(egg)}
          >
            {React.cloneElement(egg.icon, {
              className: 'w-12 h-12',
              color: egg.color,
            })}
            <span className="text-sm text-center text-gray-800 dark:text-white mt-2">
              {egg.name} x {eggInventory[egg.id] || 0}
            </span>
          </div>
        ))}
      </div>

      {/* Game Area */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-60 h-60 flex items-center justify-center bg-white/20 rounded-full relative">
          {selectedEggType ? (
            <motion.div
              className={`${
                isEggDisabled ? 'pointer-events-none' : 'cursor-pointer'
              }`}
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
              {eggState === 'initial' && (
                React.cloneElement(selectedEggType.icon, {
                  className: 'w-40 h-40 mx-auto',
                  color: selectedEggType.color,
                })
              )}
              {(eggState === 'cracked' || eggState === 'shiver-cracked') && (
                <TbEggCracked className="w-40 h-40 mx-auto text-yellow-500" />
              )}
              {(eggState === 'fried' || eggState === 'shiver-fried') && (
                <TbEggFried className="w-40 h-40 mx-auto text-yellow-500" />
              )}
              {(eggState === 'win' || eggState === 'big-win') && (
                <TbBrandMinecraft className="w-40 h-40 mx-auto text-green-500" />
              )}
            </motion.div>
          ) : (
            <p className="text-gray-500">Select an egg to start</p>
          )}
        </div>
        <motion.p
          className="text-xl mt-4 text-gray-800 dark:text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      </div>

      {/* Slot Machine */}
      {tickets > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePlaySlotMachine}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-full text-white font-semibold flex items-center"
          >
            <TbTicket className="w-6 h-6 mr-2" />
            Play Slot Machine
          </button>
        </div>
      )}

      {slotResult && (
        <div className="mt-4 text-xl text-gray-800 dark:text-white text-center">
          {slotResult}
        </div>
      )}

      {/* Egg Shop */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {eggs.map((egg) => (
          <div
            key={egg.id}
            className="group px-4 py-4 bg-white/10 rounded-lg flex flex-col items-center relative shadow-lg overflow-hidden"
          >
            {React.cloneElement(egg.icon, {
              className: 'w-12 h-12 sm:w-16 sm:h-16',
              color: egg.color,
            })}
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-200 tracking-wider text-lg sm:text-xl">
                {egg.name}
              </p>
              <p className="font-semibold text-gray-600 text-xs">
                {egg.description}
              </p>
              <p className="font-semibold text-gray-600 text-xs">
                Unlocks at Level {egg.unlockLevel}
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-[#abd373] font-semibold text-lg">
                ${egg.price.toLocaleString()}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                <button
                  onClick={() => handleEggPurchase(egg, 1)}
                  className={`px-4 py-2 bg-[#abd373] hover:bg-white/10 rounded-full text-gray-800 font-semibold ${
                    funds < egg.price || level < egg.unlockLevel
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={funds < egg.price || level < egg.unlockLevel}
                  title={`Buy 1 ${egg.name}`}
                >
                  Buy 1 Egg
                </button>
                <button
                  onClick={() => handleEggPurchase(egg, 10)}
                  className={`px-4 py-2 bg-[#abd373] hover:bg-white/10 rounded-full text-gray-800 font-semibold ${
                    funds < egg.price * 10 || level < egg.unlockLevel
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={funds < egg.price * 10 || level < egg.unlockLevel}
                  title={`Buy 10 ${egg.name}s`}
                >
                  Buy 10 Eggs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reset Game Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleResetGame}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default EggHuntGame;
