export interface MemoryCard {
  id: string;
  pairId: string;
  emoji: string;
  name: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryTheme {
  id: string;
  name: string;
  icon: string;
  items: { emoji: string; name: string; color: string }[];
}

export const MEMORY_THEMES: MemoryTheme[] = [
  {
    id: 'animals',
    name: 'Cute Animals',
    icon: '🐾',
    items: [
      { emoji: '🦁', name: 'Lion', color: 'bg-amber-100 border-amber-300 text-amber-900' },
      { emoji: '🐼', name: 'Panda', color: 'bg-slate-100 border-slate-300 text-slate-900' },
      { emoji: '🐱', name: 'Cat', color: 'bg-orange-100 border-orange-300 text-orange-900' },
      { emoji: '🐰', name: 'Bunny', color: 'bg-pink-100 border-pink-300 text-pink-900' },
      { emoji: '🐶', name: 'Puppy', color: 'bg-yellow-100 border-yellow-300 text-yellow-900' },
      { emoji: '🦊', name: 'Fox', color: 'bg-red-100 border-red-300 text-red-900' },
      { emoji: '🐨', name: 'Koala', color: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
      { emoji: '🐸', name: 'Frog', color: 'bg-green-100 border-green-300 text-green-900' },
    ],
  },
  {
    id: 'fruits',
    name: 'Sweet Fruits',
    icon: '🍎',
    items: [
      { emoji: '🍎', name: 'Apple', color: 'bg-red-100 border-red-300 text-red-900' },
      { emoji: '🍌', name: 'Banana', color: 'bg-yellow-100 border-yellow-300 text-yellow-900' },
      { emoji: '🍓', name: 'Strawberry', color: 'bg-rose-100 border-rose-300 text-rose-900' },
      { emoji: '🍇', name: 'Grapes', color: 'bg-purple-100 border-purple-300 text-purple-900' },
      { emoji: '🍊', name: 'Orange', color: 'bg-amber-100 border-amber-300 text-amber-900' },
      { emoji: '🍉', name: 'Watermelon', color: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
      { emoji: '🍍', name: 'Pineapple', color: 'bg-lime-100 border-lime-300 text-lime-900' },
      { emoji: '🍒', name: 'Cherries', color: 'bg-pink-100 border-pink-300 text-pink-900' },
    ],
  },
  {
    id: 'space',
    name: 'Galaxy Stars',
    icon: '🚀',
    items: [
      { emoji: '🚀', name: 'Rocket', color: 'bg-indigo-100 border-indigo-300 text-indigo-900' },
      { emoji: '⭐', name: 'Star', color: 'bg-amber-100 border-amber-300 text-amber-900' },
      { emoji: '🪐', name: 'Saturn', color: 'bg-purple-100 border-purple-300 text-purple-900' },
      { emoji: '🌙', name: 'Moon', color: 'bg-cyan-100 border-cyan-300 text-cyan-900' },
      { emoji: '🛸', name: 'UFO', color: 'bg-emerald-100 border-emerald-300 text-emerald-900' },
      { emoji: '☀️', name: 'Sun', color: 'bg-orange-100 border-orange-300 text-orange-900' },
      { emoji: '☄️', name: 'Comet', color: 'bg-blue-100 border-blue-300 text-blue-900' },
      { emoji: '👾', name: 'Alien', color: 'bg-violet-100 border-violet-300 text-violet-900' },
    ],
  },
];

export function createMemoryDeck(pairCount: number = 4, themeId = 'animals'): MemoryCard[] {
  const theme = MEMORY_THEMES.find((t) => t.id === themeId) || MEMORY_THEMES[0];
  const selectedItems = [...theme.items].sort(() => Math.random() - 0.5).slice(0, pairCount);

  const cards: MemoryCard[] = [];
  selectedItems.forEach((item, index) => {
    const pairId = `pair-${index}`;
    // Card 1
    cards.push({
      id: `${pairId}-a`,
      pairId,
      emoji: item.emoji,
      name: item.name,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
    // Card 2
    cards.push({
      id: `${pairId}-b`,
      pairId,
      emoji: item.emoji,
      name: item.name,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
  });

  return cards.sort(() => Math.random() - 0.5);
}
