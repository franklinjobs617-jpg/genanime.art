export type Gender = "male" | "female";
export type Archetype =
  | "Hero"
  | "Warrior"
  | "Mage"
  | "Villain"
  | "Idol"
  | "Ninja"
  | "Healer"
  | "Mysterious";

export interface CharacterTrait {
  name: string;
  prompt: string;
}

export interface ArchetypeData {
  label: Archetype;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  outfits: { male: string[]; female: string[] };
  abilities: string[];
  personalities: string[][];
  backstories: { male: string[]; female: string[] };
}

export const HAIR_COLORS: CharacterTrait[] = [
  { name: "Silver", prompt: "silver hair, long flowing silver hair" },
  { name: "Black", prompt: "black hair, sleek black hair" },
  { name: "White", prompt: "white hair, pure white hair" },
  { name: "Blue", prompt: "dark blue hair, midnight blue hair" },
  { name: "Red", prompt: "crimson red hair, vibrant red hair" },
  { name: "Blonde", prompt: "golden blonde hair, bright blonde hair" },
  { name: "Purple", prompt: "violet purple hair, deep purple hair" },
  { name: "Pink", prompt: "sakura pink hair, soft pink hair" },
  { name: "Green", prompt: "emerald green hair, forest green hair" },
  { name: "Orange", prompt: "fiery orange hair, warm orange hair" },
  { name: "Brown", prompt: "chestnut brown hair, warm brown hair" },
  { name: "Teal", prompt: "teal hair, cyan teal hair" },
];

export const EYE_COLORS: CharacterTrait[] = [
  { name: "Crimson", prompt: "crimson red eyes, glowing red eyes" },
  { name: "Sapphire", prompt: "deep blue eyes, sapphire eyes" },
  { name: "Emerald", prompt: "bright green eyes, emerald eyes" },
  { name: "Amber", prompt: "golden amber eyes, warm amber eyes" },
  { name: "Violet", prompt: "violet purple eyes, glowing violet eyes" },
  { name: "Silver", prompt: "silver grey eyes, metallic silver eyes" },
  { name: "Teal", prompt: "teal eyes, cyan teal eyes" },
  { name: "Gold", prompt: "golden eyes, shining gold eyes" },
  { name: "Black", prompt: "dark black eyes, deep obsidian eyes" },
  { name: "Pink", prompt: "rose pink eyes, soft pink eyes" },
];

export const ARCHETYPES: ArchetypeData[] = [
  {
    label: "Hero",
    emoji: "🌟",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    outfits: {
      male: [
        "school uniform with a red scarf, determined expression",
        "casual jacket over white shirt, athletic build",
        "training gi with a glowing emblem on chest",
      ],
      female: [
        "school uniform with a ribbon, bright determined eyes",
        "sporty outfit with a cape, heroic pose",
        "magical girl outfit with star motifs",
      ],
    },
    abilities: [
      "Limitless Potential — breaks through any barrier with sheer willpower",
      "Blazing Fist — channels inner fire into devastating punches",
      "Hero's Aura — inspires allies and weakens enemies nearby",
      "Second Wind — recovers from any injury through determination",
    ],
    personalities: [
      ["Determined", "Loyal", "Reckless"],
      ["Optimistic", "Brave", "Stubborn"],
      ["Passionate", "Protective", "Impulsive"],
    ],
    backstories: {
      male: [
        "Born without power in a world of gifted warriors, he trained relentlessly to prove that willpower surpasses talent.",
        "The sole survivor of his village's destruction, he swore to become strong enough to protect everyone he loves.",
      ],
      female: [
        "Chosen by an ancient spirit, she must master her newfound powers before darkness consumes the world.",
        "A transfer student hiding a secret identity, balancing ordinary school life with extraordinary battles.",
      ],
    },
  },
  {
    label: "Warrior",
    emoji: "⚔️",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    outfits: {
      male: [
        "traditional samurai armor with a torn red haori",
        "battle-worn kendo uniform, katana at hip",
        "dark military coat with sword straps across back",
      ],
      female: [
        "sleek battle armor with a flowing skirt, dual blades",
        "kunoichi outfit with red accents, fierce expression",
        "warrior priestess robes with ornate shoulder guards",
      ],
    },
    abilities: [
      "Thousand Cuts — delivers a flurry of precise strikes faster than the eye can follow",
      "Iron Will — converts pain into raw physical strength",
      "Blade Storm — creates a vortex of slashing energy",
      "Unbreakable Stance — becomes immovable, deflecting all attacks",
    ],
    personalities: [
      ["Stoic", "Honorable", "Cold"],
      ["Fierce", "Disciplined", "Proud"],
      ["Calm", "Ruthless", "Loyal"],
    ],
    backstories: {
      male: [
        "The last of an ancient sword clan, he wanders seeking the warrior who destroyed his family.",
        "A former royal guard who abandoned his post after discovering the kingdom's dark secret.",
      ],
      female: [
        "Raised in a hidden mountain dojo, she descends to the world below to fulfill her master's final wish.",
        "A disgraced general's daughter who reclaimed her honor through a hundred battles.",
      ],
    },
  },
  {
    label: "Mage",
    emoji: "🔮",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    outfits: {
      male: [
        "dark wizard robes with glowing rune patterns, tall hat",
        "scholar's coat covered in magical sigils, floating books",
        "elegant cape with constellation embroidery, staff in hand",
      ],
      female: [
        "witch's outfit with star and moon motifs, pointed hat",
        "flowing magical robes with crystal accessories",
        "enchantress dress with ethereal glowing trim",
      ],
    },
    abilities: [
      "Arcane Overload — channels forbidden magic beyond human limits",
      "Reality Weave — rewrites the laws of physics in a small area",
      "Elemental Mastery — commands fire, ice, and lightning simultaneously",
      "Time Fracture — briefly stops time within a radius",
    ],
    personalities: [
      ["Intellectual", "Curious", "Arrogant"],
      ["Calm", "Mysterious", "Obsessive"],
      ["Wise", "Eccentric", "Detached"],
    ],
    backstories: {
      male: [
        "A prodigy who read every forbidden tome in the royal library, now hunted by the mages he surpassed.",
        "Accidentally absorbed an ancient spirit's power, granting him immense magic at the cost of his memories.",
      ],
      female: [
        "The youngest archmage in history, she seeks a spell powerful enough to reverse her sister's curse.",
        "A witch from a dying magical bloodline, determined to preserve her clan's ancient knowledge.",
      ],
    },
  },
  {
    label: "Villain",
    emoji: "😈",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    outfits: {
      male: [
        "long black coat with crimson lining, cold calculating eyes",
        "elegant dark suit with a sinister smile, gloved hands",
        "armored villain outfit with a dramatic cape, glowing eyes",
      ],
      female: [
        "dark queen gown with sharp shoulder pieces, commanding presence",
        "sleek black bodysuit with purple energy accents",
        "gothic lolita dress with dark magical aura",
      ],
    },
    abilities: [
      "Shadow Dominion — controls darkness and fear itself",
      "Mind Fracture — shatters an opponent's will with a glance",
      "Void Consumption — absorbs the power of defeated enemies",
      "Absolute Zero — freezes everything within sight",
    ],
    personalities: [
      ["Cunning", "Charismatic", "Merciless"],
      ["Intelligent", "Manipulative", "Elegant"],
      ["Cold", "Ambitious", "Theatrical"],
    ],
    backstories: {
      male: [
        "Once the hero's closest ally, a single betrayal twisted his ideals into a desire to remake the world by force.",
        "A genius who concluded that humanity's suffering stems from freedom itself — and decided to end both.",
      ],
      female: [
        "A former saint who witnessed the gods' indifference and chose to become the calamity they feared.",
        "Betrayed by those she protected, she rebuilt herself from nothing into the world's most feared power.",
      ],
    },
  },
  {
    label: "Idol",
    emoji: "🎤",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    outfits: {
      male: [
        "stylish idol stage outfit with pastel accents, microphone in hand",
        "trendy streetwear with a signature accessory, bright smile",
        "dazzling performance suit with light effects",
      ],
      female: [
        "sparkling idol costume with ribbons and stars, radiant smile",
        "cute pastel dress with heart motifs, energetic pose",
        "glamorous stage outfit with feather trim, confident stance",
      ],
    },
    abilities: [
      "Heartbeat Resonance — her voice heals emotional wounds and boosts morale",
      "Stage Presence — commands the attention of everyone in range",
      "Encore — repeats any action with doubled effect",
      "Fan Power — draws strength from the emotions of those watching",
    ],
    personalities: [
      ["Cheerful", "Energetic", "Perfectionist"],
      ["Warm", "Ambitious", "Sensitive"],
      ["Bubbly", "Hardworking", "Competitive"],
    ],
    backstories: {
      male: [
        "A small-town boy who entered a talent competition on a dare and discovered his voice could move thousands.",
        "A former child actor reinventing himself, hiding the pressure of fame behind a perfect smile.",
      ],
      female: [
        "She trained for seven years in secret before her debut, determined to reach the top on her own terms.",
        "A shy girl who transforms completely on stage, channeling all her unspoken feelings into her performances.",
      ],
    },
  },
  {
    label: "Ninja",
    emoji: "🌙",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    outfits: {
      male: [
        "dark shinobi outfit with a half-mask, kunai holsters",
        "sleek black tactical suit with glowing blue accents",
        "traditional ninja garb with a torn scarf, crouching pose",
      ],
      female: [
        "kunoichi outfit with purple accents, twin daggers",
        "elegant dark kimono adapted for combat, hidden blades",
        "stealth suit with hood, glowing eyes in darkness",
      ],
    },
    abilities: [
      "Shadow Step — teleports between shadows instantly",
      "Phantom Clone — creates perfect illusions indistinguishable from reality",
      "Killing Intent — paralyzes enemies with pure bloodlust",
      "Void Walk — becomes completely undetectable for 60 seconds",
    ],
    personalities: [
      ["Silent", "Precise", "Loyal"],
      ["Calculating", "Swift", "Secretive"],
      ["Focused", "Deadly", "Honorable"],
    ],
    backstories: {
      male: [
        "Raised from birth as an assassin, he questions his purpose after being ordered to kill an innocent child.",
        "The last member of a destroyed shadow clan, infiltrating the organization responsible from within.",
      ],
      female: [
        "A spy who has worn so many faces she no longer remembers her own — until one mission changes everything.",
        "Trained as the perfect weapon, she defects when her target turns out to be the only person who ever showed her kindness.",
      ],
    },
  },
  {
    label: "Healer",
    emoji: "✨",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    outfits: {
      male: [
        "white priest robes with golden trim, gentle expression",
        "nature-themed outfit with leaf motifs, warm smile",
        "medic coat with glowing green cross emblem",
      ],
      female: [
        "white miko outfit with green accents, serene expression",
        "fairy-like dress with petal details, glowing hands",
        "holy priestess robes with light emanating from palms",
      ],
    },
    abilities: [
      "Lifebloom — accelerates natural healing to near-instant recovery",
      "Soul Mend — repairs spiritual damage and removes curses",
      "Sanctuary — creates a barrier where no harm can occur",
      "Resurrection — brings back the recently fallen at great personal cost",
    ],
    personalities: [
      ["Gentle", "Empathetic", "Self-sacrificing"],
      ["Calm", "Nurturing", "Stubborn"],
      ["Kind", "Perceptive", "Overprotective"],
    ],
    backstories: {
      male: [
        "He lost his younger sister to a disease no magic could cure, driving him to master every healing art known.",
        "A battlefield medic who has seen too much death, now searching for a way to end war itself.",
      ],
      female: [
        "Blessed with healing powers she never asked for, she struggles with the weight of being everyone's last hope.",
        "A village healer who discovers her power comes from absorbing others' pain — and chooses to keep healing anyway.",
      ],
    },
  },
  {
    label: "Mysterious",
    emoji: "🌌",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    outfits: {
      male: [
        "long coat that seems to absorb light, face partially hidden",
        "elegant dark outfit with no visible weapons, unsettling calm",
        "ancient robes with symbols from a forgotten civilization",
      ],
      female: [
        "ethereal dress that shifts between colors, otherworldly beauty",
        "dark cloak with stars visible inside its folds",
        "timeless outfit suggesting she has lived through many eras",
      ],
    },
    abilities: [
      "Unknown — her true power has never been fully witnessed",
      "Causality Shift — alters the probability of events around her",
      "Memory Seal — can erase or restore any memory with a touch",
      "Existence Erase — can remove something from reality as if it never was",
    ],
    personalities: [
      ["Enigmatic", "Perceptive", "Distant"],
      ["Serene", "Cryptic", "Ageless"],
      ["Observant", "Unreadable", "Ancient"],
    ],
    backstories: {
      male: [
        "No one knows where he came from. Records of his existence appear in texts centuries old, yet he hasn't aged.",
        "He claims to be searching for something he lost — but cannot remember what it was.",
      ],
      female: [
        "She appears at pivotal moments in history, never explaining why, always leaving before questions can be asked.",
        "The only survivor of an event that erased an entire civilization from memory — including her own.",
      ],
    },
  },
];

export interface GeneratedCharacter {
  id: string;
  name: { japanese: string; reading: string; meaning: string };
  gender: Gender;
  archetype: ArchetypeData;
  hairColor: CharacterTrait;
  eyeColor: CharacterTrait;
  outfit: string;
  personality: string[];
  ability: string;
  backstory: string;
  artPrompt: string;
}

const MALE_NAMES = [
  { japanese: "蒼龍", reading: "Sōryū", meaning: "Azure Dragon" },
  { japanese: "烈火", reading: "Rekka", meaning: "Raging Fire" },
  { japanese: "影丸", reading: "Kagemaru", meaning: "Shadow Circle" },
  { japanese: "雷牙", reading: "Raiga", meaning: "Thunder Fang" },
  { japanese: "鋼鉄", reading: "Kōtetsu", meaning: "Steel" },
  { japanese: "暁斗", reading: "Akito", meaning: "Dawn Dipper" },
  { japanese: "玄武", reading: "Genbu", meaning: "Black Tortoise" },
  { japanese: "神威", reading: "Kamui", meaning: "Divine Power" },
  { japanese: "黒炎", reading: "Kokuen", meaning: "Black Flame" },
  { japanese: "白夜", reading: "Hakuya", meaning: "White Night" },
  { japanese: "嵐牙", reading: "Arashiga", meaning: "Storm Fang" },
  { japanese: "天馬", reading: "Tenma", meaning: "Heavenly Horse" },
];

const FEMALE_NAMES = [
  { japanese: "桜夜", reading: "Sakuya", meaning: "Cherry Blossom Night" },
  { japanese: "月姫", reading: "Tsukihime", meaning: "Moon Princess" },
  { japanese: "紅蓮", reading: "Guren", meaning: "Crimson Lotus" },
  { japanese: "雪華", reading: "Yukika", meaning: "Snow Flower" },
  { japanese: "星奈", reading: "Seina", meaning: "Star Ripple" },
  { japanese: "夜叉", reading: "Yasha", meaning: "Night Demon" },
  { japanese: "凛花", reading: "Rinka", meaning: "Dignified Flower" },
  { japanese: "天音", reading: "Amane", meaning: "Heavenly Sound" },
  { japanese: "影姫", reading: "Kagehime", meaning: "Shadow Princess" },
  { japanese: "炎華", reading: "Enka", meaning: "Flame Blossom" },
  { japanese: "蒼空", reading: "Sōku", meaning: "Blue Sky" },
  { japanese: "夢幻", reading: "Mugen", meaning: "Dream Illusion" },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCharacter(): GeneratedCharacter {
  const gender: Gender = Math.random() > 0.5 ? "male" : "female";
  const archetype = pick(ARCHETYPES);
  const nameList = gender === "male" ? MALE_NAMES : FEMALE_NAMES;
  const name = pick(nameList);
  const hairColor = pick(HAIR_COLORS);
  const eyeColor = pick(EYE_COLORS);
  const outfit = pick(archetype.outfits[gender]);
  const personality = pick(archetype.personalities);
  const ability = pick(archetype.abilities);
  const backstory = pick(archetype.backstories[gender]);

  const artPrompt = [
    "masterpiece, best quality, ultra-detailed",
    `anime ${gender} character`,
    `${archetype.label.toLowerCase()} archetype`,
    hairColor.prompt,
    eyeColor.prompt,
    outfit,
    "anime style, cel shading, vibrant colors",
    "dynamic pose, detailed background",
    "studio quality, 8k resolution",
  ].join(", ");

  return {
    id: `char-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    gender,
    archetype,
    hairColor,
    eyeColor,
    outfit,
    personality,
    ability,
    backstory,
    artPrompt,
  };
}

export function generateCharacters(count: number): GeneratedCharacter[] {
  return Array.from({ length: count }, generateCharacter);
}
