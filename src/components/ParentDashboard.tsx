import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, ArrowLeft, RefreshCw, AlertTriangle, CheckCircle2, Clock, Award } from 'lucide-react';
import { sound } from '../utils/audio';

export const ParentDashboard: React.FC = () => {
  const { stats, unlockedLevels, profile, resetAllProgress, setScreen, soundEnabled } = useGame();

  // Simple parental math gate so young kids don't wander in
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [gateError, setGateError] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Grown-up gate question: 7 * 6 = 42
  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (mathAnswer.trim() === '42') {
      sound.playSuccess(soundEnabled);
      setIsUnlocked(true);
      setGateError(false);
    } else {
      sound.playEncourage(soundEnabled);
      setGateError(true);
      setMathAnswer('');
    }
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setShowResetConfirm(false);
    sound.playPop(soundEnabled);
  };

  const totalQuestions = stats.totalCorrect + stats.totalIncorrect;
  const accuracy = totalQuestions > 0 ? Math.round((stats.totalCorrect / totalQuestions) * 100) : 100;
  // Estimate time: ~25 seconds per question answered + 90s per memory game
  const estimatedMinutes = Math.round((stats.questionsAnswered * 25 + stats.memoryWins * 90 + stats.puzzlesSolved * 45) / 60);

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 pb-24 md:pb-12 space-y-6">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Game</span>
        </button>

        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-md space-y-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-800 font-display">
              Parents & Guardians Area
            </h1>
            <p className="text-xs text-slate-500">
              Please answer this quick question to confirm you are an adult:
            </p>
          </div>

          <form onSubmit={handleVerifyGate} className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-lg font-bold text-slate-800">
              What is 7 × 6 = ?
            </div>

            <input
              type="number"
              placeholder="Enter answer"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center font-bold text-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />

            {gateError && (
              <p className="text-xs text-rose-500 font-semibold">
                Incorrect answer. Please try again!
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Unlock Parent Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Game</span>
        </button>

        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Parental Access Verified</span>
        </span>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 font-display">
          Learning Insights & Controls
        </h1>
        <p className="text-sm text-slate-500">
          Review {profile.name}'s learning engagement, strengths, and manage profile data safely.
        </p>
      </div>

      {/* Key Parental Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Estimated Learning Time</span>
          </div>
          <div className="text-3xl font-black text-slate-800 font-display tabular-nums">
            ~{estimatedMinutes} min
          </div>
          <p className="text-[11px] text-slate-400">Total active session engagement</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Answer Accuracy</span>
          </div>
          <div className="text-3xl font-black text-emerald-600 font-display tabular-nums">
            {accuracy}%
          </div>
          <p className="text-[11px] text-slate-400">
            {stats.totalCorrect} correct · {stats.totalIncorrect} retries
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Levels Unlocked</span>
          </div>
          <div className="text-3xl font-black text-amber-600 font-display tabular-nums">
            {unlockedLevels.math + unlockedLevels.english + unlockedLevels.gk} / 15
          </div>
          <p className="text-[11px] text-slate-400">Across Math, English, and GK</p>
        </div>
      </div>

      {/* Strengths & Pedagogical Recommendations */}
      <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100 space-y-3">
        <h2 className="text-lg font-bold text-indigo-950 font-display">
          Pedagogical Observations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-indigo-900">
          <div className="p-3 bg-white/80 rounded-xl border border-indigo-100">
            <span className="font-bold text-slate-800 block mb-1">Active Strengths:</span>
            {stats.mathAnswered > stats.englishAnswered
              ? 'Enjoys mathematical concepts and number puzzles! Great at counting and pattern detection.'
              : 'Enjoys English vocabulary, spelling words, and exploring opposites!'}
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-indigo-100">
            <span className="font-bold text-slate-800 block mb-1">Recommended Next Step:</span>
            {unlockedLevels.english < 3
              ? 'Practice English opposites and spelling levels to broaden language confidence.'
              : 'Try higher difficulty levels or memory cards to strengthen active recall.'}
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-rose-800 font-display flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Reset Game Data</span>
            </h2>
            <p className="text-xs text-slate-500 max-w-xl">
              This will clear all earned stars, points, badges, and reset all levels to Level 1. This action cannot be undone.
            </p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold text-xs transition-colors cursor-pointer shrink-0"
          >
            Reset Progress
          </button>
        </div>

        {/* Confirmation Modal dialog */}
        {showResetConfirm && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 space-y-3 animate-fade-in">
            <div className="text-sm font-bold text-rose-900">
              Are you sure you want to reset all game progress?
            </div>
            <p className="text-xs text-rose-700">
              All {stats.totalStars} stars, {stats.totalScore} points, and unlocked badges will be cleared.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
