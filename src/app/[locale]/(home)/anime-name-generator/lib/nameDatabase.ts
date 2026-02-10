import { NameDatabase, NameEntry, StyleModifier } from './types';

// ==========================================
// 1. Surnames Database
// ==========================================
const SURNAMES: NameEntry[] = [
  // Traditional
  { kanji: "田中", reading: "Tanaka", meaning: "Middle of the rice field", frequency: 9, tags: ["traditional", "nature", "common"] },
  { kanji: "山田", reading: "Yamada", meaning: "Mountain rice field", frequency: 8, tags: ["traditional", "nature", "common"] },
  { kanji: "佐藤", reading: "Sato", meaning: "Helper wisteria", frequency: 9, tags: ["traditional", "nature", "common"] },
  { kanji: "鈴木", reading: "Suzuki", meaning: "Bell tree", frequency: 8, tags: ["traditional", "nature", "common"] },
  { kanji: "高橋", reading: "Takahashi", meaning: "High bridge", frequency: 8, tags: ["traditional", "structure", "common"] },
  // Modern/Fantasy
  { kanji: "星野", reading: "Hoshino", meaning: "Star field", frequency: 7, tags: ["modern", "fantasy", "celestial"] },
  { kanji: "月島", reading: "Tsukishima", meaning: "Moon island", frequency: 6, tags: ["fantasy", "celestial", "mystical"] },
  { kanji: "雪村", reading: "Yukimura", meaning: "Snow village", frequency: 6, tags: ["traditional", "nature", "winter"] },
  { kanji: "風間", reading: "Kazama", meaning: "Wind space", frequency: 7, tags: ["modern", "nature", "elemental"] },
  { kanji: "黒崎", reading: "Kurosaki", meaning: "Black cape", frequency: 6, tags: ["modern", "dark", "mysterious"] },
  { kanji: "白石", reading: "Shiraishi", meaning: "White stone", frequency: 7, tags: ["traditional", "nature", "pure"] },
  { kanji: "青山", reading: "Aoyama", meaning: "Blue mountain", frequency: 7, tags: ["traditional", "nature", "color"] },
  { kanji: "紅葉", reading: "Momiji", meaning: "Red leaves", frequency: 5, tags: ["fantasy", "nature", "autumn"] },
  { kanji: "神崎", reading: "Kanzaki", meaning: "God cape", frequency: 6, tags: ["fantasy", "divine", "mystical"] },
  { kanji: "龍神", reading: "Ryujin", meaning: "Dragon god", frequency: 4, tags: ["fantasy", "divine", "powerful"] }
];

// ==========================================
// 2. Male Names Database
// ==========================================
const MALE_NAMES: NameEntry[] = [
  { kanji: "太郎", reading: "Taro", meaning: "First son", frequency: 8, tags: ["traditional", "family", "common"] },
  { kanji: "次郎", reading: "Jiro", meaning: "Second son", frequency: 7, tags: ["traditional", "family", "common"] },
  { kanji: "健", reading: "Ken", meaning: "Strong, healthy", frequency: 8, tags: ["traditional", "strength", "virtue"] },
  { kanji: "誠", reading: "Makoto", meaning: "Sincerity, truth", frequency: 7, tags: ["traditional", "virtue", "honor"] },
  { kanji: "博", reading: "Hiroshi", meaning: "Tolerant, broad", frequency: 8, tags: ["traditional", "wisdom", "virtue"] },
  { kanji: "武", reading: "Takeshi", meaning: "Warrior", frequency: 7, tags: ["traditional", "strength", "warrior"] },
  { kanji: "蓮", reading: "Ren", meaning: "Lotus", frequency: 8, tags: ["modern", "nature", "pure"] },
  { kanji: "空", reading: "Sora", meaning: "Sky", frequency: 9, tags: ["modern", "nature", "freedom"] },
  { kanji: "海", reading: "Kai", meaning: "Ocean", frequency: 8, tags: ["modern", "nature", "vast"] },
  { kanji: "翔", reading: "Sho", meaning: "Soar, fly", frequency: 8, tags: ["modern", "freedom", "aspiration"] },
  { kanji: "龍", reading: "Ryu", meaning: "Dragon", frequency: 6, tags: ["fantasy", "powerful", "mythical"] },
  { kanji: "炎", reading: "Homura", meaning: "Flame", frequency: 6, tags: ["fantasy", "elemental", "passionate"] },
  { kanji: "雷", reading: "Rai", meaning: "Thunder", frequency: 6, tags: ["fantasy", "elemental", "powerful"] },
  { kanji: "影", reading: "Kage", meaning: "Shadow", frequency: 5, tags: ["fantasy", "mysterious", "dark"] },
  { kanji: "光", reading: "Hikaru", meaning: "Light, radiance", frequency: 7, tags: ["fantasy", "pure", "divine"] },
  { kanji: "零", reading: "Rei", meaning: "Zero, spirit", frequency: 6, tags: ["sci-fi", "mysterious", "modern"] },
  { kanji: "刃", reading: "Jin", meaning: "Blade", frequency: 5, tags: ["fantasy", "warrior", "sharp"] },
  { kanji: "夜", reading: "Yoru", meaning: "Night", frequency: 5, tags: ["fantasy", "mysterious", "dark"] },
  { kanji: "星", reading: "Hoshi", meaning: "Star", frequency: 7, tags: ["fantasy", "celestial", "bright"] },
  { kanji: "風", reading: "Kaze", meaning: "Wind", frequency: 6, tags: ["fantasy", "elemental", "free"] }
];

// ==========================================
// 3. Female Names Database
// ==========================================
const FEMALE_NAMES: NameEntry[] = [
  { kanji: "樱", reading: "Sakura", meaning: "Cherry blossom", frequency: 9, tags: ["traditional", "nature", "beauty"] },
  { kanji: "美", reading: "Mimi", meaning: "Beauty", frequency: 8, tags: ["traditional", "beauty", "virtue"] },
  { kanji: "花", reading: "Hana", meaning: "Flower", frequency: 8, tags: ["traditional", "nature", "beauty"] },
  { kanji: "爱", reading: "Ai", meaning: "Love", frequency: 9, tags: ["traditional", "emotion", "virtue"] },
  { kanji: "惠", reading: "Megumi", meaning: "Blessing", frequency: 8, tags: ["traditional", "virtue", "divine"] },
  { kanji: "由美", reading: "Yumi", meaning: "Reason and beauty", frequency: 8, tags: ["traditional", "beauty", "wisdom"] },
  { kanji: "雪", reading: "Yuki", meaning: "Snow", frequency: 8, tags: ["modern", "nature", "pure"] },
  { kanji: "月", reading: "Tsuki", meaning: "Moon", frequency: 7, tags: ["modern", "celestial", "mystical"] },
  { kanji: "音", reading: "Oto", meaning: "Sound", frequency: 7, tags: ["modern", "artistic", "harmony"] },
  { kanji: "希", reading: "Nozomi", meaning: "Hope", frequency: 8, tags: ["modern", "virtue", "aspiration"] },
  { kanji: "姬", reading: "Hime", meaning: "Princess", frequency: 6, tags: ["fantasy", "noble", "royal"] },
  { kanji: "舞", reading: "Mai", meaning: "Dance", frequency: 7, tags: ["fantasy", "artistic", "graceful"] },
  { kanji: "翼", reading: "Tsubasa", meaning: "Wing", frequency: 6, tags: ["fantasy", "freedom", "angelic"] },
  { kanji: "瞳", reading: "Hitomi", meaning: "Eye, pupil", frequency: 7, tags: ["modern", "beauty", "perception"] },
  { kanji: "梦", reading: "Yume", meaning: "Dream", frequency: 7, tags: ["fantasy", "mystical", "aspiration"] },
  { kanji: "虹", reading: "Niji", meaning: "Rainbow", frequency: 5, tags: ["fantasy", "colorful", "hope"] },
  { kanji: "蝶", reading: "Cho", meaning: "Butterfly", frequency: 5, tags: ["fantasy", "transformation", "delicate"] },
  { kanji: "水", reading: "Mizu", meaning: "Water", frequency: 6, tags: ["fantasy", "elemental", "pure"] },
  { kanji: "冰", reading: "Kori", meaning: "Ice", frequency: 5, tags: ["fantasy", "elemental", "cool"] },
  { kanji: "红", reading: "Beni", meaning: "Crimson", frequency: 5, tags: ["fantasy", "color", "passionate"] }
];

// ==========================================
// 4. Unisex Names Database
// ==========================================
const UNISEX_NAMES: NameEntry[] = [
  { kanji: "翔", reading: "Sho", meaning: "Soar, fly", frequency: 8, tags: ["modern", "freedom", "aspiration"] },
  { kanji: "遥", reading: "Haruka", meaning: "Distant, remote", frequency: 8, tags: ["modern", "vast", "mysterious"] },
  { kanji: "凉", reading: "Ryo", meaning: "Cool, refreshing", frequency: 7, tags: ["modern", "calm", "nature"] },
  { kanji: "纯", reading: "Jun", meaning: "Pure, genuine", frequency: 7, tags: ["traditional", "virtue", "clean"] },
  { kanji: "薰", reading: "Kaoru", meaning: "Fragrance", frequency: 6, tags: ["traditional", "nature", "subtle"] },
  { kanji: "晶", reading: "Akira", meaning: "Crystal, clear", frequency: 7, tags: ["modern", "pure", "brilliant"] },
  { kanji: "树", reading: "Itsuki", meaning: "Tree", frequency: 7, tags: ["modern", "nature", "growth"] },
  { kanji: "阳", reading: "Yo", meaning: "Sun, positive", frequency: 8, tags: ["modern", "bright", "positive"] },
  { kanji: "凪", reading: "Nagi", meaning: "Calm sea", frequency: 6, tags: ["modern", "nature", "peaceful"] },
  { kanji: "苍", reading: "Ao", meaning: "Blue, pale", frequency: 6, tags: ["modern", "color", "serene"] }
];

// ==========================================
// 5. Style Modifiers
// ==========================================
const STYLE_MODIFIERS: Record<string, StyleModifier> = {
  traditional: {
    preferredTags: ["traditional", "virtue", "honor", "family", "common"],
    excludedTags: ["sci-fi", "cyber", "digital"],
    frequencyBoost: 2
  },
  modern: {
    preferredTags: ["modern", "nature", "freedom", "aspiration", "bright"],
    excludedTags: ["ancient", "archaic"],
    frequencyBoost: 1.5
  },
  fantasy: {
    preferredTags: ["fantasy", "mystical", "elemental", "divine", "powerful", "mythical"],
    excludedTags: ["sci-fi", "cyber", "digital", "tech"],
    frequencyBoost: 2
  },
  "sci-fi": {
    preferredTags: ["sci-fi", "modern", "mysterious", "tech", "digital", "cyber"],
    excludedTags: ["traditional", "ancient", "mythical"],
    frequencyBoost: 2
  }
};

export const NAME_DATABASE: NameDatabase = {
  surnames: SURNAMES,
  givenNames: {
    male: MALE_NAMES,
    female: FEMALE_NAMES,
    unisex: UNISEX_NAMES
  },
  styleModifiers: {
    traditional: STYLE_MODIFIERS.traditional,
    modern: STYLE_MODIFIERS.modern,
    fantasy: STYLE_MODIFIERS.fantasy,
    'sci-fi': STYLE_MODIFIERS['sci-fi']
  }
};

// ==========================================
// 6. Helper & Generation Functions
// ==========================================

export function getSurnames(): NameEntry[] {
  return NAME_DATABASE.surnames;
}

export function getGivenNames(gender: 'male' | 'female' | 'unisex' | 'random'): NameEntry[] {
  if (gender === 'random') {
    return [...NAME_DATABASE.givenNames.male, ...NAME_DATABASE.givenNames.female, ...NAME_DATABASE.givenNames.unisex];
  }
  return NAME_DATABASE.givenNames[gender];
}

export function getAllGivenNames(): NameEntry[] {
  return [...NAME_DATABASE.givenNames.male, ...NAME_DATABASE.givenNames.female, ...NAME_DATABASE.givenNames.unisex];
}

export function getStyleModifier(style: string): StyleModifier | undefined {
  return NAME_DATABASE.styleModifiers[style as keyof typeof NAME_DATABASE.styleModifiers];
}

export function filterNamesByTags(names: NameEntry[], preferredTags: string[], excludedTags: string[] = []): NameEntry[] {
  return names.filter(name => {
    // Exclude names with excluded tags
    if (excludedTags.some(tag => name.tags.includes(tag))) {
      return false;
    }
    // Include names with preferred tags (or all if no preferred tags)
    return preferredTags.length === 0 || preferredTags.some(tag => name.tags.includes(tag));
  });
}

/**
 * Filter and boost names based on style modifiers
 */
export function filterNamesByStyle(names: NameEntry[], style: string): NameEntry[] {
  const modifier = STYLE_MODIFIERS[style as keyof typeof STYLE_MODIFIERS];
  if (!modifier) return names;

  return names
    .filter(name => !modifier.excludedTags.some(tag => name.tags.includes(tag)))
    .map(name => {
      // If name matches preferred style, boost its frequency for the random selection
      const isPreferred = modifier.preferredTags.some(tag => name.tags.includes(tag));
      return {
        ...name,
        frequency: isPreferred ? name.frequency * modifier.frequencyBoost : name.frequency
      };
    });
}

/**
 * Weighted random selection algorithm
 */
export function getWeightedRandom<T extends { frequency: number }>(items: T[]): T {
  if (items.length === 0) throw new Error('Cannot select from empty array');

  const totalWeight = items.reduce((sum, item) => sum + item.frequency, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.frequency;
    if (random <= 0) {
      return item;
    }
  }
  return items[items.length - 1];
}
