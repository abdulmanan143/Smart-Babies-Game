import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getQuizQuestions, Question, CATEGORIES_META } from '../data/questions';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  Lightbulb,
  Clock,
  ArrowRight,
  RotateCcw,
  Home,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const QuizGameView: React.FC = () => {
  const {
    activeCategory,
    activeLevel,
    difficulty,
    soundEnabled,
    timerEnabled,
    recordQuestionAnswer,
    recordGameComplete,
    setScreen,
    startQuiz,
  } = useGame();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const timerRef = useRef<number | null>(null);

  // Initialize questions on mount or category/level change
  useEffect(() => {
    const list = getQuizQuestions(activeCategory, activeLevel, difficulty);
    setQuestions(list);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasChecked(false);
    setShowHint(false);
    setUsedHint(false);
    setCorrectCount(0);
    setSessionScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
  }, [activeCategory, activeLevel, difficulty]);

  // Timer countdown if timer is enabled
  useEffect(() => {
    if (!timerEnabled || quizFinished || hasChecked) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(30);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, timerEnabled, quizFinished, hasChecked]);

  const currentQ = questions[currentIndex];
  const catMeta = CATEGORIES_META.find((c) => c.id === activeCategory);

  const handleTimeExpired = () => {
    if (hasChecked || quizFinished) return;
    setHasChecked(true);
    setIsCorrect(false);
    sound.playEncourage(soundEnabled);
    recordQuestionAnswer(activeCategory, false, usedHint);
  };

  const handleSelectOption = (option: string) => {
    if (hasChecked) return;
    sound.playPop(soundEnabled);
    setSelectedOption(option);

    const correct = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      sound.playSuccess(soundEnabled);
      const points = usedHint ? 5 : 10;
      setCorrectCount((prev) => prev + 1);
      setSessionScore((prev) => prev + points);
      recordQuestionAnswer(activeCategory, true, usedHint);
    } else {
      sound.playEncourage(soundEnabled);
      recordQuestionAnswer(activeCategory, false, usedHint);
    }
  };

  const handleUseHint = () => {
    if (showHint) return;
    sound.playPop(soundEnabled);
    setShowHint(true);
    setUsedHint(true);
  };

  const handleNextQuestion = () => {
    sound.playPop(soundEnabled);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasChecked(false);
      setShowHint(false);
      setUsedHint(false);
      setTimeLeft(30);
    } else {
      // Quiz complete
      setQuizFinished(true);
      const totalQ = questions.length || 10;
      const finalCorrect = correctCount;
      const ratio = finalCorrect / totalQ;
      const starsEarned = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;

      sound.playCelebration(soundEnabled);
      triggerConfetti(3500);
      recordGameComplete(activeCategory, sessionScore, starsEarned, activeLevel);
    }
  };

  const handleRetrySameQuestion = () => {
    sound.playPop(soundEnabled);
    setSelectedOption(null);
    setHasChecked(false);
    setShowHint(true);
    setUsedHint(true);
  };

  if (!currentQ && !quizFinished) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="text-4xl">⏳</div>
        <h2 className="text-xl font-bold text-slate-700">Loading your questions...</h2>
        <button
          onClick={() => setScreen('categories')}
          className="px-4 py-2 bg-amber-500 text-white font-bold rounded-xl"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  // ===================== QUIZ COMPLETION SCREEN =====================
  if (quizFinished) {
    const totalQ = questions.length || 10;
    const finalRatio = correctCount / totalQ;
    const starsEarned = finalRatio >= 0.8 ? 3 : finalRatio >= 0.5 ? 2 : 1;

    return (
      <div className="max-w-xl mx-auto px-4 py-8 pb-24 md:pb-12 text-center space-y-6">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-amber-200 shadow-xl space-y-6">
          <div className="inline-block p-4 rounded-3xl bg-amber-100 text-amber-600 text-5xl animate-bounce">
            🎉
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 font-display">
              {finalRatio >= 0.8 ? 'Well Done, Superstar!' : finalRatio >= 0.5 ? 'Great Effort!' : 'Good Try!'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              You completed the {catMeta?.name} Level {activeLevel} Quiz!
            </p>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl">
            <span className={starsEarned >= 1 ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'}>
              ⭐
            </span>
            <span
              className={`transform -translate-y-2 ${
                starsEarned >= 2 ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'
              }`}
            >
              ⭐
            </span>
            <span className={starsEarned >= 3 ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'}>
              ⭐
            </span>
          </div>

          {/* Score Summary Box */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="text-center">
              <div className="text-2xl font-black text-slate-800 font-display tabular-nums">
                {correctCount} / {totalQ}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Correct Answers</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-black text-amber-600 font-display tabular-nums">
                +{sessionScore}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Points Gained</div>
            </div>
          </div>

          {/* Educational Feedback Note */}
          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            💡 Practicing every day makes your brain stronger! You learned {correctCount} great concepts today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(activeCategory, activeLevel)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            {activeLevel < 5 && (
              <button
                onClick={() => startQuiz(activeCategory, activeLevel + 1)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next Level ({activeLevel + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setScreen('categories')}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Choose Category</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== ACTIVE QUESTION SCREEN =====================
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-5">
      {/* Top Status & Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen('categories')}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>✕ Exit Game</span>
        </button>

        <div className="flex items-center gap-3">
          {timerEnabled && (
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                timeLeft <= 5
                  ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {catMeta?.name} · Level {activeLevel}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {sessionScore} pts</span>
        </div>
        <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-3">
          {currentQ.emoji && (
            <div className="text-5xl sm:text-6xl animate-float">
              {currentQ.emoji}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx] || `${idx + 1}`;
            const isThisSelected = selectedOption === opt;
            const isThisCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

            let btnStyle = 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800 hover:border-amber-300';
            if (hasChecked) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300';
              } else if (isThisSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                disabled={hasChecked}
                onClick={() => handleSelectOption(opt)}
                className={`w-full min-h-[56px] px-4 py-3 rounded-2xl border-2 font-bold text-left transition-all cursor-pointer flex items-center gap-3 transform active:scale-98 shadow-xs ${btnStyle}`}
              >
                <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-600 shrink-0 shadow-2xs">
                  {letter}
                </span>
                <span className="text-base sm:text-lg font-display grow">{opt}</span>
                {hasChecked && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasChecked && isThisSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Toggle Button (if not answered yet) */}
        {!hasChecked && !showHint && (
          <div className="flex justify-center pt-2">
            <button
              onClick={handleUseHint}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Need a Hint? (+5 pts)</span>
            </button>
          </div>
        )}

        {/* Display Hint Box */}
        {showHint && !hasChecked && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Friendly Hint: </span>
              {currentQ.hint}
            </div>
          </div>
        )}

        {/* Feedback After Answering */}
        {hasChecked && (
          <div
            className={`p-4 rounded-2xl border text-sm space-y-2 animate-fade-in ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-base font-display">
              {isCorrect ? (
                <>
                  <span className="text-xl">🎉</span>
                  <span>Great Job! That is Correct! (+{usedHint ? 5 : 10} pts)</span>
                </>
              ) : (
                <>
                  <span className="text-xl">💡</span>
                  <span>Try Again or Check the Answer!</span>
                </>
              )}
            </div>

            {/* Explanation */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-800">Why: </span>
              {currentQ.explanation}
            </p>

            {/* Navigation buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
              {!isCorrect && (
                <button
                  onClick={handleRetrySameQuestion}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try This Question Again</span>
                </button>
              )}

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{currentIndex + 1 === questions.length ? 'See Results 🎉' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
