import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TbEgg,
  TbEggCracked,
  TbEggFried,
  TbBrandMinecraft,
  TbTicket,
  TbMoodHappy,
  TbMoodSad,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';

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
  };

  const eggs: Egg[] = [
    {
      id: 1,
      name: 'Small Egg',
      price: 1,
      winMultiplier: 2,
      winChance: 90, // 90% chance to win
      bigWinChance: 5, // 5% chance for big win
      smallWinAmount: 5, // Small win amount
    },
    {
      id: 2,
      name: 'Medium Egg',
      price: 10,
      winMultiplier: 3,
      winChance: 65,
      bigWinChance: 6,
      smallWinAmount: 12,
    },
    {
      id: 3,
      name: 'Large Egg',
      price: 100,
      winMultiplier: 5,
      winChance: 55,
      bigWinChance: 7,
      smallWinAmount: 130,
    },
    {
      id: 4,
      name: 'Golden Egg',
      price: 1000,
      winMultiplier: 10,
      winChance: 45,
      bigWinChance: 8,
      smallWinAmount: 2500,
    },
    {
      id: 5,
      name: 'Diamond Egg',
      price: 1000000,
      winMultiplier: 20,
      winChance: 30,
      bigWinChance: 10,
      smallWinAmount: 5000000,
    },
    // Add more eggs as needed
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
  const [eggInventory, setEggInventory] = useState<{ [key: number]: number }>(
    {}
  );
  const [selectedEggType, setSelectedEggType] = useState<Egg | null>(null);
  const [message, setMessage] = useState<string>('');
  const [tickets, setTickets] = useState<number>(0);
  const [showSlotMachine, setShowSlotMachine] = useState<boolean>(false);
  const [slotResult, setSlotResult] = useState<string>('');
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    // Load funds from localStorage
    const storedFunds = localStorage.getItem('funds');
    if (storedFunds !== null) {
      setFunds(parseFloat(storedFunds));
    }
    // Load egg inventory from localStorage
    const storedInventory = localStorage.getItem('eggInventory');
    if (storedInventory) {
      setEggInventory(JSON.parse(storedInventory));
    }
    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets !== null) {
      setTickets(parseInt(storedTickets));
    }
  }, []);

  useEffect(() => {
    // Save funds to localStorage
    localStorage.setItem('funds', funds.toString());
  }, [funds]);

  useEffect(() => {
    // Save egg inventory to localStorage
    localStorage.setItem('eggInventory', JSON.stringify(eggInventory));
  }, [eggInventory]);

  useEffect(() => {
    // Save tickets to localStorage
    localStorage.setItem('tickets', tickets.toString());
  }, [tickets]);

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
      setFunds(funds - totalCost);
      setEggInventory((prevInventory) => ({
        ...prevInventory,
        [egg.id]: (prevInventory[egg.id] || 0) + quantity,
      }));
      setMessage(`You purchased ${quantity} ${egg.name}(s)!`);
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

    // Prevent interaction if no eggs left
    if (eggInventory[selectedEggType.id] <= 0) {
      setMessage(`You don't have any ${selectedEggType.name}s left.`);
      return;
    }

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
        // Decrease the egg count here after action completes
        setEggInventory((prevInventory) => {
          const newCount = Math.max((prevInventory[selectedEggType.id] || 1) - 1, 0);
          return {
            ...prevInventory,
            [selectedEggType.id]: newCount,
          };
        });

        // Calculate outcome based on probabilities
        const randomNum = Math.random() * 100;
        if (randomNum < selectedEggType.winChance) {
          // Win
          const bigWinNum = Math.random() * 100;
          if (bigWinNum < selectedEggType.bigWinChance) {
            // Big win
            setEggState('big-win');
            const winnings = selectedEggType.price * selectedEggType.winMultiplier;
            setFunds((prevFunds) => prevFunds + winnings);
            setMessage(`Jackpot! You won $${winnings.toLocaleString()}!`);
          } else {
            // Small win
            setEggState('win');
            setFunds((prevFunds) => prevFunds + selectedEggType.smallWinAmount);
            setMessage(
              `Congratulations! You won $${selectedEggType.smallWinAmount.toLocaleString()}!`
            );
          }
          setXp((prevXp) => prevXp + 20);
        } else {
          // Lose
          setEggState('fried');
          setMessage("Oh no! The egg was fried. You didn't get anything.");
          setXp((prevXp) => prevXp + 5);
        }

        // 50% chance to get a ticket
        const ticketChance = Math.random() * 100;
        if (ticketChance < 50) {
          setTickets((prevTickets) => prevTickets + 1);
          setMessage((prev) => prev + ' You found a ticket!');
        }

        // Check for achievements
        checkForAchievements();

        // Reset after action completes
        setTimeout(() => {
          setEggState('initial');
          setSelectedEggType(null);
          setMessage('');
        }, 3000);
      }, 2000);
    }
  };

  const handleResetGame = () => {
    setFunds(10);
    setTickets(0);
    setEggInventory({});
    localStorage.setItem('funds', '10');
    localStorage.setItem('tickets', '0');
    localStorage.setItem('eggInventory', '{}');
    setMessage('Game over. Your funds have been reset.');
    setSelectedEggType(null);
    setEggState('initial');
  };

  const checkForAchievements = () => {
    if (funds >= 10000 && !achievements.includes('Rich')) {
      setAchievements((prev) => [...prev, 'Rich']);
      setMessage('Achievement Unlocked: Rich!');
    }
    // More achievement checks...
  };

  const handlePlaySlotMachine = () => {
    if (tickets <= 0) {
      setMessage("You don't have any tickets to play the slot machine.");
      return;
    }

    setTickets(tickets - 1);
    // Simple slot machine logic
    const outcomes = ['Win', 'Lose', 'Win', 'Lose', 'Jackpot'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    if (result === 'Win') {
      const winnings = 50;
      setFunds(funds + winnings);
      setSlotResult(`You won $${winnings}!`);
    } else if (result === 'Jackpot') {
      const winnings = 500;
      setFunds(funds + winnings);
      setSlotResult(`Jackpot! You won $${winnings}!`);
    } else {
      setSlotResult('You lost on the slot machine.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-8 py-4 bg-white/10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Egg Hunt Game
        </h1>
        <div className="flex items-center space-x-4">
          <div className="text-xl text-gray-700 dark:text-gray-300">
            Funds: ${funds.toLocaleString()}
          </div>
          <div className="text-xl text-gray-700 dark:text-gray-300">
            Level: {level}
          </div>
          <div className="flex items-center">
            <TbTicket className="w-8 h-8 text-yellow-500 mr-1" />
            <span className="text-xl text-gray-700 dark:text-gray-300">
              x {tickets}
            </span>
          </div>
          {funds <= 0 && (
            <button
              onClick={handleResetGame}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold"
            >
              Reset Game
            </button>
          )}
        </div>
      </div>

      {/* Egg Inventory */}
      <div className="w-full flex flex-wrap justify-center items-center mt-4">
        {eggs.map((egg) => (
          <div
            key={egg.id}
            className={`flex flex-col items-center m-2 ${
              eggInventory[egg.id] > 0 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => eggInventory[egg.id] > 0 && handleEggSelect(egg)}
          >
            <TbEgg className="w-12 h-12 text-yellow-500" />
            <span className="text-gray-800 dark:text-white">
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
              {/* Egg states rendering */}
              {eggState === 'initial' && (
                <TbEgg className="w-40 h-40 mx-auto text-yellow-500" />
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
          className="text-xl mt-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      </div>

      {/* Slot Machine */}
      {tickets > 0 && (
        <div className="mt-8">
          <button
            onClick={handlePlaySlotMachine}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold flex items-center"
          >
            <TbTicket className="w-6 h-6 mr-2" />
            Play Slot Machine
          </button>
        </div>
      )}

      {slotResult && (
        <div className="mt-4 text-xl text-gray-800 dark:text-white">
          {slotResult}
        </div>
      )}

      {/* Egg Shop */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-8">
        {eggs.map((egg) => (
          <div
            key={egg.id}
            className="group px-6 py-4 bg-white/10 rounded-lg flex flex-col items-center relative shadow-lg overflow-hidden"
          >
            <TbEgg className="w-16 h-16 text-[#abd373]" />
            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-200 tracking-wider text-xl">
                {egg.name}
              </p>
              <p className="font-semibold text-gray-600 text-xs">
                Special Egg: Increase your chances!
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-[#abd373] font-semibold text-lg">
                ${egg.price.toLocaleString()}
              </p>
              <button
                onClick={() => handleEggPurchase(egg, 1)}
                className={`mt-2 px-4 py-2 bg-[#abd373] hover:bg-white/10 rounded-full text-gray-800 font-semibold ${
                  funds < egg.price ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={funds < egg.price}
                title={`Buy 1 ${egg.name}`}
              >
                Buy 1 Egg
              </button>
              <button
                onClick={() => handleEggPurchase(egg, 10)}
                className={`mt-2 ml-2 px-4 py-2 bg-[#abd373] hover:bg-white/10 rounded-full text-gray-800 font-semibold ${
                  funds < egg.price * 10 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={funds < egg.price * 10}
                title={`Buy 10 ${egg.name}s`}
              >
                Buy 10 Eggs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EggHuntGame;
