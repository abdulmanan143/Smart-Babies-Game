import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { X, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, soundEnabled } = useGame();
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);

  if (!isOpen) return null;

  const avatars = [
    { emoji: '🦁', label: 'Brave Lion' },
    { emoji: '🐰', label: 'Playful Bunny' },
    { emoji: '🐼', label: 'Happy Panda' },
    { emoji: '🐱', label: 'Clever Cat' },
    { emoji: '👦', label: 'Super Boy' },
    { emoji: '👧', label: 'Star Girl' },
    { emoji: '🦖', label: 'Dino Explorer' },
    { emoji: '🚀', label: 'Astronaut' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || 'Smart Explorer',
      avatar,
    });
    sound.playSuccess(soundEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800 font-display">
            Choose Your Character
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Select Your Cartoon Avatar:
            </label>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((item) => {
                const isSelected = avatar === item.emoji;
                return (
                  <button
                    key={item.emoji}
                    type="button"
                    onClick={() => {
                      sound.playPop(soundEnabled);
                      setAvatar(item.emoji);
                    }}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-600 mt-1 truncate max-w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nickname Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Your Player Nickname:
            </label>
            <input
              type="text"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Leo, Mia, Captain Alex"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 font-bold text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 text-sm cursor-pointer hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
