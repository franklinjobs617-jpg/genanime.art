import { GeneratedName, GenerationHistoryEntry, GenerationSettings, LocalStorageData } from './types';

// Storage keys
const STORAGE_KEYS = {
  FAVORITES: 'anime-name-favorites',
  HISTORY: 'anime-name-history',
  SETTINGS: 'anime-name-settings',
  USER_DATA: 'anime-name-user-data'
} as const;

// Default data structure
const DEFAULT_DATA: LocalStorageData = {
  favorites: [],
  history: [],
  settings: {
    gender: 'random',
    style: 'mixed',
    quantity: 6
  }
};

// Storage utility class
export class AnimeNameStorage {
  private static isClient = typeof window !== 'undefined';

  // Check if localStorage is available
  private static isStorageAvailable(): boolean {
    if (!this.isClient) return false;
    
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Safe JSON parse with fallback
  private static safeJsonParse<T>(value: string | null, fallback: T): T {
    if (!value) return fallback;
    
    try {
      return JSON.parse(value);
    } catch {
      console.warn('Failed to parse stored data, using fallback');
      return fallback;
    }
  }

  // Safe localStorage operations
  private static safeSetItem(key: string, value: any): boolean {
    if (!this.isStorageAvailable()) return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  private static safeGetItem<T>(key: string, fallback: T): T {
    if (!this.isStorageAvailable()) return fallback;
    
    try {
      const value = localStorage.getItem(key);
      return this.safeJsonParse(value, fallback);
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return fallback;
    }
  }

  // Favorites management
  static getFavorites(): GeneratedName[] {
    return this.safeGetItem(STORAGE_KEYS.FAVORITES, []);
  }

  static saveFavorites(favorites: GeneratedName[]): boolean {
    return this.safeSetItem(STORAGE_KEYS.FAVORITES, favorites);
  }

  static addFavorite(name: GeneratedName): boolean {
    const favorites = this.getFavorites();
    const exists = favorites.find(fav => fav.id === name.id);
    
    if (!exists) {
      favorites.unshift(name); // Add to beginning
      return this.saveFavorites(favorites);
    }
    
    return true; // Already exists
  }

  static removeFavorite(nameId: string): boolean {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(fav => fav.id !== nameId);
    return this.saveFavorites(filtered);
  }

  static isFavorited(nameId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === nameId);
  }

  static clearFavorites(): boolean {
    return this.safeSetItem(STORAGE_KEYS.FAVORITES, []);
  }

  // History management
  static getHistory(): GenerationHistoryEntry[] {
    return this.safeGetItem(STORAGE_KEYS.HISTORY, []);
  }

  static saveHistory(history: GenerationHistoryEntry[]): boolean {
    // Keep only the last 50 entries
    const trimmedHistory = history.slice(0, 50);
    return this.safeSetItem(STORAGE_KEYS.HISTORY, trimmedHistory);
  }

  static addHistoryEntry(entry: GenerationHistoryEntry): boolean {
    const history = this.getHistory();
    history.unshift(entry); // Add to beginning
    return this.saveHistory(history);
  }

  static removeHistoryEntry(entryId: string): boolean {
    const history = this.getHistory();
    const filtered = history.filter(entry => entry.id !== entryId);
    return this.saveHistory(filtered);
  }

  static clearHistory(): boolean {
    return this.safeSetItem(STORAGE_KEYS.HISTORY, []);
  }

  // Settings management
  static getSettings(): GenerationSettings {
    return this.safeGetItem(STORAGE_KEYS.SETTINGS, DEFAULT_DATA.settings);
  }

  static saveSettings(settings: GenerationSettings): boolean {
    return this.safeSetItem(STORAGE_KEYS.SETTINGS, settings);
  }

  // Complete data management
  static getAllData(): LocalStorageData {
    return {
      favorites: this.getFavorites(),
      history: this.getHistory(),
      settings: this.getSettings()
    };
  }

  static saveAllData(data: LocalStorageData): boolean {
    const success = [
      this.saveFavorites(data.favorites),
      this.saveHistory(data.history),
      this.saveSettings(data.settings)
    ];
    
    return success.every(Boolean);
  }

  static clearAllData(): boolean {
    const success = [
      this.clearFavorites(),
      this.clearHistory(),
      this.safeSetItem(STORAGE_KEYS.SETTINGS, DEFAULT_DATA.settings)
    ];
    
    return success.every(Boolean);
  }

  // Data validation and migration
  static validateAndMigrateData(): LocalStorageData {
    const data = this.getAllData();
    
    // Validate favorites
    data.favorites = data.favorites.filter(fav => 
      fav && fav.id && fav.fullName && fav.surnameReading && fav.givenNameReading
    );

    // Validate history
    data.history = data.history.filter(entry => 
      entry && entry.id && entry.names && Array.isArray(entry.names) && entry.settings
    );

    // Validate settings
    if (!data.settings || typeof data.settings !== 'object') {
      data.settings = DEFAULT_DATA.settings;
    } else {
      // Ensure all required settings exist
      data.settings = {
        gender: data.settings.gender || DEFAULT_DATA.settings.gender,
        style: data.settings.style || DEFAULT_DATA.settings.style,
        quantity: data.settings.quantity || DEFAULT_DATA.settings.quantity
      };
    }

    // Save cleaned data
    this.saveAllData(data);
    
    return data;
  }

  // Export/Import functionality
  static exportData(): string {
    const data = this.getAllData();
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as LocalStorageData;
      
      // Validate imported data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format');
      }

      // Ensure required properties exist
      const validatedData: LocalStorageData = {
        favorites: Array.isArray(data.favorites) ? data.favorites : [],
        history: Array.isArray(data.history) ? data.history : [],
        settings: data.settings || DEFAULT_DATA.settings
      };

      return this.saveAllData(validatedData);
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Storage usage statistics
  static getStorageStats(): {
    favoritesCount: number;
    historyCount: number;
    totalSize: number;
    isAvailable: boolean;
  } {
    const data = this.getAllData();
    const totalSize = this.isClient ? 
      new Blob([JSON.stringify(data)]).size : 0;

    return {
      favoritesCount: data.favorites.length,
      historyCount: data.history.length,
      totalSize,
      isAvailable: this.isStorageAvailable()
    };
  }
}

// Convenience functions for direct use
export const {
  getFavorites,
  saveFavorites,
  addFavorite,
  removeFavorite,
  isFavorited,
  clearFavorites,
  getHistory,
  saveHistory,
  addHistoryEntry,
  removeHistoryEntry,
  clearHistory,
  getSettings,
  saveSettings,
  getAllData,
  saveAllData,
  clearAllData,
  validateAndMigrateData,
  exportData,
  importData,
  getStorageStats
} = AnimeNameStorage;