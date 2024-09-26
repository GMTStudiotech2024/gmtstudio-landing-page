import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TbEgg,
  TbEggCracked,
  TbEggFried,
  TbBrandMinecraft,
  TbTicket,
  TbMap,
  TbGift, // Importing gift icon for the daily reward
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
    xpGainWin: number; // XP gained when winning
    xpGainLoss: number; // XP gained when losing
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
      xpGainWin: 4,   // Added XP gain properties
      xpGainLoss: 2,
    },
    {
      id: 2,
      name: 'Medium Egg',
      price: 10,
      winMultiplier: 3,
      winChance: 85,
      bigWinChance: 6,
      smallWinAmount: 12,
      color: '#C0C0C0',
      icon: <TbEgg className="w-16 h-16 text-gray-400" />,
      description: 'A medium egg with balanced stats.',
      unlockLevel: 2,
      xpGainWin: 8,
      xpGainLoss: 7,
    },
    {
      id: 3,
      name: 'Large Egg',
      price: 100,
      winMultiplier: 5,
      winChance: 75,
      bigWinChance: 7,
      smallWinAmount: 130,
      color: '#CD7F32',
      icon: <TbEgg className="w-16 h-16 text-yellow-800" />,
      description: 'A large egg with bigger rewards.',
      unlockLevel: 3,
      xpGainWin: 15,
      xpGainLoss: 10,
    },
    {
      id: 4,
      name: 'Golden Egg',
      price: 1000,
      winMultiplier: 10,
      winChance: 70,
      bigWinChance: 8,
      smallWinAmount: 2500,
      color: '#FFD700',
      icon: <TbEgg className="w-16 h-16 text-yellow-500" />,
      description: 'A rare golden egg with great rewards.',
      unlockLevel: 5,
      xpGainWin: 20,
      xpGainLoss: 5,
    },
    {
      id: 5,
      name: 'Diamond Egg',
      price: 10000,
      winMultiplier: 20,
      winChance: 65,
      bigWinChance: 10,
      smallWinAmount: 15000,
      color: '#B9F2FF',
      icon: <TbEgg className="w-16 h-16 text-blue-300" />,
      description: 'An exquisite diamond egg with massive rewards.',
      unlockLevel: 7,
      xpGainWin: 25,
      xpGainLoss: 7,
    },
    {
      id: 6,
      name: 'Dragon Egg',
      price: 50000,
      winMultiplier: 25,
      winChance: 60,
      bigWinChance: 15,
      smallWinAmount: 65000,
      color: '#8B0000',
      icon: <TbEgg className="w-16 h-16 text-red-800" />,
      description: 'A mythical dragon egg with fiery rewards.',
      unlockLevel: 10,
      xpGainWin: 30,
      xpGainLoss: 10,
    },
    {
      id: 7,
      name: 'Mystic Egg',
      price: 100000,
      winMultiplier: 30,
      winChance: 55,
      bigWinChance: 20,
      smallWinAmount: 1250000,
      color: '#4B0082',
      icon: <TbEgg className="w-16 h-16 text-indigo-700" />,
      description: 'A mystic egg shrouded in mystery.',
      unlockLevel: 12,
      xpGainWin: 35,
      xpGainLoss: 12,
    },
    {
      id: 8,
      name: 'Shadow Egg',
      price: 500000,
      winMultiplier: 50,
      winChance: 50,
      bigWinChance: 25,
      smallWinAmount: 550000,
      color: '#0D0D0D',
      icon: <TbEgg className="w-16 h-16 text-purple-700" />,
      description: 'An enigmatic egg with mysterious powers.',
      unlockLevel: 15,
      xpGainWin: 40,
      xpGainLoss: 15,
    },
    {
      id: 9,
      name: 'Celestial Egg',
      price: 1000000,
      winMultiplier: 100,
      winChance: 45,
      bigWinChance: 30,
      smallWinAmount: 1200000,
      color: '#E0FFFF',
      icon: <TbEgg className="w-16 h-16 text-blue-200" />,
      description: 'A legendary egg from the heavens.',
      unlockLevel: 20,
      xpGainWin: 50,
      xpGainLoss: 20,
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
  const [xpToNextLevel, setXpToNextLevel] = useState<number>(100); // XP needed for next level
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [quests, setQuests] = useState<string[]>([]);
  const [showQuests, setShowQuests] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);

  // New state variables for pending achievements and quests
  const [pendingAchievements, setPendingAchievements] = useState<string[]>([]);
  const [pendingQuests, setPendingQuests] = useState<string[]>([]);

  // New state variables for the daily reward
  const [lastClaimedDate, setLastClaimedDate] = useState<string | null>(null);
  const [canClaimDailyReward, setCanClaimDailyReward] = useState<boolean>(false);

  // Function to check and add new pending achievements
  const addPendingAchievement = (achievement: string) => {
    if (!achievements.includes(achievement) && !pendingAchievements.includes(achievement)) {
      setPendingAchievements((prev) => [...prev, achievement]);
    }
  };

  // Function to check and add new pending quests
  const addPendingQuest = (quest: string) => {
    if (!quests.includes(quest) && !pendingQuests.includes(quest)) {
      setPendingQuests((prev) => [...prev, quest]);
    }
  };

  // Function to claim an achievement
  const claimAchievement = (achievement: string) => {
    setAchievements((prev) => [...prev, achievement]); // Add to claimed achievements
    setPendingAchievements((prev) => prev.filter((a) => a !== achievement));
    // Provide rewards here if any
    setMessage(`Achievement Claimed: ${achievement}!`);
    // Example reward
    setFunds((prevFunds) => prevFunds + 50);
  };

  // Function to claim a quest
  const claimQuest = (quest: string) => {
    setQuests((prev) => [...prev, quest]); // Add to claimed quests
    setPendingQuests((prev) => prev.filter((q) => q !== quest));
    // Provide rewards here if any
    setMessage(`Quest Claimed: ${quest}!`);
    // Example reward
    setXp((prevXp) => prevXp + 20);
  };

  // Function to calculate XP needed for the next level
  const xpForNextLevel = (level: number): number => {
    // Example formula: XP needed increases quadratically
    return 50 * Math.pow(level, 2);
  };

  useEffect(() => {
    // Update the XP needed for the next level whenever the level changes
    setXpToNextLevel(xpForNextLevel(level));
  }, [level]);

  useEffect(() => {
    // Check if the player has enough XP to level up
    if (xp >= xpToNextLevel) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setMessage(`Congratulations! You've reached level ${newLevel}!`);
      // Optionally subtract the XP used for leveling up
      setXp((prevXp) => prevXp - xpToNextLevel);
    }
  }, [xp]);

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

    // Load last claimed date from localStorage
    const storedLastClaimedDate = localStorage.getItem('lastClaimedDate');
    if (storedLastClaimedDate !== null) setLastClaimedDate(storedLastClaimedDate);
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

    // Save last claimed date to localStorage
    if (lastClaimedDate !== null) localStorage.setItem('lastClaimedDate', lastClaimedDate);
  }, [funds, eggInventory, tickets, xp, level, achievements, quests, lastClaimedDate]);

  useEffect(() => {
    // Determine if the daily reward can be claimed
    if (lastClaimedDate) {
      const lastDate = new Date(lastClaimedDate);
      const now = new Date();
      const timeDiff = now.getTime() - lastDate.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);
      if (hoursDiff >= 24) {
        setCanClaimDailyReward(true);
      } else {
        setCanClaimDailyReward(false);
      }
    } else {
      setCanClaimDailyReward(true);
    }
  }, [lastClaimedDate]);

  // Define the handleClaimDailyReward function before it's used
  const handleClaimDailyReward = () => {
    const rewardAmount = 100; // Define the reward amount
    setFunds((prevFunds) => prevFunds + rewardAmount);
    setMessage(`You've claimed your daily reward of $${rewardAmount.toLocaleString()}!`);
    const now = new Date();
    setLastClaimedDate(now.toISOString());
    setCanClaimDailyReward(false);
    // Optionally, give XP or other rewards
    setXp((prevXp) => prevXp + 50);
  };

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
      }, 500); // Reduced from 1000ms to 500ms
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
            const winnings =
              selectedEggType.price * selectedEggType.winMultiplier * 0.5;
            setFunds((prevFunds) => prevFunds + winnings);
            setMessage(`Jackpot! You won $${winnings.toLocaleString()}!`);
            // Award XP based on the egg's xpGainWin
            setXp((prevXp) => prevXp + selectedEggType.xpGainWin);
          } else {
            setEggState('win');
            setFunds(
              (prevFunds) => prevFunds + selectedEggType.smallWinAmount
            );
            setMessage(
              `Congratulations! You won $${selectedEggType.smallWinAmount.toLocaleString()}!`
            );
            // Award XP based on the egg's xpGainWin
            setXp((prevXp) => prevXp + selectedEggType.xpGainWin);
          }
          checkForQuests('WinPrize');
        } else {
          setEggState('fried');
          setMessage("Oh no! The egg was fried. You didn't get anything.");
          // Award XP based on the egg's xpGainLoss
          setXp((prevXp) => prevXp + selectedEggType.xpGainLoss);
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
        }, 1000); // Reduced from 2000ms to 1000ms
      }, 500); // Reduced from 1000ms to 500ms
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
    if (funds >= 1000000 && !achievements.includes('Wealthy')) {
      addPendingAchievement('Wealthy');
    }
    if (xp >= 1000 && !achievements.includes('Veteran')) {
      addPendingAchievement('Veteran');
    }
    // Check for egg collection achievements
    const totalEggs = Object.values(eggInventory).reduce((sum, count) => sum + count, 0);
    if (totalEggs >= 100 && !achievements.includes('Egg Collector')) {
      addPendingAchievement('Egg Collector');
    }
    if (totalEggs >= 1000 && !achievements.includes('Egg Hoarder')) {
      addPendingAchievement('Egg Hoarder');
    }
    if (totalEggs >= 10000 && !achievements.includes('Egg Tycoon')) {
      addPendingAchievement('Egg Tycoon');
    }

    // Check for level-based achievements
    if (level >= 10 && !achievements.includes('Novice Egg Hunter')) {
      addPendingAchievement('Novice Egg Hunter');
    }
    if (level >= 25 && !achievements.includes('Expert Egg Hunter')) {
      addPendingAchievement('Expert Egg Hunter');
    }
    if (level >= 50 && !achievements.includes('Master Egg Hunter')) {
      addPendingAchievement('Master Egg Hunter');
    }

    // Check for ticket-based achievements
    if (tickets >= 50 && !achievements.includes('Ticket Collector')) {
      addPendingAchievement('Ticket Collector');
    }
    if (tickets >= 200 && !achievements.includes('Ticket Hoarder')) {
      addPendingAchievement('Ticket Hoarder');
    }

    // Check for quest completion achievements
    if (quests.length >= 5 && !achievements.includes('Quest Master')) {
      addPendingAchievement('Quest Master');
    }
    if (quests.length >= 20 && !achievements.includes('Quest Legend')) {
      addPendingAchievement('Quest Legend');
    }

    // Check for funds-based achievements
    if (funds >= 1000000 && !achievements.includes('Millionaire')) {
      addPendingAchievement('Millionaire');
    }
    if (funds >= 1000000000 && !achievements.includes('Billionaire')) {
      addPendingAchievement('Billionaire');
    }

    // Check for XP-based achievements
    if (xp >= 10000 && !achievements.includes('XP Master')) {
      addPendingAchievement('XP Master');
    }

    // Check for egg variety achievements
    const uniqueEggs = Object.keys(eggInventory).length;
    if (uniqueEggs >= 5 && !achievements.includes('Egg Diversity')) {
      addPendingAchievement('Egg Diversity');
    }
    // Check for more creative achievements
    if (eggInventory[1] >= 100 && !achievements.includes('Egg Centurion')) {
      addPendingAchievement('Egg Centurion');
    }

    if (Object.values(eggInventory).reduce((a, b) => a + b, 0) >= 1000 && !achievements.includes('Egg Hoarder Extraordinaire')) {
      addPendingAchievement('Egg Hoarder Extraordinaire');
    }

    if (eggInventory[9] >= 1 && !achievements.includes('Celestial Egg Discoverer')) {
      addPendingAchievement('Celestial Egg Discoverer');
    }

    if (level >= 100 && !achievements.includes('Egg Hunt Legend')) {
      addPendingAchievement('Egg Hunt Legend');
    }

    if (tickets >= 1000 && !achievements.includes('Golden Ticket Magnet')) {
      addPendingAchievement('Golden Ticket Magnet');
    }

    if (quests.length >= 50 && !achievements.includes('Quest Conqueror')) {
      addPendingAchievement('Quest Conqueror');
    }

    if (funds >= 1000000000000 && !achievements.includes('Egg Tycoon')) {
      addPendingAchievement('Egg Tycoon');
    }

    if (xp >= 1000000 && !achievements.includes('Egg-sperience Guru')) {
      addPendingAchievement('Egg-sperience Guru');
    }

    const allEggsOwned = eggs.every(egg => eggInventory[egg.id] && eggInventory[egg.id] > 0);
    if (allEggsOwned && !achievements.includes('Egg Collector Supreme')) {
      addPendingAchievement('Egg Collector Supreme');
    }

    if (eggInventory[6] >= 50 && !achievements.includes('Dragon Egg Whisperer')) {
      addPendingAchievement('Dragon Egg Whisperer');
    }


  };

  const checkForQuests = (action: string) => {
    // Implement quest logic based on actions
    if (action === 'PurchaseEggs' && !quests.includes('Egg Buyer')) {
      addPendingQuest('Egg Buyer');
    }
    if (action === 'WinPrize' && !quests.includes('Lucky Winner')) {
      addPendingQuest('Lucky Winner');
    }
    // More quest conditions...
    if (action === 'PurchaseEggs' && !quests.includes('Egg Collector')) {
      addPendingQuest('Egg Collector');
    }
    if (action === 'WinPrize' && !quests.includes('Jackpot Hunter')) {
      addPendingQuest('Jackpot Hunter');
    }
    if (action === 'LevelUp' && !quests.includes('Level Achiever')) {
      addPendingQuest('Level Achiever');
    }
    if (action === 'PlaySlotMachine' && !quests.includes('Slot Enthusiast')) {
      addPendingQuest('Slot Enthusiast');
    }
    if (action === 'BuyRareEgg' && !quests.includes('Rare Egg Connoisseur')) {
      addPendingQuest('Rare Egg Connoisseur');
    }
    if (action === 'WinBigPrize' && !quests.includes('Fortune Seeker')) {
      addPendingQuest('Fortune Seeker');
    }
    if (action === 'CollectTickets' && !quests.includes('Ticket Hoarder')) {
      addPendingQuest('Ticket Hoarder');
    }
    if (action === 'ReachXPMilestone' && !quests.includes('XP Milestone')) {
      addPendingQuest('XP Milestone');
    }
    if (action === 'UnlockNewEgg' && !quests.includes('Egg Unlocked')) {
      addPendingQuest('Egg Unlocked');
    }
    if (action === 'CompleteAchievement' && !quests.includes('Achievement Hunter')) {
      addPendingQuest('Achievement Hunter');
    }
    if (action === 'PlayConsecutiveDays' && !quests.includes('Daily Player')) {
      addPendingQuest('Daily Player');
    }
    if (action === 'ReachFundsMilestone' && !quests.includes('Wealthy Egg Tycoon')) {
      addPendingQuest('Wealthy Egg Tycoon');
    }
    if (action === 'CollectAllEggTypes' && !quests.includes('Egg Diversity Master')) {
      addPendingQuest('Egg Diversity Master');
    }
    if (action === 'WinConsecutivePrizes' && !quests.includes('Lucky Streak')) {
      addPendingQuest('Lucky Streak');
    }
    if (action === 'ReachHighLevel' && !quests.includes('Egg Master')) {
      addPendingQuest('Egg Master');
    }
    if (action === 'CompleteAllQuests' && !quests.includes('Quest Completionist')) {
      addPendingQuest('Quest Completionist');
    }
    if (action === 'UnlockAllAchievements' && !quests.includes('Achievement Legend')) {
      addPendingQuest('Achievement Legend');
    }
    if (action === 'ReachMaxLevel' && !quests.includes('Egg God')) {
      addPendingQuest('Egg God');
    }
    if (action === 'WinRareEgg' && !quests.includes('Rare Egg Winner')) {
      addPendingQuest('Rare Egg Winner');
    }
    if (action === 'PlayMiniGames' && !quests.includes('Mini-Game Master')) {
      addPendingQuest('Mini-Game Master');
    }
    if (action === 'TradeEggs' && !quests.includes('Egg Trader')) {
      addPendingQuest('Egg Trader');
    }
    if (action === 'CompleteEventQuest' && !quests.includes('Event Champion')) {
      addPendingQuest('Event Champion');
    }
    if (action === 'ReachTopLeaderboard' && !quests.includes('Leaderboard Legend')) {
      addPendingQuest('Leaderboard Legend');
    }
    if (action === 'CompleteAllDailyQuests' && !quests.includes('Daily Quest Master')) {
      addPendingQuest('Daily Quest Master');
    }
    if (action === 'UnlockSecretEgg' && !quests.includes('Secret Egg Discoverer')) {
      addPendingQuest('Secret Egg Discoverer');
    }
    if (action === 'CompleteStoryMode' && !quests.includes('Story Mode Conqueror')) {
      addPendingQuest('Story Mode Conqueror');
    }
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
      const winnings = 10;
      setFunds((prevFunds) => prevFunds + winnings);
      setSlotResult(`You won $${winnings}!`);
      setXp((prevXp) => prevXp + 5);
    } else if (result === 'Jackpot') {
      const winnings = 15;
      setFunds((prevFunds) => prevFunds + winnings);
      setSlotResult(`Jackpot! You won $${winnings}!`);
      setXp((prevXp) => prevXp + 10);
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
            Level: {level} (XP: {xp}/{xpToNextLevel})
          </p>
          <button
            onClick={() => setShowAchievements(true)}
            className="relative px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold flex items-center"
          >
            <GiAchievement className="w-5 h-5 mr-2" />
            Achievements
            {pendingAchievements.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {pendingAchievements.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowQuests(true)}
            className="relative px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold flex items-center"
          >
            <TbMap className="w-5 h-5 mr-2" />
            Quests
            {pendingQuests.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {pendingQuests.length}
              </span>
            )}
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

      {/* Daily Reward Button */}
      <div className="flex justify-center mt-4">
        {canClaimDailyReward ? (
          <motion.button
            onClick={handleClaimDailyReward}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white font-semibold flex items-center shadow-lg"
          >
            <TbGift className="w-6 h-6 mr-2" />
            Claim Daily Reward
          </motion.button>
        ) : (
          <button
            disabled
            className="px-6 py-3 bg-gray-500 cursor-not-allowed rounded-full text-white font-semibold flex items-center shadow-lg"
          >
            <TbGift className="w-6 h-6 mr-2" />
            Daily Reward Claimed
          </button>
        )}
      </div>

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Achievements
            </h2>
            <ul className="list-none">
              {pendingAchievements.length > 0 || achievements.length > 0 ? (
                <>
                  {pendingAchievements.map((achievement, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <motion.button
                        onClick={() => claimAchievement(achievement)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 border-2 border-green-500 rounded mr-2 flex items-center justify-center"
                        >
                          {/* Empty checkbox */}
                        </motion.div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {achievement} (Click to Claim)
                        </span>
                      </motion.button>
                    </li>
                  ))}
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                        {/* Checkmark */}
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </>
              ) : (
                <li className="text-gray-700 dark:text-gray-300">No achievements yet.</li>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Quests</h2>
            <ul className="list-none">
              {pendingQuests.length > 0 || quests.length > 0 ? (
                <>
                  {pendingQuests.map((quest, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <motion.button
                        onClick={() => claimQuest(quest)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 border-2 border-green-500 rounded mr-2 flex items-center justify-center"
                        >
                          {/* Empty checkbox */}
                        </motion.div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {quest} (Click to Claim)
                        </span>
                      </motion.button>
                    </li>
                  ))}
                  {quests.map((quest, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                        {/* Checkmark */}
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{quest}</span>
                    </li>
                  ))}
                </>
              ) : (
                <li className="text-gray-700 dark:text-gray-300">No quests completed yet.</li>
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
