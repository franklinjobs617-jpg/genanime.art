import { GeneratedName, GenerationSettings, NameEntry } from './types';
import {
    NAME_DATABASE,
    getSurnames,
    getGivenNames,
    getAllGivenNames,
    getStyleModifier,
    filterNamesByTags,
    getWeightedRandom
} from './nameDatabase';

// Generate a single anime name based on settings
export function generateAnimeName(settings: GenerationSettings): GeneratedName {
    const { gender, style } = settings;

    // Get style modifier
    const styleModifier = getStyleModifier(style);

    // Select surname
    let surnames = getSurnames();
    if (styleModifier && style !== 'mixed') {
        surnames = filterNamesByTags(
            surnames,
            styleModifier.preferredTags,
            styleModifier.excludedTags
        );

        // Apply frequency boost
        surnames = surnames.map(surname => ({
            ...surname,
            frequency: Math.min(10, surname.frequency + styleModifier.frequencyBoost)
        }));
    }

    // Fallback if no surnames match the criteria
    if (surnames.length === 0) {
        surnames = getSurnames();
    }

    const selectedSurname = getWeightedRandom(surnames);

    // Select given name based on gender
    let givenNames: NameEntry[];
    let actualGender: 'male' | 'female' | 'unisex';

    if (gender === 'random') {
        // Randomly select gender
        const genders: ('male' | 'female' | 'unisex')[] = ['male', 'female', 'unisex'];
        actualGender = genders[Math.floor(Math.random() * genders.length)];
        givenNames = getGivenNames(actualGender);
    } else {
        actualGender = gender;
        givenNames = getGivenNames(gender);
    }

    // Apply style filtering to given names
    if (styleModifier && style !== 'mixed') {
        givenNames = filterNamesByTags(
            givenNames,
            styleModifier.preferredTags,
            styleModifier.excludedTags
        );

        // Apply frequency boost
        givenNames = givenNames.map(name => ({
            ...name,
            frequency: Math.min(10, name.frequency + styleModifier.frequencyBoost)
        }));
    }

    // Fallback if no names match the criteria
    if (givenNames.length === 0) {
        givenNames = getGivenNames(actualGender);
    }

    const selectedGivenName = getWeightedRandom(givenNames);

    // Generate cultural context
    const culturalContext = generateCulturalContext(selectedSurname, selectedGivenName, style);

    return {
        id: `name-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        surname: selectedSurname.kanji,
        givenName: selectedGivenName.kanji,
        fullName: `${selectedSurname.kanji}${selectedGivenName.kanji}`,
        surnameReading: selectedSurname.reading,
        givenNameReading: selectedGivenName.reading,
        surnameMeaning: selectedSurname.meaning,
        givenNameMeaning: selectedGivenName.meaning,
        culturalContext,
        gender: actualGender,
        style,
        timestamp: Date.now()
    };
}// Generate multiple anime names with duplicate prevention
export function generateAnimeNames(settings: GenerationSettings): GeneratedName[] {
    const names: GeneratedName[] = [];
    const usedCombinations = new Set<string>();
    const maxAttempts = settings.quantity * 10; // Prevent infinite loops
    let attempts = 0;

    while (names.length < settings.quantity && attempts < maxAttempts) {
        attempts++;
        const name = generateAnimeName(settings);
        const combination = `${name.surname}-${name.givenName}`;

        // Ensure uniqueness within the batch
        if (!usedCombinations.has(combination)) {
            usedCombinations.add(combination);
            names.push(name);
        }
    }

    // If we couldn't generate enough unique names, fill with variations
    while (names.length < settings.quantity) {
        const name = generateAnimeName(settings);
        // Add timestamp to make it unique
        name.id = `name-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        names.push(name);
    }

    return names;
}

// Generate cultural context based on name combination and style
function generateCulturalContext(surname: NameEntry, givenName: NameEntry, style: string): string {
    const contexts: { [key: string]: string[] } = {
        traditional: [
            "A classic Japanese name combination reflecting traditional values and family heritage.",
            "This name follows ancient Japanese naming conventions, often used in historical periods.",
            "A traditional pairing that emphasizes virtue and family honor in Japanese culture.",
            "This combination represents the timeless beauty of classical Japanese naming traditions."
        ],
        modern: [
            "A contemporary Japanese name that reflects modern sensibilities and aspirations.",
            "This name combination is popular among younger generations in modern Japan.",
            "A fresh take on Japanese naming that balances tradition with contemporary appeal.",
            "This modern pairing reflects current trends in Japanese naming practices."
        ],
        fantasy: [
            "A mystical name combination often found in anime and manga with supernatural themes.",
            "This pairing evokes magical elements and otherworldly powers in fantasy settings.",
            "A name that would suit a character with special abilities or mystical origins.",
            "This combination suggests a connection to elemental forces or divine powers."
        ],
        "sci-fi": [
            "A futuristic name combination suitable for cyberpunk or sci-fi anime settings.",
            "This pairing reflects technological advancement and futuristic themes.",
            "A name that would fit characters in space operas or dystopian futures.",
            "This combination suggests innovation and technological prowess."
        ]
    };

    const styleContexts = contexts[style] || contexts.traditional;
    return styleContexts[Math.floor(Math.random() * styleContexts.length)];
}
export function validateGenerationSettings(settings: GenerationSettings): boolean {
    if (settings.quantity < 1 || settings.quantity > 20) {
        return false;
    }

    const validGenders = ['male', 'female', 'unisex', 'random'];
    if (!validGenders.includes(settings.gender)) {
        return false;
    }

    const validStyles = ['traditional', 'modern', 'fantasy', 'sci-fi', 'mixed'];
    if (!validStyles.includes(settings.style)) {
        return false;
    }

    return true;
}

// Get name statistics for debugging/analytics
export function getNameStatistics() {
    return {
        totalSurnames: NAME_DATABASE.surnames.length,
        totalMaleNames: NAME_DATABASE.givenNames.male.length,
        totalFemaleNames: NAME_DATABASE.givenNames.female.length,
        totalUnisexNames: NAME_DATABASE.givenNames.unisex.length,
        totalCombinations: NAME_DATABASE.surnames.length * (
            NAME_DATABASE.givenNames.male.length +
            NAME_DATABASE.givenNames.female.length +
            NAME_DATABASE.givenNames.unisex.length
        ),
        availableStyles: Object.keys(NAME_DATABASE.styleModifiers)
    };
}

// Advanced generation with semantic matching
export function generateSemanticMatch(settings: GenerationSettings, theme?: string): GeneratedName {
    // Theme-based generation for better semantic coherence
    const themeMap: { [key: string]: string[] } = {
        nature: ["nature", "elemental", "pure"],
        power: ["powerful", "strength", "warrior"],
        mystery: ["mysterious", "dark", "mystical"],
        light: ["bright", "divine", "pure"],
        nobility: ["noble", "royal", "honor"]
    };

    if (theme && themeMap[theme]) {
        // Apply theme-based filtering
        let surnames = filterNamesByTags(getSurnames(), themeMap[theme]);
        let givenNames = filterNamesByTags(getAllGivenNames(), themeMap[theme]);

        if (surnames.length > 0 && givenNames.length > 0) {
            const surname = getWeightedRandom(surnames);
            const givenName = getWeightedRandom(givenNames);

            return {
                id: `name-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
                surname: surname.kanji,
                givenName: givenName.kanji,
                fullName: `${surname.kanji}${givenName.kanji}`,
                surnameReading: surname.reading,
                givenNameReading: givenName.reading,
                surnameMeaning: surname.meaning,
                givenNameMeaning: givenName.meaning,
                culturalContext: `A thematically coherent name emphasizing ${theme} elements.`,
                gender: settings.gender === 'random' ?
                    (['male', 'female', 'unisex'] as const)[Math.floor(Math.random() * 3)] :
                    settings.gender,
                style: settings.style,
                timestamp: Date.now()
            };
        }
    }

    // Fallback to regular generation
    return generateAnimeName(settings);
}

// Generate names with meaning coherence
export function generateCoherentNames(settings: GenerationSettings): GeneratedName[] {
    const names: GeneratedName[] = [];
    const themes = ['nature', 'power', 'mystery', 'light', 'nobility'];

    for (let i = 0; i < settings.quantity; i++) {
        if (i < themes.length && Math.random() > 0.5) {
            // Use thematic generation for variety
            names.push(generateSemanticMatch(settings, themes[i]));
        } else {
            // Use regular generation
            names.push(generateAnimeName(settings));
        }
    }

    return names;
}

// Generate names with enhanced duplicate prevention
export function generateUniqueNames(settings: GenerationSettings): GeneratedName[] {
    const names: GeneratedName[] = [];
    const usedCombinations = new Set<string>();
    const usedReadings = new Set<string>();
    const maxAttempts = settings.quantity * 20;
    let attempts = 0;

    while (names.length < settings.quantity && attempts < maxAttempts) {
        attempts++;
        const name = generateAnimeName(settings);
        const combination = `${name.surname}-${name.givenName}`;
        const reading = `${name.surnameReading}-${name.givenNameReading}`;

        // Ensure uniqueness in both kanji and reading
        if (!usedCombinations.has(combination) && !usedReadings.has(reading)) {
            usedCombinations.add(combination);
            usedReadings.add(reading);
            names.push(name);
        }
    }

    // Fill remaining slots if needed
    while (names.length < settings.quantity) {
        const name = generateAnimeName(settings);
        name.id = `name-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        names.push(name);
    }

    return names;
}

// Generate names with balanced style distribution
export function generateBalancedNames(settings: GenerationSettings): GeneratedName[] {
    if (settings.style !== 'mixed') {
        return generateAnimeNames(settings);
    }

    const styles = ['traditional', 'modern', 'fantasy', 'sci-fi'];
    const names: GeneratedName[] = [];
    const namesPerStyle = Math.floor(settings.quantity / styles.length);
    const remainder = settings.quantity % styles.length;

    // Generate names for each style
    for (let i = 0; i < styles.length; i++) {
        const styleSettings = { ...settings, style: styles[i] };
        const count = namesPerStyle + (i < remainder ? 1 : 0);
        
        for (let j = 0; j < count; j++) {
            names.push(generateAnimeName(styleSettings));
        }
    }

    // Shuffle the results for variety
    return shuffleArray(names);
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Export default generation function
export default generateAnimeNames;