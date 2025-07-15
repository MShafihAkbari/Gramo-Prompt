import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, CheckCircle, Lightbulb, Volume2, Settings, BarChart3 } from 'lucide-react';

interface GrammarSuggestion {
  id: string;
  text: string;
  suggestion: string;
  type: 'grammar' | 'style' | 'tone';
  start: number;
  end: number;
  confidence: number;
}

interface GrammarCheckerProps {
  content: string;
  onContentChange: (content: string) => void;
  context: string;
  onSuggestionApply: (suggestion: GrammarSuggestion) => void;
}

const GrammarChecker: React.FC<GrammarCheckerProps> = ({
  content,
  onContentChange,
  context,
  onSuggestionApply
}) => {
  const [suggestions, setSuggestions] = useState<GrammarSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);

  const analyzeText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate Azure AI API call
      const mockSuggestions: GrammarSuggestion[] = [
        {
          id: '1',
          text: 'their',
          suggestion: 'there',
          type: 'grammar',
          start: text.indexOf('their'),
          end: text.indexOf('their') + 5,
          confidence: 0.95
        },
        {
          id: '2',
          text: 'very good',
          suggestion: 'excellent',
          type: 'style',
          start: text.indexOf('very good'),
          end: text.indexOf('very good') + 9,
          confidence: 0.87
        }
      ];
      
      // Filter suggestions based on context
      const contextualSuggestions = mockSuggestions.filter(s => 
        context === 'academic' ? s.type !== 'style' : true
      );
      
      setSuggestions(contextualSuggestions);
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [context]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      analyzeText(content);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [content, analyzeText]);

  const handleSuggestionClick = (suggestion: GrammarSuggestion) => {
    const newContent = content.substring(0, suggestion.start) + 
                      suggestion.suggestion + 
                      content.substring(suggestion.end);
    
    onContentChange(newContent);
    onSuggestionApply(suggestion);
    
    // Remove applied suggestion
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'style': return <Lightbulb className="w-4 h-4 text-yellow-400" />;
      case 'tone': return <Volume2 className="w-4 h-4 text-blue-400" />;
      default: return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Suggestions Panel */}
      {suggestions.length > 0 && (
        <div className="absolute top-0 right-0 w-80 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 shadow-2xl z-10">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Suggestions ({suggestions.length})
          </h3>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:bg-slate-600/50 transition-all duration-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setHoveredSuggestion(suggestion.id)}
                onMouseLeave={() => setHoveredSuggestion(null)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getSuggestionIcon(suggestion.type)}
                  <span className="text-xs text-slate-400 capitalize">{suggestion.type}</span>
                  <span className="text-xs text-slate-500 ml-auto">
                    {Math.round(suggestion.confidence * 100)}%
                  </span>
                </div>
                
                <div className="text-sm text-slate-300">
                  Replace "<span className="text-red-400 line-through">{suggestion.text}</span>"
                  with "<span className="text-green-400 font-medium">{suggestion.suggestion}</span>"
                </div>
                
                {hoveredSuggestion === suggestion.id && (
                  <div className="mt-2 text-xs text-slate-400 bg-slate-800/80 p-2 rounded">
                    Click to apply this suggestion
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/30">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-400">Analyzing...</span>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;