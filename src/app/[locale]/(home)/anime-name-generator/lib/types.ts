// Core interfaces for the anime name generator

export interface GeneratedName {
  id: string;
  surname: string;
  givenName: string;
  fullName: string;
  surnameReading: string;
  givenNameReading: string;
  surnameMeaning: string;
  givenNameMeaning: string;
  culturalContext?: string;
  gender: 'male' | 'female' | 'unisex';
  style: string;
  timestamp: number;
}

export interface GenerationSettings {
  gender: 'male' | 'female' | 'unisex' | 'random';
  style: 'traditional' | 'modern' | 'fantasy' | 'sci-fi' | 'mixed';
  quantity: number; // 1-20
}

export interface NameEntry {
  kanji: string;
  reading: string;
  meaning: string;
  frequency: number; // 1-10 for weighted selection
  tags: string[]; // ['noble', 'nature', 'strength', etc.]
}

export interface StyleModifier {
  preferredTags: string[];
  excludedTags: string[];
  frequencyBoost: number;
}

export interface NameDatabase {
  surnames: NameEntry[];
  givenNames: {
    male: NameEntry[];
    female: NameEntry[];
    unisex: NameEntry[];
  };
  styleModifiers: {
    traditional: StyleModifier;
    modern: StyleModifier;
    fantasy: StyleModifier;
    'sci-fi': StyleModifier;
  };
}

export interface GenerationHistoryEntry {
  id: string;
  names: GeneratedName[];
  settings: GenerationSettings;
  timestamp: number;
}

export interface LocalStorageData {
  favorites: GeneratedName[];
  history: GenerationHistoryEntry[];
  settings: GenerationSettings;
}

// Component prop interfaces
export interface NameGeneratorProps {
  initialSettings?: GenerationSettings;
}

export interface NameCardProps {
  name: GeneratedName;
  onFavorite: (name: GeneratedName) => void;
  onCopy: (name: GeneratedName) => void;
  isFavorited: boolean;
}

export interface FilterPanelProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export interface FavoritesListProps {
  favorites: GeneratedName[];
  onRemoveFavorite: (nameId: string) => void;
  onCopyName: (name: GeneratedName) => void;
}

export interface HistoryPanelProps {
  history: GenerationHistoryEntry[];
  onRestoreGeneration: (entry: GenerationHistoryEntry) => void;
  onClearHistory: () => void;
  onRemoveEntry: (entryId: string) => void;
}

// Style and gender option types
export type GenderOption = {
  value: GenerationSettings['gender'];
  label: string;
  description: string;
};

export type StyleOption = {
  value: GenerationSettings['style'];
  label: string;
  description: string;
  examples: string[];
};

// API response types (for future database integration)
export interface UserFavorite {
  id: string;
  userId: string;
  nameData: GeneratedName;
  createdAt: string;
}

export interface UserHistory {
  id: string;
  userId: string;
  generationData: GeneratedName[];
  settings: GenerationSettings;
  createdAt: string;
}