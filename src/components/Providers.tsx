"use client";

import { AuthProvider } from "@/context/AuthContext";
import { GenerationHistoryProvider } from "@/context/GenerationHistoryContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <GenerationHistoryProvider>
                    {children}
                </GenerationHistoryProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
