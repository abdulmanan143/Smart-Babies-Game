export type PuzzleType = 'pattern' | 'odd-one-out' | 'number-order';

export interface BasePuzzle {
  id: string;
  type: PuzzleType;
  title: string;
  instructions: string;
  hint: string;
  explanation: string;
}

export interface PatternPuzzle extends BasePuzzle {
  type: 'pattern';
  sequence: string[]; // e.g. ['🔴', '🔵', '🔴', '🔵', '?']
  options: string[]; // e.g. ['🔴', '🔵', '🟢', '🟡']
  correctAnswer: string;
}

export interface OddOneOutPuzzle extends BasePuzzle {
  type: 'odd-one-out';
  items: { text: string; emoji: string }[];
  correctAnswer: string; // the text of the odd one out
}

export interface NumberOrderPuzzle extends BasePuzzle {
  type: 'number-order';
  numbers: number[]; // scrambled numbers e.g. [8, 3, 1, 5]
  targetOrder: number[]; // e.g. [1, 3, 5, 8]
}

export type PuzzleItem = PatternPuzzle | OddOneOutPuzzle | NumberOrderPuzzle;

export const PUZZLES_DB: PuzzleItem[] = [
  // 1. Pattern puzzles
  {
    id: 'p-pat-1',
    type: 'pattern',
    title: 'Shape Rhythm',
    instructions: 'What comes next in the pattern?',
    sequence: ['⭐', '🌙', '⭐', '🌙', '❓'],
    options: ['⭐', '🌙', '☀️', '☁️'],
    correctAnswer: '⭐',
    hint: 'Look at the alternating pattern: Star, Moon, Star, Moon...',
    explanation: 'The pattern alternates between Star and Moon. After Moon comes Star!',
  },
  {
    id: 'p-pat-2',
    type: 'pattern',
    title: 'Fruit Parade',
    instructions: 'Which fruit fills the question mark?',
    sequence: ['🍎', '🍌', '🍎', '🍌', '❓'],
    options: ['🍎', '🍇', '🍌', '🍊'],
    correctAnswer: '🍎',
    hint: 'Apple, Banana, Apple, Banana...',
    explanation: 'The pattern goes Apple, Banana, Apple, Banana, so next is Apple!',
  },
  {
    id: 'p-pat-3',
    type: 'pattern',
    title: 'Color Blocks',
    instructions: 'Find the missing colored block:',
    sequence: ['🟥', '🟦', '🟩', '🟥', '🟦', '❓'],
    options: ['🟩', '🟥', '🟨', '🟦'],
    correctAnswer: '🟩',
    hint: 'Red, Blue, Green, Red, Blue...',
    explanation: 'This 3-color repeating loop finishes with Green!',
  },
  {
    id: 'p-pat-4',
    type: 'pattern',
    title: 'Animal Steps',
    instructions: 'Which friendly animal is next?',
    sequence: ['🐱', '🐱', '🐶', '🐱', '🐱', '❓'],
    options: ['🐶', '🐱', '🐰', '🦁'],
    correctAnswer: '🐶',
    hint: 'Two cats, one dog, two cats...',
    explanation: 'Two cats are followed by one dog! So the dog is next.',
  },

  // 2. Odd one out puzzles
  {
    id: 'p-odd-1',
    type: 'odd-one-out',
    title: 'Spot the Difference',
    instructions: 'Which item does NOT belong with the others?',
    items: [
      { text: 'Puppy', emoji: '🐶' },
      { text: 'Kitten', emoji: '🐱' },
      { text: 'Bunny', emoji: '🐰' },
      { text: 'Airplane', emoji: '✈️' },
    ],
    correctAnswer: 'Airplane',
    hint: 'Three of these are living animals, but one is a flying machine!',
    explanation: 'Airplane is a vehicle, while the rest are cute animals!',
  },
  {
    id: 'p-odd-2',
    type: 'odd-one-out',
    title: 'Delicious Treats',
    instructions: 'Find the odd one out:',
    items: [
      { text: 'Apple', emoji: '🍎' },
      { text: 'Banana', emoji: '🍌' },
      { text: 'Carrot', emoji: '🥕' },
      { text: 'Football', emoji: '⚽' },
    ],
    correctAnswer: 'Football',
    hint: 'Three are healthy foods you can eat!',
    explanation: 'Football is a sports ball, not a delicious food!',
  },
  {
    id: 'p-odd-3',
    type: 'odd-one-out',
    title: 'Ways to Travel',
    instructions: 'Which one does not belong with transport vehicles?',
    items: [
      { text: 'Car', emoji: '🚗' },
      { text: 'Bicycle', emoji: '🚲' },
      { text: 'Ship', emoji: '🚢' },
      { text: 'Book', emoji: '📖' },
    ],
    correctAnswer: 'Book',
    hint: 'Think about vehicles that take you places versus something you read.',
    explanation: 'A book is for reading stories, not for riding!',
  },
  {
    id: 'p-odd-4',
    type: 'odd-one-out',
    title: 'Sky Observers',
    instructions: 'Which item is not found up in the sky?',
    items: [
      { text: 'Sun', emoji: '☀️' },
      { text: 'Moon', emoji: '🌙' },
      { text: 'Cloud', emoji: '☁️' },
      { text: 'Fish', emoji: '🐠' },
    ],
    correctAnswer: 'Fish',
    hint: 'Where do fish live? In the water or the sky?',
    explanation: 'Fish swim in the water, not up in the sky!',
  },

  // 3. Number order puzzles
  {
    id: 'p-ord-1',
    type: 'number-order',
    title: 'Number Train',
    instructions: 'Tap the numbers in order from smallest to largest (1 to 5):',
    numbers: [4, 1, 3, 5, 2],
    targetOrder: [1, 2, 3, 4, 5],
    hint: 'Start with number 1, then find 2, 3...',
    explanation: 'Counting in order: 1, 2, 3, 4, 5! Super job!',
  },
  {
    id: 'p-ord-2',
    type: 'number-order',
    title: 'Rocket Countdown',
    instructions: 'Tap the numbers in ascending order from 6 to 10:',
    numbers: [9, 6, 8, 10, 7],
    targetOrder: [6, 7, 8, 9, 10],
    hint: 'Find 6 first, then 7, 8, 9, 10!',
    explanation: 'Ascending order: 6, 7, 8, 9, 10! Blast off!',
  },
];
