export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
  condition: (stats: GameStats) => boolean;
}

export interface GameStats {
  totalScore: number;
  totalStars: number;
  totalCorrect: number;
  totalIncorrect: number;
  questionsAnswered: number;
  gamesCompleted: number;
  streak: number;
  mathAnswered: number;
  englishAnswered: number;
  gkAnswered: number;
  memoryWins: number;
  puzzlesSolved: number;
}

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'First Step Adventurer',
    description: 'Answer your very first question correctly!',
    icon: '🌱',
    color: 'from-emerald-400 to-green-500',
    condition: (stats) => stats.totalCorrect >= 1,
  },
  {
    id: 'badge-math-master',
    title: 'Math Master',
    description: 'Answer 10 Math questions correctly!',
    icon: '🏆',
    color: 'from-blue-500 to-indigo-600',
    condition: (stats) => stats.mathAnswered >= 10,
  },
  {
    id: 'badge-english-star',
    title: 'English Star',
    description: 'Answer 10 English questions correctly!',
    icon: '📚',
    color: 'from-teal-400 to-emerald-600',
    condition: (stats) => stats.englishAnswered >= 10,
  },
  {
    id: 'badge-gk-explorer',
    title: 'World Explorer',
    description: 'Answer 10 General Knowledge questions correctly!',
    icon: '🌍',
    color: 'from-amber-400 to-orange-500',
    condition: (stats) => stats.gkAnswered >= 10,
  },
  {
    id: 'badge-memory-champ',
    title: 'Memory Champion',
    description: 'Successfully complete 2 Memory Card matches!',
    icon: '🧠',
    color: 'from-purple-500 to-violet-600',
    condition: (stats) => stats.memoryWins >= 2,
  },
  {
    id: 'badge-puzzle-expert',
    title: 'Puzzle Expert',
    description: 'Solve 3 brain-teaser puzzles!',
    icon: '🧩',
    color: 'from-pink-500 to-rose-600',
    condition: (stats) => stats.puzzlesSolved >= 3,
  },
  {
    id: 'badge-streak-champ',
    title: 'Streak Hero',
    description: 'Play learning games on 2 different days!',
    icon: '🔥',
    color: 'from-orange-500 to-amber-600',
    condition: (stats) => stats.streak >= 2,
  },
  {
    id: 'badge-star-collector',
    title: 'Super Star Collector',
    description: 'Earn 25 shining stars across your games!',
    icon: '⭐',
    color: 'from-yellow-400 to-amber-500',
    condition: (stats) => stats.totalStars >= 25,
  },
  {
    id: 'badge-super-learner',
    title: 'Super Learner',
    description: 'Answer 30 total questions across all subjects!',
    icon: '🌟',
    color: 'from-cyan-400 to-blue-600',
    condition: (stats) => stats.totalCorrect >= 30,
  },
];
