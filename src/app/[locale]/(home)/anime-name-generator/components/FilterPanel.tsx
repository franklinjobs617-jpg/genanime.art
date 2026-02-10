"use client";

import { Settings, Sparkles, Info } from "lucide-react";
import { FilterPanelProps, GenderOption, StyleOption } from "../lib/types";
import { validateGenerationSettings } from "../lib/nameGenerator";
import styles from "./FilterPanel.module.css";

const GENDER_OPTIONS: GenderOption[] = [
  {
    value: 'random',
    label: 'Random',
    description: 'Mix of all gender types'
  },
  {
    value: 'male',
    label: 'Male',
    description: 'Traditional male names'
  },
  {
    value: 'female',
    label: 'Female',
    description: 'Traditional female names'
  },
  {
    value: 'unisex',
    label: 'Unisex',
    description: 'Gender-neutral names'
  }
];

const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'mixed',
    label: 'Mixed',
    description: 'Combination of all styles',
    examples: ['Varied themes', 'Diverse origins']
  },
  {
    value: 'traditional',
    label: 'Traditional',
    description: 'Classical Japanese naming patterns',
    examples: ['Hiroshi', 'Sakura', 'Takeshi']
  },
  {
    value: 'modern',
    label: 'Modern',
    description: 'Contemporary Japanese-style names',
    examples: ['Ren', 'Yuki', 'Sora']
  },
  {
    value: 'fantasy',
    label: 'Fantasy',
    description: 'Mystical and supernatural elements',
    examples: ['Moonlight', 'Dragon', 'Spirit']
  },
  {
    value: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Futuristic and technology-inspired',
    examples: ['Cyber', 'Neo', 'Digital']
  }
];

export default function FilterPanel({ 
  settings, 
  onSettingsChange, 
  onGenerate, 
  isGenerating 
}: FilterPanelProps) {
  const isValidSettings = validateGenerationSettings(settings);

  const handleQuantityChange = (value: number) => {
    const clampedValue = Math.max(1, Math.min(20, value));
    onSettingsChange({ ...settings, quantity: clampedValue });
  };

  const handleQuickPreset = (preset: 'quick' | 'balanced' | 'extensive') => {
    const presets = {
      quick: { quantity: 3 },
      balanced: { quantity: 8 },
      extensive: { quantity: 15 }
    };
    onSettingsChange({ ...settings, ...presets[preset] });
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 sticky top-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-indigo-500" />
        Generation Settings
      </h3>
      
      <div className="space-y-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-2">
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onSettingsChange({ ...settings, gender: option.value })}
                className={`p-3 rounded-lg border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  settings.gender === option.value
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700'
                }`}
              >
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs opacity-75 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Style Category
          </label>
          <div className="space-y-2">
            {STYLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onSettingsChange({ ...settings, style: option.value })}
                className={`w-full p-4 rounded-lg border text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  settings.style === option.value
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.label}</span>
                  {settings.style === option.value && (
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  )}
                </div>
                <div className="text-xs opacity-75 mb-2">{option.description}</div>
                <div className="flex flex-wrap gap-1">
                  {option.examples.map((example, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black/20 rounded text-xs opacity-60"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-zinc-300">
              Number of Names
            </label>
            <span className="text-indigo-400 font-bold text-lg">{settings.quantity}</span>
          </div>
          
          {/* Quick Presets */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => handleQuickPreset('quick')}
              className="flex-1 px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
            >
              Quick (3)
            </button>
            <button
              onClick={() => handleQuickPreset('balanced')}
              className="flex-1 px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
            >
              Balanced (8)
            </button>
            <button
              onClick={() => handleQuickPreset('extensive')}
              className="flex-1 px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
            >
              Extensive (15)
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="20"
              value={settings.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className={`w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer ${styles.slider}`}
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(settings.quantity - 1) * 5.26}%, #3f3f46 ${(settings.quantity - 1) * 5.26}%, #3f3f46 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>

          {/* Manual Input */}
          <div className="mt-3">
            <input
              type="number"
              min="1"
              max="20"
              value={settings.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter number (1-20)"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating || !isValidSettings}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {settings.quantity} Name{settings.quantity !== 1 ? 's' : ''}
            </>
          )}
        </button>

        {/* Validation Error */}
        {!isValidSettings && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-300">
              Please check your settings. Quantity must be between 1-20.
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
          <h4 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Quick Tips
          </h4>
          <ul className="text-xs text-zinc-400 space-y-1">
            <li>• <strong>Traditional:</strong> Classical Japanese patterns with virtue meanings</li>
            <li>• <strong>Fantasy:</strong> Mystical elements perfect for anime characters</li>
            <li>• <strong>Modern:</strong> Contemporary names with nature themes</li>
            <li>• <strong>Sci-Fi:</strong> Futuristic names for cyberpunk settings</li>
            <li>• Generate 6-10 names for optimal variety and choice</li>
          </ul>
        </div>

        {/* Generation Stats */}
        <div className="text-xs text-zinc-500 text-center">
          Ready to generate {settings.quantity} unique {settings.gender === 'random' ? 'mixed-gender' : settings.gender} names in {settings.style} style
        </div>
      </div>
    </div>
  );
}