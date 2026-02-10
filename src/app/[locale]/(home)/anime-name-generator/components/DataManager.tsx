"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Upload, 
  Trash2, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  FileText,
  HardDrive,
  RefreshCw
} from "lucide-react";
import { AnimeNameStorage } from "../lib/storage";
import { LocalStorageData } from "../lib/types";

interface DataManagerProps {
  onDataImported?: (data: LocalStorageData) => void;
  onDataCleared?: () => void;
}

export default function DataManager({ onDataImported, onDataCleared }: DataManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageStats = AnimeNameStorage.getStorageStats();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = AnimeNameStorage.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `anime-names-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      const text = await file.text();
      const success = AnimeNameStorage.importData(text);
      
      if (success) {
        setImportSuccess(true);
        const newData = AnimeNameStorage.getAllData();
        onDataImported?.(newData);
        
        // Auto-close success message after 3 seconds
        setTimeout(() => {
          setImportSuccess(false);
        }, 3000);
      } else {
        setImportError('Failed to import data. Please check the file format.');
      }
    } catch (error) {
      setImportError('Invalid file format. Please select a valid backup file.');
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all data? This will remove all favorites, history, and settings. This action cannot be undone.'
    );
    
    if (confirmed) {
      AnimeNameStorage.clearAllData();
      onDataCleared?.();
      setIsOpen(false);
    }
  };

  const handleValidateAndRepair = () => {
    const repairedData = AnimeNameStorage.validateAndMigrateData();
    onDataImported?.(repairedData);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg text-sm transition-all"
        title="Manage data"
      >
        <Database className="w-4 h-4" />
        <span className="hidden sm:inline">Data</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-xl font-bold text-white">Data Manager</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              {/* Storage Statistics */}
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Storage Statistics
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Favorites:</span>
                    <span className="text-white">{storageStats.favoritesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">History entries:</span>
                    <span className="text-white">{storageStats.historyCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total size:</span>
                    <span className="text-white">{formatBytes(storageStats.totalSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Storage available:</span>
                    <span className={storageStats.isAvailable ? "text-green-400" : "text-red-400"}>
                      {storageStats.isAvailable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {/* Export Data */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Backup Data</h3>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export Backup
                      </>
                    )}
                  </button>
                  <p className="text-xs text-zinc-500 mt-1">
                    Download all your data as a JSON file
                  </p>
                </div>

                {/* Import Data */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Restore Data</h3>
                  <button
                    onClick={handleImportClick}
                    disabled={isImporting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                  >
                    {isImporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Import Backup
                      </>
                    )}
                  </button>
                  <p className="text-xs text-zinc-500 mt-1">
                    Restore data from a backup file
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Validate and Repair */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2">Maintenance</h3>
                  <button
                    onClick={handleValidateAndRepair}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Validate & Repair
                  </button>
                  <p className="text-xs text-zinc-500 mt-1">
                    Check and fix any data corruption issues
                  </p>
                </div>

                {/* Clear All Data */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Danger Zone
                  </h3>
                  <button
                    onClick={handleClearAll}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Data
                  </button>
                  <p className="text-xs text-zinc-500 mt-1">
                    Permanently delete all favorites, history, and settings
                  </p>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {importError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-300 font-medium">Import Failed</p>
                      <p className="text-xs text-red-400 mt-1">{importError}</p>
                    </div>
                    <button
                      onClick={() => setImportError(null)}
                      className="ml-auto text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {importSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <p className="text-sm text-green-300">Data imported successfully!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}