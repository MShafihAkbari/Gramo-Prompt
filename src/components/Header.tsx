import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-xl">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-x"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                GramoPrompt
              </h1>
              <p className="text-sm text-purple-300/80 font-medium">Premium AI Grammar Assistant</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              AI Premium Active
            </div>
            <button className="p-2 text-purple-300 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;