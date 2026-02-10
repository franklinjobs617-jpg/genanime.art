"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class StorageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Storage error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    // Clear potentially corrupted data
    try {
      localStorage.removeItem('anime-name-favorites');
      localStorage.removeItem('anime-name-history');
      localStorage.removeItem('anime-name-settings');
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    
    // Reset error state
    this.setState({ hasError: false, error: null });
    
    // Reload the page to start fresh
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030305] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900/50 rounded-2xl p-8 border border-red-500/20 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Storage Error</h2>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              There was an issue with your saved data. This might be due to corrupted storage or 
              browser limitations. We can reset your data to fix this issue.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Data & Reload
              </button>
              
              <p className="text-xs text-zinc-500">
                This will clear all favorites, history, and settings
              </p>
            </div>
            
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-zinc-400 cursor-pointer hover:text-white">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 bg-zinc-800 rounded text-xs text-red-400 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}