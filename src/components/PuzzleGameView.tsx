import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PUZZLES_DB, PuzzleItem, PatternPuzzle, OddOneOutPuzzle, NumberOrderPuzzle } from '../data/puzzles';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { ArrowLeft, Lightbulb, RotateCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const PuzzleGameView: React.FC = () => {
  const { soundEnabled, recordPuzzleWin, setScreen } = useGame();

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // For Number Order puzzles
  const [orderedTaps, setOrderedTaps] = useState<number[]>([]);

  const currentPuzzle: PuzzleItem = PUZZLES_DB[puzzleIndex] || PUZZLES_DB[0];

  const handlePatternChoice = (option: string) => {
    if (hasSubmitted) return;
    sound.playPop(soundEnabled);
    setSelectedAnswer(option);
    const puzzle = currentPuzzle as PatternPuzzle;
    const correct = option.trim() === puzzle.correctAnswer.trim();

    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      sound.playSuccess(soundEnabled);
      triggerConfetti(2500);
      recordPuzzleWin();
    } else {
      sound.playEncourage(soundEnabled);
    }
  };

  const handleOddOneOutChoice = (itemName: string) => {
    if (hasSubmitted) return;
    sound.playPop(soundEnabled);
    setSelectedAnswer(itemName);
    const puzzle = currentPuzzle as OddOneOutPuzzle;
    const correct = itemName.trim().toLowerCase() === puzzle.correctAnswer.trim().toLowerCase();

    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      sound.playSuccess(soundEnabled);
      triggerConfetti(2500);
      recordPuzzleWin();
    } else {
      sound.playEncourage(soundEnabled);
    }
  };

  const handleNumberTap = (num: number) => {
    if (hasSubmitted || orderedTaps.includes(num)) return;
    sound.playPop(soundEnabled);

    const puzzle = currentPuzzle as NumberOrderPuzzle;
    const nextTaps = [...orderedTaps, num];
    setOrderedTaps(nextTaps);

    if (nextTaps.length === puzzle.targetOrder.length) {
      // Check if matches targetOrder
      const matches = nextTaps.every((val, idx) => val === puzzle.targetOrder[idx]);
      setIsCorrect(matches);
      setHasSubmitted(true);

      if (matches) {
        sound.playSuccess(soundEnabled);
        triggerConfetti(2500);
        recordPuzzleWin();
      } else {
        sound.playEncourage(soundEnabled);
      }
    }
  };

  const handleResetCurrent = () => {
    sound.playPop(soundEnabled);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setOrderedTaps([]);
  };

  const handleNextPuzzle = () => {
    sound.playPop(soundEnabled);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setOrderedTaps([]);
    setPuzzleIndex((prev) => (prev + 1) % PUZZLES_DB.length);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen('categories')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Games</span>
        </button>

        <div className="text-xs font-bold text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
          Puzzle {puzzleIndex + 1} of {PUZZLES_DB.length}
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-pink-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            {currentPuzzle.title}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-display">
            {currentPuzzle.instructions}
          </h2>
        </div>

        {/* ================= PUZZLE TYPE 1: PATTERN ================= */}
        {currentPuzzle.type === 'pattern' && (
          <div className="space-y-6">
            {/* Pattern Sequence Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 p-4 rounded-2xl bg-pink-50/70 border border-pink-100">
              {currentPuzzle.sequence.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black ${
                    item === '❓'
                      ? 'bg-amber-200 border-2 border-dashed border-amber-500 text-amber-900 animate-pulse'
                      : 'bg-white border border-slate-200 shadow-xs'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide text-center">
                Tap your answer below:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentPuzzle.options.map((opt) => (
                  <button
                    key={opt}
                    disabled={hasSubmitted}
                    onClick={() => handlePatternChoice(opt)}
                    className={`py-4 rounded-2xl border-2 text-3xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      selectedAnswer === opt
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-rose-100 border-rose-400'
                        : 'bg-slate-50 hover:bg-pink-50 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= PUZZLE TYPE 2: ODD ONE OUT ================= */}
        {currentPuzzle.type === 'odd-one-out' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {currentPuzzle.items.map((item) => {
                const isSelected = selectedAnswer === item.text;
                return (
                  <button
                    key={item.text}
                    disabled={hasSubmitted}
                    onClick={() => handleOddOneOutChoice(item.text)}
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-rose-100 border-rose-400'
                        : 'bg-slate-50 hover:bg-pink-50 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="font-bold text-slate-800 text-sm">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PUZZLE TYPE 3: NUMBER ORDER ================= */}
        {currentPuzzle.type === 'number-order' && (
          <div className="space-y-5">
            {/* Tapped Order Sequence Display */}
            <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 text-center space-y-2">
              <div className="text-xs font-semibold text-slate-600">Your Number Order:</div>
              <div className="flex items-center justify-center gap-2 min-h-[48px]">
                {orderedTaps.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Tap numbers below from smallest to largest...</span>
                ) : (
                  orderedTaps.map((num, i) => (
                    <span
                      key={i}
                      className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-xs"
                    >
                      {num}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Scrambled Number Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentPuzzle.numbers.map((num) => {
                const isTapped = orderedTaps.includes(num);
                return (
                  <button
                    key={num}
                    disabled={isTapped || hasSubmitted}
                    onClick={() => handleNumberTap(num)}
                    className={`w-14 h-14 rounded-2xl border-2 font-black text-2xl transition-all cursor-pointer shadow-sm ${
                      isTapped
                        ? 'bg-slate-200 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
                        : 'bg-white hover:bg-pink-100 border-pink-300 text-pink-700 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            {!hasSubmitted && orderedTaps.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleResetCurrent}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Clear Selection & Restart
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hint button */}
        {!hasSubmitted && !showHint && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Need a Hint?</span>
            </button>
          </div>
        )}

        {/* Hint text */}
        {showHint && !hasSubmitted && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{currentPuzzle.hint}</span>
          </div>
        )}

        {/* Feedback after answer */}
        {hasSubmitted && (
          <div
            className={`p-4 rounded-2xl border text-sm space-y-2 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold font-display">
              {isCorrect ? (
                <>
                  <span className="text-xl">🎉</span>
                  <span>Awesome Thinking! Puzzle Solved! (+15 pts)</span>
                </>
              ) : (
                <>
                  <span className="text-xl">💡</span>
                  <span>Good Try! Let's examine the clue:</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700">{currentPuzzle.explanation}</p>

            <div className="pt-2 flex items-center justify-end gap-2">
              {!isCorrect && (
                <button
                  onClick={handleResetCurrent}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              )}

              <button
                onClick={handleNextPuzzle}
                className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
