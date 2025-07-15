import React, { useState } from 'react';
import Header from './components/Header';
import GrammarCorrector from './components/GrammarCorrector';
import CorrectionHistory from './components/CorrectionHistory';

interface Correction {
  id: string;
  original: string;
  corrected: string;
  timestamp: Date;
}

function App() {
  const [corrections, setCorrections] = useState<Correction[]>([]);

  const handleCorrection = (original: string, corrected: string) => {
    const newCorrection: Correction = {
      id: Date.now().toString(),
      original,
      corrected,
      timestamp: new Date()
    };
    
    setCorrections(prev => [newCorrection, ...prev.slice(0, 9)]); // Keep last 10
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                Premium AI Grammar
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Enhancement
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Transform your writing with our luxury AI-powered grammar correction that maintains your unique voice and style
              </p>
            </div>
            
            {/* Main Grammar Correction Tool */}
            <GrammarCorrector onCorrection={handleCorrection} />
            
            {/* Correction History */}
            <CorrectionHistory corrections={corrections} />
          </div>
        </main>
        
        <footer className="mt-24 py-12 border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-slate-300 text-sm font-medium">
                Powered by AI • Real-time Processing
              </p>
            </div>
            <p className="text-slate-500 text-xs">
              © 2025 GramoPrompt. All rights reserved by Mohammad Shafih Akbari.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
