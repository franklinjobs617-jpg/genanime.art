"use client";

import { useState } from "react";
import { Heart, Copy, ChevronDown, ChevronUp, Info, Volume2, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NameCardProps } from "../lib/types";

export default function NameCard({ name, onFavorite, onCopy, isFavorited }: NameCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleCopy = async () => {
    await onCopy(name);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `${name.fullName} (${name.surnameReading} ${name.givenNameReading}) - ${name.surnameMeaning} + ${name.givenNameMeaning}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Anime Name Generator',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const handlePronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${name.surnameReading} ${name.givenNameReading}`);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'female':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'traditional':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'modern':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'fantasy':
        return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'sci-fi':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all group relative backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Main Name Display */}
          <div className="mb-3">
            <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors font-serif">
              {name.fullName}
            </h4>
            <div className="flex items-center gap-2">
              <p className="text-indigo-400 text-sm font-medium">
                {name.surnameReading} {name.givenNameReading}
              </p>
              {/* Pronunciation Button */}
              <button
                onClick={handlePronunciation}
                className="p-1 rounded-md bg-zinc-800/50 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-700/50 transition-all"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getGenderColor(name.gender)}`}>
              {name.gender.charAt(0).toUpperCase() + name.gender.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStyleColor(name.style)}`}>
              {name.style.charAt(0).toUpperCase() + name.style.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onFavorite(name)}
            className={`p-2 rounded-lg transition-all hover:scale-110 active:scale-95 ${
              isFavorited
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700'
            }`}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all hover:scale-110 active:scale-95 ${
              copySuccess
                ? 'bg-green-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
            }`}
            title="Copy name"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className={`p-2 rounded-lg transition-all hover:scale-110 active:scale-95 ${
              shareSuccess
                ? 'bg-green-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
            }`}
            title="Share name"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meanings Section */}
      <div className="space-y-3 text-sm mb-4">
        <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
          <h5 className="text-zinc-400 font-medium mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Name Meanings
          </h5>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-zinc-500 font-medium min-w-[80px]">Surname:</span>
              <span className="text-zinc-200">{name.surnameMeaning || 'Meaning not available'}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-zinc-500 font-medium min-w-[80px]">Given name:</span>
              <span className="text-zinc-200">{name.givenNameMeaning || 'Meaning not available'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Cultural Context */}
      {name.culturalContext && (
        <>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors mb-2 hover:bg-zinc-800/30 px-2 py-1 rounded-md -mx-2"
          >
            Cultural Context & Background
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {name.culturalContext}
                  </p>
                  
                  {/* Additional Context */}
                  <div className="mt-3 pt-3 border-t border-indigo-500/20">
                    <p className="text-xs text-zinc-500">
                      This name combination follows {name.style} anime naming conventions and would be suitable for characters in {name.style} themed stories.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Success Notifications */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
          >
            Shared!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Animation Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}