import React from 'react';
import { useGame, ScreenView } from '../context/GameContext';
import { Volume2, VolumeX, Flame, Star, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile, onOpenSettings }) => {
  const {
    screen,
    setScreen,
    soundEnabled,
    setSoundEnabled,
    stats,
    profile,
  } = useGame();

  const navItems: { label: string; view: ScreenView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Games', view: 'categories' },
    { label: 'Memory', view: 'memory' },
    { label: 'Puzzles', view: 'puzzle' },
    { label: 'Rewards', view: 'rewards' },
    { label: 'Progress', view: 'progress' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => setScreen('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-amber-600 hover:text-amber-700 transition-colors font-display flex items-center gap-2 text-left cursor-pointer"
        >
          <span>Smart Kids Game</span>
        </button>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = screen === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setScreen(item.view)}
                className={`transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-amber-600 font-semibold border-b-2 border-amber-500'
                    : 'text-slate-600 hover:text-amber-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {/* Grown-ups link */}
          <button
            onClick={() => setScreen('parent')}
            className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              screen === 'parent'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-500'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Parents</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Sound, Streak, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div
            title={`${stats.streak} day learning streak!`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold tabular-nums"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse-subtle" />
            <span>{stats.streak}d</span>
          </div>

          {/* Star counter */}
          <div
            title={`${stats.totalStars} Stars Earned`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tabular-nums"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{stats.totalStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Sounds' : 'Turn On Sounds'}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Profile Avatar Button */}
          <button
            onClick={onOpenProfile}
            title={`Child Profile: ${profile.name}`}
            className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 transition-colors cursor-pointer text-xs font-medium text-amber-950"
          >
            <span className="text-base leading-none">{profile.avatar}</span>
            <span className="hidden sm:inline font-semibold max-w-[80px] truncate">{profile.name}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (15% height limit compliant) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = screen === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setScreen(item.view)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-xs font-medium transition-colors cursor-pointer min-w-[50px] ${
                isActive ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-sm">
                {item.view === 'home' && '🏠'}
                {item.view === 'categories' && '🎮'}
                {item.view === 'memory' && '🃏'}
                {item.view === 'puzzle' && '🧩'}
                {item.view === 'rewards' && '🏆'}
                {item.view === 'progress' && '📊'}
              </span>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
