import React from 'react';
import { useGame } from '../context/GameContext';
import { BADGES_LIST } from '../data/badges';
import { Trophy, Star, Sparkles, Flame, CheckCircle, Lock, ArrowLeft } from 'lucide-react';

export const RewardsView: React.FC = () => {
  const { stats, unlockedBadges, setScreen } = useGame();

  const totalBadges = BADGES_LIST.length;
  const earnedCount = unlockedBadges.length;

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

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Badges: {earnedCount} / {totalBadges}</span>
        </div>
      </div>

      {/* Rewards Trophy Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-yellow-100" />
          <span>TREASURE CHEST</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
          Your Badges & Stars
        </h1>
        <p className="text-white/95 text-sm sm:text-base font-medium max-w-xl">
          Every time you answer questions and conquer levels, you collect sparkling stars and shiny badges!
        </p>

        {/* Big Counters */}
        <div className="grid grid-cols-3 gap-3 pt-3">
          <div className="bg-white/20 backdrop-blur-xs p-3 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-display tabular-nums">
              {stats.totalStars} ⭐
            </div>
            <div className="text-[11px] font-bold text-white/90 uppercase">Total Stars</div>
          </div>

          <div className="bg-white/20 backdrop-blur-xs p-3 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-display tabular-nums">
              {stats.totalScore}
            </div>
            <div className="text-[11px] font-bold text-white/90 uppercase">Total Score</div>
          </div>

          <div className="bg-white/20 backdrop-blur-xs p-3 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-display tabular-nums">
              {stats.streak} 🔥
            </div>
            <div className="text-[11px] font-bold text-white/90 uppercase">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-display">
          All Achievement Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-5 border-2 transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-xs ${
                    isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="grow space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm font-display">
                      {badge.title}
                    </h3>
                    {isUnlocked ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-snug">
                    {badge.description}
                  </p>

                  <div className="pt-2 text-[11px] font-semibold">
                    {isUnlocked ? (
                      <span className="text-emerald-600">🏆 Earned & Unlocked!</span>
                    ) : (
                      <span className="text-slate-400">Keep playing to unlock</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
