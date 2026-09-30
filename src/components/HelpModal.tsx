import React from 'react';
import { X, Star, Lightbulb, Trophy, ShieldCheck } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800 font-display flex items-center gap-2">
            <span>🎮</span>
            <span>How to Play & Learn</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h3 className="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Scoring & Stars</span>
            </h3>
            <ul className="space-y-1 text-slate-700 list-disc list-inside">
              <li><strong className="text-emerald-700">+10 Points:</strong> Answer correctly on the first attempt!</li>
              <li><strong className="text-amber-700">+5 Points:</strong> Answer correctly using a friendly hint.</li>
              <li><strong className="text-slate-700">⭐⭐⭐ 3 Stars:</strong> Earned for answering 8 or more questions correctly in a session!</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <h3 className="font-bold text-blue-900 flex items-center gap-1.5 text-sm">
              <Lightbulb className="w-4 h-4 text-blue-500" />
              <span>Friendly Hints & Learning Feedback</span>
            </h3>
            <p>
              If a question looks tricky, don't worry! Tap <strong>"Need a Hint?"</strong> for a helpful counting or spelling tip. Wrong answers are never punished—we provide cheerful hints so you can learn with a smile!
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <h3 className="font-bold text-purple-900 flex items-center gap-1.5 text-sm">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span>Daily Challenge & Day Streaks</span>
            </h3>
            <p>
              Come back each day to tackle the <strong>Daily Challenge</strong> for bonus stars, and watch your flame streak grow day by day!
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Child Safety & Privacy</span>
            </h3>
            <p className="text-emerald-800">
              This game is 100% private. We do not collect names, emails, or personal information. All progress is saved right inside your browser so you can play anytime!
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
