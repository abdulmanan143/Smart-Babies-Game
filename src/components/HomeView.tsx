import React from 'react';
import { useGame } from '../context/GameContext';
import { Difficulty } from '../data/questions';
import { Play, Sparkles, Trophy, Award, Brain, Zap, Settings, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenSettings, onOpenHelp, onOpenProfile }) => {
  const {
    profile,
    difficulty,
    setDifficulty,
    stats,
    dailyChallenge,
    claimDailyReward,
    setScreen,
    startQuiz,
    startMemory,
    startPuzzle,
  } = useGame();

  const difficulties: { id: Difficulty; label: string; ageRange: string; color: string }[] = [
    { id: 'easy', label: 'Easy', ageRange: 'Ages 5–7', color: 'bg-emerald-500 text-white hover:bg-emerald-600' },
    { id: 'medium', label: 'Medium', ageRange: 'Ages 8–10', color: 'bg-amber-500 text-white hover:bg-amber-600' },
    { id: 'hard', label: 'Hard', ageRange: 'Ages 11–12', color: 'bg-rose-500 text-white hover:bg-rose-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 backdrop-blur-xs text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>LEARN & PLAY ADVENTURE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-tight">
              Hello, {profile.name}! {profile.avatar}
            </h1>

            <p className="text-white/95 text-base sm:text-lg max-w-xl font-medium">
              Ready to explore magical Math, playful English, General Knowledge, and super fun puzzles today?
            </p>

            {/* Difficulty Selector */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider font-bold text-white/80 mb-2">
                Choose Difficulty Level:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {difficulties.map((diff) => {
                  const isSelected = difficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => setDifficulty(diff.id)}
                      className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-white text-slate-900 ring-3 ring-white/50 scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <span>{diff.label}</span>
                      <span className="text-[11px] opacity-75 font-normal">({diff.ageRange})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Big Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => setScreen('categories')}
                className="px-6 py-3.5 rounded-2xl bg-white text-amber-600 hover:bg-amber-50 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 transform active:scale-95"
              >
                <Play className="w-6 h-6 fill-amber-500 text-amber-500" />
                <span>Play Games Now!</span>
              </button>

              <button
                onClick={onOpenProfile}
                className="px-4 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm backdrop-blur-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Change Character</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40 bg-amber-200">
              <img
                src="/src/assets/images/kids_mascot_hero_1790796297126.jpg"
                alt="Friendly animal mascot friends welcoming you to learning adventure"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                ⭐ Level: {difficulty.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge & Quick Stat Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Daily Challenge Card */}
        <div className="md:col-span-2 rounded-3xl bg-white p-5 sm:p-6 border border-amber-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wide">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Today's Daily Challenge</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-display">
                {dailyChallenge.title}
              </h2>
              <p className="text-sm text-slate-600">
                {dailyChallenge.description}
              </p>
            </div>

            <div className="shrink-0 text-center px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-2xl font-black text-amber-600 font-display">
                +5 ⭐
              </div>
              <div className="text-[10px] uppercase font-bold text-amber-700">Bonus</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Progress: {dailyChallenge.currentCount} / {dailyChallenge.targetCount} answered</span>
              <span>{Math.min(100, Math.round((dailyChallenge.currentCount / dailyChallenge.targetCount) * 100))}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (dailyChallenge.currentCount / dailyChallenge.targetCount) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {dailyChallenge.completed ? (
              dailyChallenge.claimed ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Challenge Reward Claimed!</span>
                </div>
              ) : (
                <button
                  onClick={claimDailyReward}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer animate-pulse-subtle flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Claim +5 Stars Now!</span>
                </button>
              )
            ) : (
              <button
                onClick={() => setScreen('categories')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Play any quiz to complete →</span>
              </button>
            )}

            <span className="text-xs text-slate-400 font-medium">Refreshes every day</span>
          </div>
        </div>

        {/* Child Achievement Summary Card */}
        <div className="rounded-3xl bg-linear-to-br from-indigo-50 to-blue-50 p-5 sm:p-6 border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                My Trophy Shelf
              </span>
              <Trophy className="w-5 h-5 text-indigo-500" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/80 p-3 rounded-2xl border border-indigo-100/70 text-center">
                <div className="text-2xl font-black text-indigo-600 font-display tabular-nums">
                  {stats.totalScore}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 uppercase">Points</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-indigo-100/70 text-center">
                <div className="text-2xl font-black text-amber-500 font-display tabular-nums">
                  {stats.totalStars}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 uppercase">Stars</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-indigo-100/70 text-center">
                <div className="text-2xl font-black text-emerald-600 font-display tabular-nums">
                  {stats.totalCorrect}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 uppercase">Correct</div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-indigo-100/70 text-center">
                <div className="text-2xl font-black text-purple-600 font-display tabular-nums">
                  {stats.streak}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 uppercase">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs">
            <button
              onClick={() => setScreen('rewards')}
              className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              View Badges & Rewards →
            </button>
            <button
              onClick={() => setScreen('progress')}
              className="font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              Full Stats
            </button>
          </div>
        </div>
      </div>

      {/* Explore Learning Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 font-display">
              Choose an Activity
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Pick your favorite adventure and start answering fun questions!
            </p>
          </div>
          <button
            onClick={() => setScreen('categories')}
            className="text-sm font-bold text-amber-600 hover:text-amber-700 cursor-pointer hidden sm:block"
          >
            All Categories & Levels →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Math Card */}
          <div
            onClick={() => startQuiz('math', 1)}
            className="group rounded-3xl bg-white p-5 border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-blue-100">
              <img
                src="/src/assets/images/category_math_1790796308834.jpg"
                alt="Math playful adventure illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                🔢 Numbers & Logic
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 font-display group-hover:text-blue-600 transition-colors">
                Mathematics
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Addition, subtraction, multiplication, number patterns, and greater-than challenges.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-blue-600">
              <span>5 Interactive Levels</span>
              <span className="group-hover:translate-x-1 transition-transform">Start Playing →</span>
            </div>
          </div>

          {/* English Card */}
          <div
            onClick={() => startQuiz('english', 1)}
            className="group rounded-3xl bg-white p-5 border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-emerald-100">
              <img
                src="/src/assets/images/category_english_1790796320922.jpg"
                alt="English word and story adventure illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                📚 Words & Spelling
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 font-display group-hover:text-emerald-600 transition-colors">
                English Vocabulary
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Spelling, picture matching, opposite words, rhyming sounds, and complete sentences.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-600">
              <span>5 Interactive Levels</span>
              <span className="group-hover:translate-x-1 transition-transform">Start Playing →</span>
            </div>
          </div>

          {/* Puzzles & Memory Card */}
          <div
            onClick={() => startMemory()}
            className="group rounded-3xl bg-white p-5 border-2 border-purple-100 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-purple-100">
              <img
                src="/src/assets/images/category_puzzle_1790796331436.jpg"
                alt="Puzzle and memory game illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                🧠 Memory Cards
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 font-display group-hover:text-purple-600 transition-colors">
                Memory Card Match
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Flip cards, remember animal pairs and sweet fruits, and train your super memory!
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-purple-600">
              <span>Animals & Fruits</span>
              <span className="group-hover:translate-x-1 transition-transform">Flip Cards →</span>
            </div>
          </div>
        </div>

        {/* Secondary Category Row (General Knowledge & Brain Puzzles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* General Knowledge */}
          <div
            onClick={() => startQuiz('gk', 1)}
            className="rounded-3xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-5 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
              🌍
            </div>
            <div className="grow">
              <h3 className="text-lg font-bold text-slate-800 font-display">
                General Knowledge & Science
              </h3>
              <p className="text-xs text-slate-600">
                Planets, animals, weather, clocks, and curious wonders of planet Earth.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 shrink-0">Play →</span>
          </div>

          {/* Brain Puzzles */}
          <div
            onClick={() => startPuzzle()}
            className="rounded-3xl bg-linear-to-r from-pink-50 to-rose-50 border border-pink-200/80 p-5 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
              🧩
            </div>
            <div className="grow">
              <h3 className="text-lg font-bold text-slate-800 font-display">
                Brain Teaser Puzzles
              </h3>
              <p className="text-xs text-slate-600">
                Shape rhythms, odd one out, and number train ordering games.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-600 shrink-0">Solve →</span>
          </div>
        </div>
      </div>

      {/* Quick Settings & Help Toolbar at Bottom */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 hover:text-slate-800 font-medium transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Game Settings</span>
          </button>
          <span>·</span>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 hover:text-slate-800 font-medium transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>How to Play & Help</span>
          </button>
        </div>

        <div className="text-slate-400 text-[11px]">
          100% Safe, Kid-Friendly, Offline-Ready
        </div>
      </div>
    </div>
  );
};
