export interface SeedancePromptTemplate {
  id: string;
  title: string;
  category: "opening" | "action" | "romance" | "ad" | "loop";
  useCase: string;
  prompt: string;
  negativePrompt: string;
  camera: string;
  duration: "5s" | "8s" | "12s";
  aspectRatio: "16:9" | "9:16" | "1:1";
}

export const SEEDANCE_PROMPT_TEMPLATES: SeedancePromptTemplate[] = [
  {
    id: "opening-neon-city",
    title: "Neon City Anime Opening",
    category: "opening",
    useCase: "Anime trailer intro, channel opener",
    prompt:
      "anime protagonist standing on rooftop at dusk, neon city skyline, wind moving hair and coat, cinematic rim light, rain particles, dramatic atmosphere, high-detail anime style, smooth frame coherence",
    negativePrompt:
      "flicker, jitter, deformed face, extra limbs, blurry details, text watermark, abrupt scene cut, oversaturated highlights",
    camera: "slow push-in + slight orbit from left to right",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "opening-school-spring",
    title: "Spring School Slice-of-Life OP",
    category: "opening",
    useCase: "Slice-of-life opening sequence",
    prompt:
      "high school courtyard in spring, cherry blossom petals, anime girl smiling and turning back, warm sunlight, gentle pastel palette, clean line art, soft cinematic motion",
    negativePrompt:
      "harsh shadows, ugly anatomy, unstable eyes, frame tearing, low detail, noisy background",
    camera: "tracking side pan + gentle tilt-up",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "action-sword-rush",
    title: "Sword Rush Action Shot",
    category: "action",
    useCase: "Battle highlight, combat teaser",
    prompt:
      "anime swordsman dashing forward, sparks and dust trails, dynamic motion blur, high contrast dramatic lighting, detailed costume and weapon, epic action composition",
    negativePrompt:
      "ghosting, double face, broken hand, random artifacts, frame stutter, muddy colors",
    camera: "fast dolly-in + follow motion",
    duration: "5s",
    aspectRatio: "16:9",
  },
  {
    id: "action-mecha-launch",
    title: "Mecha Launch Sequence",
    category: "action",
    useCase: "Mecha promo, sci-fi trailer",
    prompt:
      "anime mecha launching from hangar, exhaust flame, metallic reflections, volumetric smoke, futuristic UI glow, cinematic sci-fi anime look",
    negativePrompt:
      "geometry collapse, inconsistent armor, unstable perspective, overexposure, low-res texture",
    camera: "low-angle crane-up + forward push",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "romance-rain-window",
    title: "Rainy Window Romance",
    category: "romance",
    useCase: "Emotional scene, romance clip",
    prompt:
      "anime couple near rainy window, warm indoor lamp contrast, subtle emotional eye contact, soft depth of field, cinematic anime drama mood",
    negativePrompt:
      "awkward expression, face drift, warped fingers, noisy grain, sudden exposure jumps",
    camera: "slow inward zoom + tiny handheld sway",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "romance-sunset-walk",
    title: "Sunset Walk Confession",
    category: "romance",
    useCase: "Short romantic social post",
    prompt:
      "anime sunset riverside walk, two characters side by side, golden-hour light, breeze moving clothes, reflective water highlights, soft emotional composition",
    negativePrompt:
      "frozen characters, face mismatch, low detail, abrupt cuts, background flicker",
    camera: "side tracking shot with smooth stabilization",
    duration: "8s",
    aspectRatio: "9:16",
  },
  {
    id: "ad-cosmetic-product",
    title: "Anime Cosmetic Product Ad",
    category: "ad",
    useCase: "Beauty or lifestyle ad creative",
    prompt:
      "anime-style premium cosmetic bottle on glossy platform, sparkling particles, luxury lighting, elegant gradient background, clean composition for ad, product-focused motion",
    negativePrompt:
      "distorted logo area, unstable object shape, noisy reflections, messy background, text artifacts",
    camera: "macro orbit around product + slow push",
    duration: "5s",
    aspectRatio: "9:16",
  },
  {
    id: "ad-gaming-banner",
    title: "Gaming Banner Motion Ad",
    category: "ad",
    useCase: "Mobile game ad motion visual",
    prompt:
      "anime hero key visual, energy aura burst, bold color contrast, clean background separation for copy placement, ad-ready cinematic framing",
    negativePrompt:
      "cluttered frame, oversharpening, deformed face, unstable aura edges, noisy artifacts",
    camera: "punch-in + parallax background drift",
    duration: "5s",
    aspectRatio: "9:16",
  },
  {
    id: "loop-magic-circle",
    title: "Magic Circle Seamless Loop",
    category: "loop",
    useCase: "Background loop for stream/shorts",
    prompt:
      "anime magic circle rotating softly, floating particles, dark fantasy ambience, smooth cyclical motion, stable geometry, seamless loop-ready animation",
    negativePrompt:
      "jump cut, loop mismatch, geometry warping, flicker, aliasing artifacts",
    camera: "static frame + subtle breathing zoom",
    duration: "5s",
    aspectRatio: "1:1",
  },
  {
    id: "loop-rain-neon",
    title: "Neon Rain Street Loop",
    category: "loop",
    useCase: "Ambient background loop",
    prompt:
      "anime neon alley in rain at night, reflective wet ground, drifting steam, moody cyberpunk ambience, stable scene continuity, seamless atmosphere loop",
    negativePrompt:
      "frame flicker, random pedestrians popping in, inconsistent reflections, blur smear",
    camera: "locked camera with minimal horizontal drift",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "opening-idol-stage",
    title: "Idol Stage Performance Intro",
    category: "opening",
    useCase: "Music opening / social teaser",
    prompt:
      "anime idol on stage, colorful spotlights, confetti, crowd glow sticks, energetic expression, vibrant high-detail style, smooth choreography-friendly framing",
    negativePrompt:
      "limb distortion, audience flicker, overexposed lights, pixel noise, inconsistent costume",
    camera: "arc shot around performer + gentle zoom",
    duration: "8s",
    aspectRatio: "16:9",
  },
  {
    id: "action-chase-bike",
    title: "Cyber Bike Chase Clip",
    category: "action",
    useCase: "Fast-paced short video hook",
    prompt:
      "anime cyber bike chase through neon tunnel, speed lines, sparks, dramatic perspective, high-energy motion, coherent subject identity",
    negativePrompt:
      "subject swaps, shaky frames, extreme blur, color banding, broken wheel geometry",
    camera: "rear follow cam + quick side cut feel",
    duration: "5s",
    aspectRatio: "9:16",
  },
];

export const SEEDANCE_CATEGORY_LABELS: Record<
  SeedancePromptTemplate["category"],
  string
> = {
  opening: "Opening",
  action: "Action",
  romance: "Romance",
  ad: "Ad",
  loop: "Loop",
};
