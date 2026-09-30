import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryId, Difficulty } from '../data/questions';
import { BADGES_LIST, Badge, GameStats } from '../data/badges';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

export type ScreenView =
  | 'home'
  | 'categories'
  | 'quiz'
  | 'memory'
  | 'puzzle'
  | 'rewards'
  | 'progress'
  | 'parent';

export interface ChildProfile {
  name: string;
  avatar: string;
  avatarBg: string;
}

export interface DailyChallengeState {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  category: CategoryId | 'any';
  targetCount: number;
  currentCount: number;
  completed: boolean;
  claimed: boolean;
}

export interface GameContextType {
  screen: ScreenView;
  setScreen: (s: ScreenView) => void;
  profile: ChildProfile;
  updateProfile: (profile: Partial<ChildProfile>) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (v: boolean) => void;
  timerEnabled: boolean;
  setTimerEnabled: (v: boolean) => void;
  stats: GameStats;
  unlockedLevels: Record<CategoryId, number>;
  unlockedBadges: string[];
  recentBadgeUnlocked: Badge | null;
  clearRecentBadge: () => void;
  dailyChallenge: DailyChallengeState;
  claimDailyReward: () => void;
  activeCategory: CategoryId;
  activeLevel: number;
  startQuiz: (category: CategoryId, level?: number, customDifficulty?: Difficulty) => void;
  startMemory: (customDifficulty?: Difficulty) => void;
  startPuzzle: () => void;
  recordQuestionAnswer: (category: CategoryId, isCorrect: boolean, usedHint: boolean) => void;
  recordGameComplete: (category: CategoryId, score: number, starsEarned: number, levelPlayed?: number) => void;
  recordMemoryWin: (moves: number, stars: number) => void;
  recordPuzzleWin: () => void;
  resetAllProgress: () => void;
}

const STORAGE_KEY = 'smart_kids_learning_game_data_v1';

const getTodayString = () => new Date().toISOString().split('T')[0];

const INITIAL_STATS: GameStats = {
  totalScore: 0,
  totalStars: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  questionsAnswered: 0,
  gamesCompleted: 0,
  streak: 1,
  mathAnswered: 0,
  englishAnswered: 0,
  gkAnswered: 0,
  memoryWins: 0,
  puzzlesSolved: 0,
};

const INITIAL_LEVELS: Record<CategoryId, number> = {
  math: 1,
  english: 1,
  gk: 1,
};

const getDailyMission = (date: string): DailyChallengeState => {
  return {
    date,
    title: 'Daily Brain Booster',
    description: 'Answer 5 questions in any game to earn bonus stars!',
    category: 'any',
    targetCount: 5,
    currentCount: 0,
    completed: false,
    claimed: false,
  };
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreenState] = useState<ScreenView>('home');
  const [profile, setProfile] = useState<ChildProfile>({
    name: 'Smart Explorer',
    avatar: '🦁',
    avatarBg: 'bg-amber-100',
  });
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabledState] = useState<boolean>(false);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);

  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [unlockedLevels, setUnlockedLevels] = useState<Record<CategoryId, number>>(INITIAL_LEVELS);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [recentBadgeUnlocked, setRecentBadgeUnlocked] = useState<Badge | null>(null);

  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeState>(() => getDailyMission(getTodayString()));
  const [lastActiveDate, setLastActiveDate] = useState<string>(getTodayString());

  // Active quiz session params
  const [activeCategory, setActiveCategory] = useState<CategoryId>('math');
  const [activeLevel, setActiveLevel] = useState<number>(1);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.soundEnabled !== undefined) setSoundEnabledState(parsed.soundEnabled);
        if (parsed.musicEnabled !== undefined) setMusicEnabledState(parsed.musicEnabled);
        if (parsed.timerEnabled !== undefined) setTimerEnabled(parsed.timerEnabled);
        if (parsed.stats) setStats(parsed.stats);
        if (parsed.unlockedLevels) setUnlockedLevels(parsed.unlockedLevels);
        if (parsed.unlockedBadges) setUnlockedBadges(parsed.unlockedBadges);

        const today = getTodayString();
        if (parsed.dailyChallenge && parsed.dailyChallenge.date === today) {
          setDailyChallenge(parsed.dailyChallenge);
        } else {
          setDailyChallenge(getDailyMission(today));
        }

        // Streak check
        if (parsed.lastActiveDate) {
          const lastDate = new Date(parsed.lastActiveDate);
          const currDate = new Date(today);
          const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            // Next consecutive day
            setStats((prev) => ({ ...prev, streak: prev.streak + 1 }));
          } else if (diffDays > 1) {
            // Streak broken, reset to 1
            setStats((prev) => ({ ...prev, streak: 1 }));
          }
          setLastActiveDate(today);
        }
      }
    } catch {
      // ignore parsing error
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      const dataToSave = {
        profile,
        difficulty,
        soundEnabled,
        musicEnabled,
        timerEnabled,
        stats,
        unlockedLevels,
        unlockedBadges,
        dailyChallenge,
        lastActiveDate,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // storage unavailable
    }
  }, [profile, difficulty, soundEnabled, musicEnabled, timerEnabled, stats, unlockedLevels, unlockedBadges, dailyChallenge, lastActiveDate]);

  // Handle ambient music toggle
  useEffect(() => {
    if (musicEnabled) {
      sound.startAmbience(true);
    } else {
      sound.stopAmbience();
    }
    return () => {
      sound.stopAmbience();
    };
  }, [musicEnabled]);

  const setSoundEnabled = (v: boolean) => {
    setSoundEnabledState(v);
    if (v) sound.playPop(true);
  };

  const setMusicEnabled = (v: boolean) => {
    setMusicEnabledState(v);
  };

  const setScreen = (s: ScreenView) => {
    sound.playPop(soundEnabled);
    setScreenState(s);
  };

  const updateProfile = (partial: Partial<ChildProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
    sound.playPop(soundEnabled);
  };

  // Check for badge unlocks whenever stats change
  const checkForBadgeUnlocks = (newStats: GameStats) => {
    for (const badge of BADGES_LIST) {
      if (!unlockedBadges.includes(badge.id) && badge.condition(newStats)) {
        setUnlockedBadges((prev) => [...prev, badge.id]);
        setRecentBadgeUnlocked(badge);
        sound.playCelebration(soundEnabled);
        triggerConfetti(3500);
        break; // Show one at a time for focus
      }
    }
  };

  const clearRecentBadge = () => {
    setRecentBadgeUnlocked(null);
  };

  const startQuiz = (category: CategoryId, level = 1, customDifficulty?: Difficulty) => {
    setActiveCategory(category);
    setActiveLevel(level);
    if (customDifficulty) setDifficulty(customDifficulty);
    setScreen('quiz');
  };

  const startMemory = (customDifficulty?: Difficulty) => {
    if (customDifficulty) setDifficulty(customDifficulty);
    setScreen('memory');
  };

  const startPuzzle = () => {
    setScreen('puzzle');
  };

  const recordQuestionAnswer = (category: CategoryId, isCorrect: boolean, usedHint: boolean) => {
    const points = isCorrect ? (usedHint ? 5 : 10) : 0;
    const today = getTodayString();

    setStats((prev) => {
      const newStats: GameStats = {
        ...prev,
        totalScore: prev.totalScore + points,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        totalIncorrect: prev.totalIncorrect + (!isCorrect ? 1 : 0),
        questionsAnswered: prev.questionsAnswered + 1,
        mathAnswered: prev.mathAnswered + (category === 'math' && isCorrect ? 1 : 0),
        englishAnswered: prev.englishAnswered + (category === 'english' && isCorrect ? 1 : 0),
        gkAnswered: prev.gkAnswered + (category === 'gk' && isCorrect ? 1 : 0),
      };
      checkForBadgeUnlocks(newStats);
      return newStats;
    });

    // Update daily challenge if not completed
    if (isCorrect && !dailyChallenge.completed) {
      setDailyChallenge((prev) => {
        const newCount = prev.currentCount + 1;
        const isDone = newCount >= prev.targetCount;
        if (isDone && !prev.completed) {
          sound.playCelebration(soundEnabled);
          triggerConfetti(3000);
        }
        return {
          ...prev,
          currentCount: newCount,
          completed: isDone,
        };
      });
    }

    setLastActiveDate(today);
  };

  const recordGameComplete = (category: CategoryId, score: number, starsEarned: number, levelPlayed?: number) => {
    setStats((prev) => {
      const newStats: GameStats = {
        ...prev,
        totalStars: prev.totalStars + starsEarned,
        gamesCompleted: prev.gamesCompleted + 1,
      };
      checkForBadgeUnlocks(newStats);
      return newStats;
    });

    // Unlock next level if applicable
    if (levelPlayed && levelPlayed < 5) {
      setUnlockedLevels((prev) => {
        const currentMax = prev[category] || 1;
        if (levelPlayed >= currentMax && currentMax < 5) {
          return {
            ...prev,
            [category]: currentMax + 1,
          };
        }
        return prev;
      });
    }
  };

  const recordMemoryWin = (moves: number, stars: number) => {
    const points = Math.max(10, 50 - moves * 2);
    setStats((prev) => {
      const newStats: GameStats = {
        ...prev,
        totalScore: prev.totalScore + points,
        totalStars: prev.totalStars + stars,
        memoryWins: prev.memoryWins + 1,
        gamesCompleted: prev.gamesCompleted + 1,
      };
      checkForBadgeUnlocks(newStats);
      return newStats;
    });
  };

  const recordPuzzleWin = () => {
    const points = 15;
    const stars = 1;
    setStats((prev) => {
      const newStats: GameStats = {
        ...prev,
        totalScore: prev.totalScore + points,
        totalStars: prev.totalStars + stars,
        puzzlesSolved: prev.puzzlesSolved + 1,
        gamesCompleted: prev.gamesCompleted + 1,
      };
      checkForBadgeUnlocks(newStats);
      return newStats;
    });
  };

  const claimDailyReward = () => {
    if (!dailyChallenge.completed || dailyChallenge.claimed) return;
    setDailyChallenge((prev) => ({ ...prev, claimed: true }));
    setStats((prev) => ({
      ...prev,
      totalStars: prev.totalStars + 5,
      totalScore: prev.totalScore + 50,
    }));
    sound.playCelebration(soundEnabled);
    triggerConfetti(3000);
  };

  const resetAllProgress = () => {
    setStats(INITIAL_STATS);
    setUnlockedLevels(INITIAL_LEVELS);
    setUnlockedBadges([]);
    setRecentBadgeUnlocked(null);
    setDailyChallenge(getDailyMission(getTodayString()));
    localStorage.removeItem(STORAGE_KEY);
    sound.playPop(soundEnabled);
  };

  return (
    <GameContext.Provider
      value={{
        screen,
        setScreen,
        profile,
        updateProfile,
        difficulty,
        setDifficulty,
        soundEnabled,
        setSoundEnabled,
        musicEnabled,
        setMusicEnabled,
        timerEnabled,
        setTimerEnabled,
        stats,
        unlockedLevels,
        unlockedBadges,
        recentBadgeUnlocked,
        clearRecentBadge,
        dailyChallenge,
        claimDailyReward,
        activeCategory,
        activeLevel,
        startQuiz,
        startMemory,
        startPuzzle,
        recordQuestionAnswer,
        recordGameComplete,
        recordMemoryWin,
        recordPuzzleWin,
        resetAllProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
