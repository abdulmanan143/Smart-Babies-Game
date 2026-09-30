import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CATEGORIES_META, CategoryId, Difficulty } from '../data/questions';
import { Lock, Check, ArrowLeft, Play, Sparkles, Brain, Puzzle } from 'lucide-react';

export const CategorySelectView: React.FC = () => {
  const {
    difficulty,
    setDifficulty,
    unlockedLevels,
    startQuiz,
    startMemory,
    startPuzzle,
    setScreen,
  } = useGame();

  const [selectedCategoryTab, setSelectedCategoryTab] = useState<CategoryId | 'memory' | 'puzzle'>('math');

  const difficulties: { id: Difficulty; label: string; ageRange: string }[] = [
    { id: 'easy', label: 'Easy', ageRange: '5–7 Yrs' },
    { id: 'medium', label: 'Medium', ageRange: '8–10 Yrs' },
    { id: 'hard', label: 'Hard', ageRange: '11–12 Yrs' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {difficulties.map((d) => {
            const isSelected = difficulty === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{d.label}</span>
                <span className="hidden sm:inline opacity-75 font-normal ml-1">({d.ageRange})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 font-display">
          Choose Your Adventure
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Select a subject, choose an unlocked level, or explore interactive memory cards and puzzles!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-100/80 rounded-2xl">
        <button
          onClick={() => setSelectedCategoryTab('math')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedCategoryTab === 'math'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🔢</span>
          <span>Math</span>
        </button>

        <button
          onClick={() => setSelectedCategoryTab('english')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedCategoryTab === 'english'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📚</span>
          <span>English</span>
        </button>

        <button
          onClick={() => setSelectedCategoryTab('gk')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedCategoryTab === 'gk'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🌍</span>
          <span>Knowledge</span>
        </button>

        <button
          onClick={() => setSelectedCategoryTab('memory')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedCategoryTab === 'memory'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🃏</span>
          <span>Memory</span>
        </button>

        <button
          onClick={() => setSelectedCategoryTab('puzzle')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
            selectedCategoryTab === 'puzzle'
              ? 'bg-white text-pink-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🧩</span>
          <span>Puzzles</span>
        </button>
      </div>

      {/* Main Content Area based on Selected Tab */}
      {selectedCategoryTab === 'memory' ? (
        /* Memory Game Intro Card */
        <div className="rounded-3xl bg-linear-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white text-3xl flex items-center justify-center shrink-0 shadow-md">
              🃏
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-display">
                Memory Card Match Quest
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Test and strengthen your memory! Flip the colorful cards and find matching pairs of cute animal friends, delicious fruits, or cosmic rockets.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-purple-100 space-y-2 text-center">
              <div className="text-2xl">🐾</div>
              <div className="font-bold text-slate-800 text-sm">Cute Animals</div>
              <div className="text-xs text-slate-500">Lions, pandas, cats, and bunnies</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-100 space-y-2 text-center">
              <div className="text-2xl">🍎</div>
              <div className="font-bold text-slate-800 text-sm">Sweet Fruits</div>
              <div className="text-xs text-slate-500">Apples, bananas, and strawberries</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-100 space-y-2 text-center">
              <div className="text-2xl">🚀</div>
              <div className="font-bold text-slate-800 text-sm">Galaxy Stars</div>
              <div className="text-xs text-slate-500">Rockets, planets, and alien pals</div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => startMemory()}
              className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Launch Memory Game</span>
            </button>
          </div>
        </div>
      ) : selectedCategoryTab === 'puzzle' ? (
        /* Puzzle Game Intro Card */
        <div className="rounded-3xl bg-linear-to-br from-pink-50 to-rose-50 border-2 border-pink-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-pink-600 text-white text-3xl flex items-center justify-center shrink-0 shadow-md">
              🧩
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-display">
                Brain Teaser Puzzles
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Solve intriguing pattern sequences, spot the odd item out that doesn't belong, and arrange numbers on the rocket countdown train!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-pink-100 space-y-2 text-center">
              <div className="text-2xl">⭐</div>
              <div className="font-bold text-slate-800 text-sm">Pattern Detective</div>
              <div className="text-xs text-slate-500">Discover what shape or color comes next</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-pink-100 space-y-2 text-center">
              <div className="text-2xl">🔍</div>
              <div className="font-bold text-slate-800 text-sm">Odd One Out</div>
              <div className="text-xs text-slate-500">Spot the item that is different from others</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-pink-100 space-y-2 text-center">
              <div className="text-2xl">🚂</div>
              <div className="font-bold text-slate-800 text-sm">Number Train</div>
              <div className="text-xs text-slate-500">Tap numbers in the right ascending order</div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => startPuzzle()}
              className="px-8 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Solving Puzzles</span>
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Category Level Selection (Math, English, GK) */
        (() => {
          const catMeta = CATEGORIES_META.find((c) => c.id === selectedCategoryTab)!;
          const maxUnlocked = unlockedLevels[selectedCategoryTab] || 1;

          return (
            <div className="space-y-6">
              {/* Category banner */}
              <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-xs">
                    {catMeta.emoji}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 font-display">
                      {catMeta.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {catMeta.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startQuiz(selectedCategoryTab, 1)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play 10 Questions</span>
                </button>
              </div>

              {/* Levels Grid */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider font-bold text-slate-500 px-1">
                  Available Levels (Complete a level to unlock the next):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catMeta.levels.map((lvl) => {
                    const isUnlocked = lvl.level <= maxUnlocked;
                    const isCompleted = lvl.level < maxUnlocked;

                    return (
                      <div
                        key={lvl.level}
                        onClick={() => {
                          if (isUnlocked) {
                            startQuiz(selectedCategoryTab, lvl.level);
                          }
                        }}
                        className={`rounded-2xl p-5 border-2 transition-all ${
                          isUnlocked
                            ? 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer'
                            : 'bg-slate-50/70 border-slate-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                                isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {lvl.level}
                            </span>
                            <h3 className="font-bold text-slate-800 text-sm font-display">
                              {lvl.title}
                            </h3>
                          </div>

                          {isUnlocked ? (
                            isCompleted ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5" />
                              </div>
                            )
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-2">
                          {lvl.desc}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-400">10 Questions</span>
                          {isUnlocked ? (
                            <span className="font-bold text-amber-600 hover:underline">
                              Play Level {lvl.level} →
                            </span>
                          ) : (
                            <span className="font-medium text-slate-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};
