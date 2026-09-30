/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CategorySelectView } from './components/CategorySelectView';
import { QuizGameView } from './components/QuizGameView';
import { MemoryGameView } from './components/MemoryGameView';
import { PuzzleGameView } from './components/PuzzleGameView';
import { RewardsView } from './components/RewardsView';
import { ProgressView } from './components/ProgressView';
import { ParentDashboard } from './components/ParentDashboard';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { BadgeModal } from './components/BadgeModal';

const MainContent: React.FC = () => {
  const { screen } = useGame();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/70 via-orange-50/30 to-amber-50/60 flex flex-col font-sans">
      <Navbar
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="grow">
        {screen === 'home' && (
          <HomeView
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}
        {screen === 'categories' && <CategorySelectView />}
        {screen === 'quiz' && <QuizGameView />}
        {screen === 'memory' && <MemoryGameView />}
        {screen === 'puzzle' && <PuzzleGameView />}
        {screen === 'rewards' && <RewardsView />}
        {screen === 'progress' && <ProgressView />}
        {screen === 'parent' && <ParentDashboard />}
      </main>

      {/* Global Modals */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <BadgeModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}
