"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import type {
  GeneratedName,
  GenerationHistoryEntry,
  GenerationSettings,
  LocalStorageData,
} from "../lib/types";
import { generateAnimeNames, generateSemanticMatch } from "../lib/nameGenerator";
import { AnimeNameStorage } from "../lib/storage";
import DataManager from "./DataManager";
import HistoryPanel from "./HistoryPanel";

type TabType = "results" | "favorites" | "history";
type GenerationMode =
  | "random"
  | "character"
  | "male"
  | "female"
  | "from-name"
  | "last-name";
type MeaningTheme = "none" | "nature" | "power" | "mystery" | "light" | "nobility";
type VisibleStyle = Exclude<GenerationSettings["style"], "mixed">;

const MODE_OPTIONS: Array<{ id: GenerationMode; label: string; helper: string }> = [
  {
    id: "random",
    label: "Random",
    helper: "Best for quick idea exploration",
  },
  {
    id: "character",
    label: "Character",
    helper: "General anime character naming",
  },
  {
    id: "male",
    label: "Male",
    helper: "Male-focused name generation",
  },
  {
    id: "female",
    label: "Female",
    helper: "Female-focused name generation",
  },
  {
    id: "from-name",
    label: "From My Name",
    helper: "Convert your input into anime style",
  },
  {
    id: "last-name",
    label: "Last Name",
    helper: "Surname-only output format",
  },
];

const STYLE_OPTIONS: Array<{
  id: VisibleStyle;
  label: string;
}> = [
  { id: "traditional", label: "Traditional" },
  { id: "modern", label: "Modern" },
  { id: "fantasy", label: "Fantasy" },
  { id: "sci-fi", label: "Sci-Fi" },
];

const DEFAULT_SETTINGS: GenerationSettings = {
  gender: "random",
  style: "modern",
  quantity: 6,
};

const FAQ_ITEMS = [
  {
    question: "What is an anime name generator?",
    answer:
      "An anime name generator creates character-style names using anime-inspired naming patterns. This page gives you kanji, romaji, and meaning in one result card, so names are usable immediately.",
  },
  {
    question: "How is this different from a random anime name generator?",
    answer:
      "A basic random generator only outputs names. This page adds mode controls, style filters, meaning focus, and from-my-name logic, so output matches your task instead of pure randomness.",
  },
  {
    question: "Can I generate male and female anime names separately?",
    answer:
      "Yes. Choose Male or Female mode in Step 1 and run generation. If you want mixed options, use Random or Character mode.",
  },
  {
    question: "Can I generate anime names from my real name?",
    answer:
      "Yes. Use From My Name mode and enter your input name before generating. The engine prioritizes phonetic closeness while keeping anime-friendly output.",
  },
  {
    question: "Can I get anime names with meaning and kanji?",
    answer:
      "Yes. Every result includes kanji, romaji, and meaning text. For stronger intent, set Meaning Focus to nature, power, mystery, light, or nobility.",
  },
  {
    question: "Can I generate only last names / surnames?",
    answer:
      "Yes. Select Last Name mode and the output card will prioritize surname-style results. This is useful for family-name-first character worldbuilding.",
  },
  {
    question: "Can I use generated names for commercial projects?",
    answer:
      "Yes, this tool is free and the generated names can be used in creator workflows. Before publishing, you should still run your own legal and brand checks for final release.",
  },
  {
    question: "What should I do if I need anime attack/ability names?",
    answer:
      "Use Fantasy style plus Meaning Focus as a temporary method for dramatic naming patterns. For dedicated skill/attack naming, use the planned attack-name subtool page in your hub-and-spoke structure.",
  },
];

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function clampQuantity(quantity: number): number {
  if (quantity < 1) return 1;
  if (quantity > 20) return 20;
  return quantity;
}

function sanitizeStoredSettings(stored: GenerationSettings): GenerationSettings {
  const validStyles: VisibleStyle[] = ["traditional", "modern", "fantasy", "sci-fi"];
  const validGenders: GenerationSettings["gender"][] = [
    "random",
    "male",
    "female",
    "unisex",
  ];

  return {
    gender: validGenders.includes(stored.gender) ? stored.gender : "random",
    style: validStyles.includes(stored.style as VisibleStyle) ? stored.style : "modern",
    quantity: clampQuantity(stored.quantity),
  };
}

function dedupeByFullName(names: GeneratedName[]): GeneratedName[] {
  const used = new Set<string>();
  return names.filter((name) => {
    if (used.has(name.fullName)) return false;
    used.add(name.fullName);
    return true;
  });
}

function getResolvedGender(mode: GenerationMode): GenerationSettings["gender"] {
  if (mode === "male") return "male";
  if (mode === "female") return "female";
  if (mode === "character") return "unisex";
  return "random";
}

function calculateSeedScore(name: GeneratedName, seed: string): number {
  const normalizedSeed = normalizeText(seed);
  if (!normalizedSeed) return 0;

  const reading = normalizeText(`${name.surnameReading}${name.givenNameReading}`);
  const firstChar = normalizedSeed.slice(0, 1);
  const firstTwo = normalizedSeed.slice(0, 2);
  const lastChar = normalizedSeed.slice(-1);
  const middleChar = normalizedSeed.slice(
    Math.floor(normalizedSeed.length / 2),
    Math.floor(normalizedSeed.length / 2) + 1,
  );

  let score = 0;

  if (firstTwo && reading.startsWith(firstTwo)) score += 7;
  if (firstChar && reading.startsWith(firstChar)) score += 4;
  if (lastChar && reading.includes(lastChar)) score += 3;
  if (middleChar && reading.includes(middleChar)) score += 1;

  return score;
}

export default function AnimeNameGeneratorClient() {
  const [storedData] = useState<LocalStorageData>(() => {
    try {
      return AnimeNameStorage.validateAndMigrateData();
    } catch {
      return {
        favorites: [],
        history: [],
        settings: DEFAULT_SETTINGS,
      };
    }
  });

  const [settings, setSettings] = useState<GenerationSettings>(
    sanitizeStoredSettings(storedData.settings),
  );
  const [mode, setMode] = useState<GenerationMode>("random");
  const [meaningTheme, setMeaningTheme] = useState<MeaningTheme>("none");
  const [fromNameInput, setFromNameInput] = useState("");
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [favorites, setFavorites] = useState<GeneratedName[]>(storedData.favorites);
  const [history, setHistory] = useState<GenerationHistoryEntry[]>(storedData.history);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("results");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    AnimeNameStorage.saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    AnimeNameStorage.saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    AnimeNameStorage.saveHistory(history);
  }, [history]);

  const modeHelper = useMemo(
    () => MODE_OPTIONS.find((option) => option.id === mode)?.helper ?? "",
    [mode],
  );

  const generateWithMeaningTheme = useCallback(
    (activeSettings: GenerationSettings): GeneratedName[] => {
      const pool: GeneratedName[] = [];
      const poolSize = Math.max(activeSettings.quantity * 4, 20);

      for (let index = 0; index < poolSize; index += 1) {
        pool.push(
          meaningTheme === "none"
            ? generateAnimeNames({ ...activeSettings, quantity: 1 })[0]
            : generateSemanticMatch(activeSettings, meaningTheme),
        );
      }

      return dedupeByFullName(pool).slice(0, activeSettings.quantity);
    },
    [meaningTheme],
  );

  const handleGenerate = useCallback(async () => {
    if (mode === "from-name" && fromNameInput.trim().length < 2) {
      setValidationError("Please enter at least 2 characters in From My Name mode.");
      return;
    }

    setValidationError(null);
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 220));

    const activeSettings: GenerationSettings = {
      ...settings,
      gender: getResolvedGender(mode),
    };

    let nextNames: GeneratedName[];

    if (mode === "from-name") {
      const pool = generateWithMeaningTheme(activeSettings);
      const ranked = [...pool].sort(
        (left, right) =>
          calculateSeedScore(right, fromNameInput) - calculateSeedScore(left, fromNameInput),
      );
      nextNames = ranked.slice(0, activeSettings.quantity);
    } else {
      nextNames = generateWithMeaningTheme(activeSettings);
    }

    const uniqueNames = dedupeByFullName(nextNames).slice(0, activeSettings.quantity);
    setGeneratedNames(uniqueNames);
    setHistory((previousHistory) =>
      [
        {
          id: `history-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          names: uniqueNames,
          settings: activeSettings,
          timestamp: Date.now(),
        },
        ...previousHistory,
      ].slice(0, 50),
    );
    setActiveTab("results");
    setIsGenerating(false);
  }, [fromNameInput, generateWithMeaningTheme, mode, settings]);

  const handleFavorite = useCallback((name: GeneratedName) => {
    setFavorites((previousFavorites) =>
      previousFavorites.some((favorite) => favorite.id === name.id)
        ? previousFavorites.filter((favorite) => favorite.id !== name.id)
        : [name, ...previousFavorites],
    );
  }, []);

  const handleCopy = useCallback(
    async (name: GeneratedName) => {
      const outputText =
        mode === "last-name"
          ? `${name.surnameReading} (${name.surname})`
          : `${name.surnameReading} ${name.givenNameReading} (${name.fullName})`;
      try {
        await navigator.clipboard.writeText(outputText);
        setCopiedId(name.id);
        setTimeout(() => setCopiedId(null), 1500);
      } catch {
        setCopiedId(null);
      }
    },
    [mode],
  );

  const handleDataImported = useCallback((data: LocalStorageData) => {
    setFavorites(data.favorites);
    setHistory(data.history);
    setSettings(sanitizeStoredSettings(data.settings));
  }, []);

  const handleDataCleared = useCallback(() => {
    setFavorites([]);
    setHistory([]);
    setGeneratedNames([]);
    setSettings(DEFAULT_SETTINGS);
    setMode("random");
    setMeaningTheme("none");
    setFromNameInput("");
  }, []);

  return (
    <div className="min-h-screen bg-[#040507] text-zinc-100">
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:px-6 md:pt-20">
        <section className="rounded-3xl border border-white/10 bg-[#0a0b10]/75 p-6 md:p-10">
          <p className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-200">
            Free Tool · No Login · Unlimited Generation
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Anime Name Generator
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Generate anime character names instantly — random, male/female, with meaning, or from your name.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#0a0b10]/75 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                Generate in 3 Steps
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                One clear path: choose mode, choose style, generate and use.
              </p>
            </div>
            <DataManager onDataImported={handleDataImported} onDataCleared={handleDataCleared} />
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Step 1 · Choose Mode
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {MODE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                      mode === option.id
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-[#0b0c12] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="mt-1 text-xs text-zinc-400">{option.helper}</p>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-500">{modeHelper}</p>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Step 2 · Choose Style
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setSettings((previousSettings) => ({
                        ...previousSettings,
                        style: option.id,
                      }))
                    }
                    className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                      settings.style === option.id
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-[#0b0c12] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meaning-theme"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Optional · Meaning Focus
                </label>
                <select
                  id="meaning-theme"
                  value={meaningTheme}
                  onChange={(event) => setMeaningTheme(event.target.value as MeaningTheme)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b0c12] px-4 py-3 text-sm text-zinc-100 focus:border-white/30 focus:outline-none"
                >
                  <option value="none">No specific meaning focus</option>
                  <option value="nature">Nature / calm</option>
                  <option value="power">Power / strength</option>
                  <option value="mystery">Mystery / dark</option>
                  <option value="light">Light / hopeful</option>
                  <option value="nobility">Noble / royal</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Optional · Quantity ({settings.quantity})
                </label>
                <input
                  id="quantity"
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={settings.quantity}
                  onChange={(event) =>
                    setSettings((previousSettings) => ({
                      ...previousSettings,
                      quantity: clampQuantity(Number(event.target.value)),
                    }))
                  }
                  className="w-full accent-white"
                />
              </div>
            </div>

            {mode === "from-name" && (
              <div>
                <label
                  htmlFor="from-name-input"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  From My Name Input
                </label>
                <input
                  id="from-name-input"
                  type="text"
                  value={fromNameInput}
                  onChange={(event) => setFromNameInput(event.target.value)}
                  placeholder="e.g. Alex / Lina / Jun"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0c12] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
                />
              </div>
            )}

            {validationError && (
              <p className="rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-xs text-red-200">
                {validationError}
              </p>
            )}

            <div className="rounded-2xl border border-white/10 bg-[#0b0c12] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Step 3 · Generate + Copy + Use
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-zinc-400 md:text-sm">
                  Primary flow: generate names, copy your favorite, and open character art.
                </p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-400"
                >
                  {isGenerating ? "Generating..." : "Generate Names"}
                </button>
              </div>
            </div>
          </div>
        </section>

    

        {(generatedNames.length > 0 || favorites.length > 0 || history.length > 0) && (
          <section className="mt-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "results", label: `Results (${generatedNames.length})` },
                { id: "favorites", label: `Favorites (${favorites.length})` },
                { id: "history", label: "History" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </section>
        )}

        <AnimatePresence mode="wait">
          {activeTab === "results" && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6"
            >
              {generatedNames.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {generatedNames.map((name) => (
                    <NameCard
                      key={name.id}
                      mode={mode}
                      copied={copiedId === name.id}
                      favorited={favorites.some((favorite) => favorite.id === name.id)}
                      name={name}
                      onCopy={() => handleCopy(name)}
                      onFavorite={() => handleFavorite(name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#0a0b10]/75 p-10 text-center">
                  <p className="text-base font-semibold text-white">
                    Generate your first batch to see result cards here.
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Start with Random mode if you are not sure.
                  </p>
                </div>
              )}
            </motion.section>
          )}

          {activeTab === "favorites" && (
            <motion.section
              key="favorites"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6"
            >
              {favorites.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {favorites.map((name) => (
                    <NameCard
                      key={name.id}
                      mode={mode}
                      copied={copiedId === name.id}
                      favorited={true}
                      name={name}
                      onCopy={() => handleCopy(name)}
                      onFavorite={() => handleFavorite(name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#0a0b10]/75 p-10 text-center text-sm text-zinc-400">
                  No favorites yet.
                </div>
              )}
            </motion.section>
          )}

          {activeTab === "history" && (
            <motion.section
              key="history"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6"
            >
              <HistoryPanel
                history={history}
                onRestoreGeneration={(entry) => {
                  setGeneratedNames(entry.names);
                  setActiveTab("results");
                }}
                onClearHistory={() => setHistory([])}
                onRemoveEntry={(entryId) =>
                  setHistory((previousHistory) =>
                    previousHistory.filter((entry) => entry.id !== entryId),
                  )
                }
              />
            </motion.section>
          )}
        </AnimatePresence>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#0a0b10]/75 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Mode Comparison
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Pick mode by user intent, not by guesswork.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-white/[0.03] text-zinc-300">
                <tr>
                  <th className="px-3 py-2 font-medium">Mode</th>
                  <th className="px-3 py-2 font-medium">Best Use Case</th>
                  <th className="px-3 py-2 font-medium">Output Style</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                {[
                  ["Random", "Quick ideation", "Mixed variation set"],
                  ["Character", "OC/protagonist naming", "Balanced character names"],
                  ["Male", "Male character naming", "Male-priority outputs"],
                  ["Female", "Female character naming", "Female-priority outputs"],
                  ["From My Name", "Personalized naming", "Phonetic similarity priority"],
                  ["Last Name", "Family/worldbuilding", "Surname-first output"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-white/10">
                    <td className="px-3 py-2">{row[0]}</td>
                    <td className="px-3 py-2">{row[1]}</td>
                    <td className="px-3 py-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#0a0b10]/75 p-6 md:p-8">
          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              What is an Anime Name Generator?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              It is a tool that generates anime-style names with practical output format (kanji, romaji, meaning) in one run.
            </p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-zinc-400">
              <li>Set mode based on your intent.</li>
              <li>Set style and optional meaning focus.</li>
              <li>Generate, copy, and move to art generation.</li>
            </ol>
          </article>

          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Random / Male / Female Anime Name Generator
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Use these modes when you need fast filtering by gender intent without extra setup.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
              <li>Random: broad ideation for early concept stage.</li>
              <li>Male/Female: direct targeting for specific character briefs.</li>
              <li>Character: neutral baseline for OC and protagonist drafts.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Anime Name Generator From My Name
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              From My Name mode gives you personalized naming by matching your input phonetics.
            </p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-zinc-400">
              <li>Switch mode to From My Name.</li>
              <li>Enter at least 2 characters (e.g., Alex, Lina, Ken).</li>
              <li>Generate and choose the closest output rhythm.</li>
            </ol>
          </article>

          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Anime Names With Meaning
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Meaning Focus gives semantic direction so names fit story tone, not just sound.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Nature: calm, elegant worldbuilding",
                "Power: action and battle protagonists",
                "Mystery: dark or hidden identity roles",
                "Light: hopeful or healing characters",
                "Nobility: royal and high-status personas",
                "None: neutral variety for fast iteration",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-[#0b0c12] px-3 py-2 text-xs text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Use Cases
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Choose mode by final output scenario to reduce retries and improve naming consistency.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400">
              <li>OC creation: Character mode + Modern style.</li>
              <li>Protagonist naming: Male/Female mode + Traditional style.</li>
              <li>Game NPC pool: Random mode + high quantity.</li>
              <li>Story lore: Last Name mode + Meaning Focus.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl font-semibold text-white md:text-2xl">FAQ</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Practical answers for execution, not generic marketing text.
            </p>
            <div className="mt-3 space-y-2">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="rounded-xl border border-white/10 bg-[#0b0c12] px-4 py-3"
                >
                  <summary className="cursor-pointer list-none text-sm font-medium text-zinc-100">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0a0b10]/75 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Related Tools
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Continue the workflow after naming.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              {
                label: "Anime Art Generator",
                href: "/generator",
                desc: "Turn selected names into character visuals.",
              },
              {
                label: "Image to Prompt",
                href: "/image-to-prompt",
                desc: "Extract prompt structures from references.",
              },
              {
                label: "Prompt Library",
                href: "/prompt-library",
                desc: "Reuse prompt templates for consistency.",
              },
              {
                label: "Anime Gallery",
                href: "/gallery",
                desc: "Review style and naming inspiration.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-white/10 bg-[#0b0c12] p-4 transition-colors hover:border-white/20"
              >
                <p className="text-sm font-semibold text-white">{tool.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function NameCard({
  mode,
  name,
  copied,
  favorited,
  onCopy,
  onFavorite,
}: {
  mode: GenerationMode;
  name: GeneratedName;
  copied: boolean;
  favorited: boolean;
  onCopy: () => void;
  onFavorite: () => void;
}) {
  const displayName =
    mode === "last-name"
      ? name.surnameReading
      : `${name.surnameReading} ${name.givenNameReading}`;
  const kanjiName = mode === "last-name" ? name.surname : name.fullName;
  const prompt = encodeURIComponent(
    `anime character ${name.surnameReading} ${name.givenNameReading}, ${name.surnameMeaning}, ${name.givenNameMeaning}, masterpiece, best quality`,
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-[#0a0b10]/75 p-5">
      <h3 className="truncate text-2xl font-semibold tracking-tight text-white">
        {displayName}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-400">
        Kanji: {kanjiName}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
        {name.surnameMeaning} · {name.givenNameMeaning}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={onFavorite}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            favorited
              ? "border-rose-300/40 bg-rose-300/10 text-rose-200"
              : "border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10"
          }`}
        >
          {favorited ? "Saved" : "Save"}
        </button>
        <a
          href={`/generator?prompt=${prompt}`}
          className="rounded-lg border border-white/15 bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
        >
          Generate Art
        </a>
      </div>
    </article>
  );
}
