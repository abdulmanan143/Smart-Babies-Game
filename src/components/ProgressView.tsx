import React from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Star, Trophy, Flame, CheckCircle, Target, Award, Brain, BookOpen, Calculator } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { stats, unlockedLevels, unlockedBadges, profile, setScreen } = useGame();

  const totalQuestions = stats.totalCorrect + stats.totalIncorrect;
  const accuracy = totalQuestions > 0 ? Math.round((stats.totalCorrect / totalQuestions) * 100) : 100;
  const totalLevelsCompleted = (unlockedLevels.math - 1) + (unlockedLevels.english - 1) + (unlockedLevels.gk - 1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-xs font-bold text-slate-500">
          Player: <span className="text-slate-800">{profile.name}</span> {profile.avatar}
        </div>
      </div>

      {/* Progress Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 font-display">
          My Learning Journey
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Track all your awesome milestones, stars earned, and knowledge growth!
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white p-5 border border-amber-200 shadow-xs text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-3xl font-black text-slate-800 font-display tabular-nums">
            {stats.totalStars}
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Stars Collected</div>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-indigo-200 shadow-xs text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800 font-display tabular-nums">
            {stats.totalScore}
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Total Score</div>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-emerald-200 shadow-xs text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800 font-display tabular-nums">
            {accuracy}%
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Answer Accuracy</div>
        </div>

        <div className="rounded-3xl bg-white p-5 border border-orange-200 shadow-xs text-center space-y-1">
          <div className="w-10 h-10 mx-auto rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
          </div>
          <div className="text-3xl font-black text-slate-800 font-display tabular-nums">
            {stats.streak}
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase">Day Streak</div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">
          Subject Breakdown
        </h2>

        <div className="space-y-4">
          {/* Math Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="text-base">🔢</span>
                <span>Mathematics (Level {unlockedLevels.math} / 5)</span>
              </span>
              <span className="text-blue-600 tabular-nums">{stats.mathAnswered} questions solved</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (unlockedLevels.math / 5) * 100)}%` }}
              />
            </div>
          </div>

          {/* English Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <span>English Vocabulary (Level {unlockedLevels.english} / 5)</span>
              </span>
              <span className="text-emerald-600 tabular-nums">{stats.englishAnswered} questions solved</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (unlockedLevels.english / 5) * 100)}%` }}
              />
            </div>
          </div>

          {/* GK Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="text-base">🌍</span>
                <span>General Knowledge (Level {unlockedLevels.gk} / 5)</span>
              </span>
              <span className="text-amber-600 tabular-nums">{stats.gkAnswered} questions solved</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (unlockedLevels.gk / 5) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Extra Activities stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🃏</span>
              <div>
                <div className="text-xs font-semibold text-slate-600">Memory Card Wins</div>
                <div className="text-xl font-black text-purple-700 font-display tabular-nums">
                  {stats.memoryWins} Games
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🧩</span>
              <div>
                <div className="text-xs font-semibold text-slate-600">Puzzles Solved</div>
                <div className="text-xl font-black text-pink-700 font-display tabular-nums">
                  {stats.puzzlesSolved} Puzzles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
