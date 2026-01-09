"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GeneratedImage {
  id: string;
  image: string;
  prompt: string;
  style: string;
  ratio: string;
  model: string;
  timestamp: number;
}

interface GenerationHistoryContextType {
  history: GeneratedImage[];
  addToHistory: (image: GeneratedImage) => void;
  clearHistory: () => void;
}

const GenerationHistoryContext = createContext<GenerationHistoryContextType | undefined>(undefined);

export const GenerationHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  // 从 localStorage 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('generationHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading generation history:', error);
      }
    }
  }, []);

  // 保存历史记录到 localStorage
  useEffect(() => {
    localStorage.setItem('generationHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (image: GeneratedImage) => {
    setHistory(prev => [image, ...prev].slice(0, 20)); // 只保留最近20条记录
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('generationHistory');
  };

  return (
    <GenerationHistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </GenerationHistoryContext.Provider>
  );
};

export const useGenerationHistory = () => {
  const context = useContext(GenerationHistoryContext);
  if (context === undefined) {
    throw new Error('useGenerationHistory must be used within a GenerationHistoryProvider');
  }
  return context;
};