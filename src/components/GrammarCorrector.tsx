import React, { useState } from 'react';
import { Send, Loader2, Copy, Check, FileText, Sparkles, Wand2, Star } from 'lucide-react';
import { correctGrammar } from '../utils/azureClient';

interface GrammarCorrectorProps {
  onCorrection: (original: string, corrected: string) => void;
}

const GrammarCorrector: React.FC<GrammarCorrectorProps> = ({ onCorrection }) => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCorrectGrammar = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setCorrectedText('');
    
    try {
      const corrected = await correctGrammar(inputText);
      
      setCorrectedText(corrected);
      onCorrection(inputText, corrected);
    } catch (error) {
      console.error('Error correcting grammar:', error);
      setCorrectedText('Error: Unable to correct text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (correctedText) {
      await navigator.clipboard.writeText(correctedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleCorrectGrammar();
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-purple-500/10 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                <FileText className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="font-semibold text-white text-lg">Original Text</h3>
              <div className="flex items-center gap-1 ml-auto">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-purple-300">Premium</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Paste or type your text here for premium AI grammar correction..."
                className="w-full h-48 resize-none bg-transparent border-0 outline-none text-white placeholder-slate-400 text-base leading-relaxed font-medium"
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">
                  {inputText.length} characters
                </span>
                <div className="flex items-center gap-1 text-xs text-purple-300">
                  <Sparkles className="w-3 h-3" />
                  AI Ready
                </div>
              </div>
              
              <button
                onClick={handleCorrectGrammar}
                disabled={!inputText.trim() || isLoading}
                className="group relative flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enhancing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Enhance with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Output Section */}
      {(correctedText || isLoading) && (
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/20 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/5 to-green-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h3 className="font-semibold text-white text-lg">Enhanced Text</h3>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-300">AI Enhanced</span>
                  </div>
                </div>
                
                {correctedText && (
                  <button
                    onClick={copyToClipboard}
                    className="group flex items-center gap-2 px-4 py-2 text-sm text-emerald-300 hover:text-white hover:bg-emerald-500/20 rounded-xl transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500/50"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animate-reverse"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">AI is enhancing your text...</p>
                    <p className="text-slate-400 text-sm">Using advanced language models</p>
                  </div>
                </div>
              ) : (
                <div className="min-h-[192px] relative">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                  <div className="pt-4">
                    <p className="text-white text-base leading-relaxed whitespace-pre-wrap font-medium">
                      {correctedText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarCorrector;