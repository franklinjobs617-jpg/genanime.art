"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, RotateCcw, Calendar, Filter, Search, X } from "lucide-react";
import { HistoryPanelProps, GenerationHistoryEntry } from "../lib/types";

export default function HistoryPanel({
  history,
  onRestoreGeneration,
  onClearHistory,
  onRemoveEntry
}: HistoryPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState<string>("all");
  const [filterGender, setFilterGender] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter history based on search and filters
  const filteredHistory = history.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.names.some(name => 
        name.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.surnameReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.givenNameReading.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStyle = filterStyle === "all" || entry.settings.style === filterStyle;
    const matchesGender = filterGender === "all" || entry.settings.gender === filterGender;
    
    return matchesSearch && matchesStyle && matchesGender;
  });

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history? This action cannot be undone.")) {
      onClearHistory();
    }
  };

  const handleRemoveEntry = (entryId: string) => {
    if (window.confirm("Are you sure you want to remove this entry from history?")) {
      onRemoveEntry(entryId);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20" role="status">
        <History className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-zinc-400 mb-2">No History Yet</h3>
        <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto px-4">
          Your generation history will appear here after you create some names!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Search and Filters */}
      <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-white">Generation History</h2>
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs">
              {filteredHistory.length} entries
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-all ${
                showFilters 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
              title="Toggle filters"
            >
              <Filter className="w-4 h-4" />
            </button>
            
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-2 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
                title="Clear all history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search names in history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-700">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Style</label>
                  <select
                    value={filterStyle}
                    onChange={(e) => setFilterStyle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Styles</option>
                    <option value="traditional">Traditional</option>
                    <option value="modern">Modern</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Gender</label>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="all">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                    <option value="random">Random</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History Entries */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filteredHistory.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-zinc-900/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-white/5 hover:border-zinc-700 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <time 
                      className="text-zinc-400 text-xs sm:text-sm" 
                      dateTime={new Date(entry.timestamp).toISOString()}
                      title={new Date(entry.timestamp).toLocaleString()}
                    >
                      {formatDate(entry.timestamp)}
                    </time>
                  </div>
                  
                  <h4 className="text-white font-medium text-sm sm:text-base mb-2">
                    {entry.names.length} names generated
                  </h4>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs">
                      {entry.settings.gender}
                    </span>
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs">
                      {entry.settings.style}
                    </span>
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs">
                      {entry.settings.quantity} names
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 self-start sm:self-center">
                  <button
                    onClick={() => onRestoreGeneration(entry)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
                    title="Restore this generation"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Restore</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveEntry(entry.id)}
                    className="p-2 bg-red-900/20 text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remove from history"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              {/* Name Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                {entry.names.slice(0, 6).map((name) => (
                  <div 
                    key={name.id} 
                    className="bg-zinc-800/50 rounded-lg p-2 text-center hover:bg-zinc-800/70 transition-colors"
                  >
                    <div className="text-white text-xs sm:text-sm font-medium truncate" title={name.fullName}>
                      {name.fullName}
                    </div>
                    <div className="text-zinc-400 text-xs truncate" title={`${name.surnameReading} ${name.givenNameReading}`}>
                      {name.surnameReading} {name.givenNameReading}
                    </div>
                  </div>
                ))}
                {entry.names.length > 6 && (
                  <div className="bg-zinc-800/30 rounded-lg p-2 text-center flex items-center justify-center">
                    <span className="text-zinc-500 text-xs">
                      +{entry.names.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-2">No Results Found</h3>
          <p className="text-zinc-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}