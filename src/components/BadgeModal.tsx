import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Sparkles } from 'lucide-react';

export const BadgeModal: React.FC = () => {
  const { recentBadgeUnlocked, clearRecentBadge, setScreen } = useGame();

  if (!recentBadgeUnlocked) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-2xl text-center space-y-5 animate-scale-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>New Badge Unlocked!</span>
        </div>

        <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-5xl shadow-lg animate-bounce">
          {recentBadgeUnlocked.icon}
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 font-display">
            {recentBadgeUnlocked.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {recentBadgeUnlocked.description}
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              clearRecentBadge();
              setScreen('rewards');
            }}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>View Trophy Shelf</span>
          </button>

          <button
            onClick={clearRecentBadge}
            className="w-full py-2.5 rounded-2xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
          >
            Keep Playing
          </button>
        </div>
      </div>
    </div>
  );
};
