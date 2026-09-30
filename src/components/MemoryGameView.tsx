import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { MemoryCard, createMemoryDeck, MEMORY_THEMES } from '../data/memoryCards';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { RotateCcw, Home, Trophy, Sparkles, ArrowLeft, Star } from 'lucide-react';

export const MemoryGameView: React.FC = () => {
  const {
    difficulty,
    soundEnabled,
    recordMemoryWin,
    setScreen,
  } = useGame();

  const pairCounts = {
    easy: 4, // 8 cards
    medium: 6, // 12 cards
    hard: 8, // 16 cards
  };

  const currentPairCount = pairCounts[difficulty] || 4;

  const [selectedTheme, setSelectedTheme] = useState('animals');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Initialize deck
  const resetGame = (theme = selectedTheme) => {
    sound.playPop(soundEnabled);
    const newDeck = createMemoryDeck(currentPairCount, theme);
    setCards(newDeck);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameOver(false);
    setIsLocked(false);
  };

  useEffect(() => {
    resetGame(selectedTheme);
  }, [difficulty, selectedTheme]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const card = cards[index];
    if (card.isMatched || card.isFlipped) return;

    sound.playFlip(soundEnabled);

    // Flip the clicked card
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          sound.playMatch(soundEnabled);
          const matchedDeck = [...cards];
          matchedDeck[firstIdx].isMatched = true;
          matchedDeck[secondIdx].isMatched = true;
          setCards(matchedDeck);
          setFlippedCards([]);
          setIsLocked(false);

          const newMatchCount = matchedPairs + 1;
          setMatchedPairs(newMatchCount);

          if (newMatchCount === currentPairCount) {
            // Victory!
            setIsGameOver(true);
            sound.playCelebration(soundEnabled);
            triggerConfetti(3500);

            // Compute stars
            const minMoves = currentPairCount;
            const stars = moves <= minMoves + 3 ? 3 : moves <= minMoves + 7 ? 2 : 1;
            recordMemoryWin(moves + 1, stars);
          }
        }, 500);
      } else {
        // Not matched, flip back after delay
        setTimeout(() => {
          const resetDeck = [...cards];
          resetDeck[firstIdx].isFlipped = false;
          resetDeck[secondIdx].isFlipped = false;
          setCards(resetDeck);
          setFlippedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  // Star rating calculation for win screen
  const starsEarned = moves <= currentPairCount + 3 ? 3 : moves <= currentPairCount + 7 ? 2 : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setScreen('categories')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Games</span>
        </button>

        {/* Theme Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {MEMORY_THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  resetGame(theme.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{theme.icon}</span>
                <span className="hidden sm:inline">{theme.name}</span>
              </button>
            );
          })}
        </div>

        {/* Moves & Pairs HUD */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold tabular-nums">
            Pairs: {matchedPairs} / {currentPairCount}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold tabular-nums">
            Moves: {moves}
          </div>
          <button
            onClick={() => resetGame()}
            title="Restart Game"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display">
          Memory Card Quest
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Tap two cards at a time to find twin partners! Difficulty: {difficulty.toUpperCase()} ({cards.length} cards)
        </p>
      </div>

      {/* Win Modal Overlay */}
      {isGameOver ? (
        <div className="max-w-md mx-auto rounded-3xl bg-white p-6 sm:p-8 border-2 border-purple-300 shadow-2xl text-center space-y-5 animate-bounce-subtle">
          <div className="text-5xl">🏆</div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-display">
              Super Memory Master!
            </h2>
            <p className="text-sm text-slate-600">
              You found all {currentPairCount} matching pairs in {moves} moves!
            </p>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 text-4xl">
            <span className={starsEarned >= 1 ? 'text-amber-400' : 'text-slate-200'}>⭐</span>
            <span className={`transform -translate-y-2 ${starsEarned >= 2 ? 'text-amber-400' : 'text-slate-200'}`}>⭐</span>
            <span className={starsEarned >= 3 ? 'text-amber-400' : 'text-slate-200'}>⭐</span>
          </div>

          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 font-semibold">
            🎉 +{Math.max(10, 50 - moves * 2)} Points Added to your Trophy Shelf!
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => resetGame()}
              className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              onClick={() => setScreen('categories')}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              Choose Other Game
            </button>
          </div>
        </div>
      ) : (
        /* Memory Grid */
        <div
          className={`grid gap-3 sm:gap-4 mx-auto max-w-2xl ${
            cards.length <= 8
              ? 'grid-cols-4'
              : cards.length <= 12
              ? 'grid-cols-3 sm:grid-cols-4'
              : 'grid-cols-4 sm:grid-cols-4'
          }`}
        >
          {cards.map((card, index) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`relative aspect-square rounded-2xl transition-all duration-300 transform cursor-pointer select-none perspective-500 ${
                  card.isMatched
                    ? 'scale-95 opacity-80 ring-2 ring-emerald-400 shadow-xs'
                    : 'hover:scale-103 active:scale-95 shadow-md'
                }`}
              >
                {isRevealed ? (
                  // Card Front (Face Up)
                  <div
                    className={`w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all bg-white ${
                      card.isMatched ? 'border-emerald-400 bg-emerald-50/50' : 'border-purple-300 shadow-sm'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl drop-shadow-xs">{card.emoji}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 truncate max-w-[80px]">
                      {card.name}
                    </span>
                  </div>
                ) : (
                  // Card Back (Face Down)
                  <div className="w-full h-full rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 border-2 border-purple-400/80 flex items-center justify-center text-white text-xl sm:text-2xl shadow-inner">
                    <span>✨</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
