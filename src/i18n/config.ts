/**
 * Path-specific locale configuration.
 * Defines which locales are supported for each path.
 */
export const pathLocales: Record<string, string[]> = {
    "/": ["en", "id", "de", "es", "ru"],
    "/generator": ["en", "id", "de", "es", "ru"],
    "/gallery": ["en"],
    "/prompt-library": ["en"],
    "/pricing": ["en"],
    "/blog": ["en"],
    "/blog/how-to-make-anime-art-ai-rtx-8090-guide": ["en"],
    "/how-to-reverse-image-to-prompt-anime-guide": ["en"],
    "/contact": ["en"],
    "/support": ["en"],
    "/terms": ["en"],
    "/privacy": ["en"],
};

export const defaultLocales = ["en", "id", "de", "es", "ru"];
