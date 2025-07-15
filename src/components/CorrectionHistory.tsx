import React from 'react';
import { Clock, ArrowRight, Sparkles, Trash2 } from 'lucide-react';

interface CorrectionHistoryProps {
  corrections: Array<{
    id: string;
    original: string;
    corrected: string;
    timestamp: Date;
  }>;
}

const CorrectionHistory: React.FC<CorrectionHistoryProps> = ({ corrections }) => {
  if (corrections.length === 0) {
    return (
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 rounded-3xl blur opacity-20"></div>
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-500/20 p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">No corrections yet</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Your premium correction history will appear here as you enhance your text with AI
          </p>
          <div className="flex items-center justify-center gap-1 mt-4 text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Premium Feature</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-25"></div>
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-purple-500/10 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="font-bold text-white text-lg">Correction History</h3>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-300">Premium</span>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              {corrections.length} correction{corrections.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-slate-700/50 max-h-96 overflow-y-auto custom-scrollbar">
          {corrections.map((correction, index) => (
            <div key={correction.id} className="group/item p-6 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-indigo-500/5 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-300 border border-purple-500/30">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-400 font-medium">
                      {correction.timestamp.toLocaleString()}
                    </div>
                    <button className="opacity-0 group-hover/item:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <span>Original</span>
                      </div>
                      <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                          {correction.original}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full">
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="text-xs text-emerald-400 mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Enhanced</span>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-white text-sm leading-relaxed line-clamp-3 font-medium">
                          {correction.corrected}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorrectionHistory;