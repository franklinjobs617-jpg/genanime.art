"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

interface AppUser {
    name: string;
    picture: string;
    credits: number;
    googleUserId: string;
    email: string;
}

interface AuthContextType {
    user: AppUser | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: ReactNode }) {
    const { data: session, status, update } = useSession();
    const [user, setUser] = useState<AppUser | null>(null);
    useEffect(() => {
        if (session?.user) {
            const newUser = {
                name: session.user.name || "",
                picture: session.user.image || "",
                credits: session.user.credits || 0,
                googleUserId: session.user.googleUserId || "",
                email: session.user.email || "",
            };
            
            // 只有在用户数据真正变化时才更新状态
            setUser(prevUser => {
                if (!prevUser || 
                    prevUser.name !== newUser.name ||
                    prevUser.picture !== newUser.picture ||
                    prevUser.credits !== newUser.credits ||
                    prevUser.googleUserId !== newUser.googleUserId ||
                    prevUser.email !== newUser.email) {
                    return newUser;
                }
                return prevUser;
            });
        } else {
            setUser(null);
        }
    }, [session?.user?.name, session?.user?.image, session?.user?.credits, session?.user?.googleUserId, session?.user?.email]); // 只依赖具体的用户属性

    const login = () => {
        signIn("google");
    };

    const logout = () => {
        signOut();
    };

    const refreshUser = async () => {
        try {
            // 只有在真正需要更新时才调用update
            if (session?.user) {
                await update(); // 触发服务端刷新，重新执行 jwt/session 回调
            }
        } catch (e) {
            console.error("Session update error:", e);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoading: status === "loading", login, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProviderInner>{children}</AuthProviderInner>
        </SessionProvider>
    );
}

// 导出 Hook 方便组件调用
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
