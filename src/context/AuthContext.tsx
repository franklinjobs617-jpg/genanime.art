"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

// 用户数据类型
interface User {
    name: string;
    picture: string;
    credits: number;
    googleUserId: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = "https://api.ytvidhub.com";
const GOOGLE_CLIENT_ID =
    "943760400801-n0e8jdoqrm375sq6gk39pj8oampe6ci9.apps.googleusercontent.com";
const BACKEND_REDIRECT_URI = "https://api.ytvidhub.com/prod-api/g/callback";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        const userStr = localStorage.getItem("loggedInUser");

        if (token && userStr) {
            try {
                setUser(JSON.parse(userStr));
                refreshUser();
            } catch (e) {
                console.error("User parse error", e);
                logout();
            }
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 刷新用户信息 (获取最新积分)
    const refreshUser = async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        try {
            const response = await fetch(`${BASE_URL}/prod-api/g/getUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    setUser(data.data);
                    localStorage.setItem("loggedInUser", JSON.stringify(data.data));
                }
            }
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    // 处理 Google 登录弹窗逻辑
    const login = () => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: BACKEND_REDIRECT_URI,
            response_type: "code",
            scope: "openid email profile",
            prompt: "select_account",
            state: `${new Date().toDateString()}_youtube`,
        });

        const width = 600;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            `${googleAuthUrl}?${params.toString()}`,
            "GoogleLogin",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        // 监听来自弹窗的消息
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== BASE_URL) return;

            if (event.data && typeof event.data.token === "string") {
                try {
                    const parsedData = JSON.parse(event.data.token);
                    const { user: newUser, token: jwtToken } = parsedData;

                    if (newUser && jwtToken) {
                        localStorage.setItem("auth_token", jwtToken);
                        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
                        setUser(newUser);

                        window.removeEventListener("message", handleMessage);
                    }
                } catch (error) {
                    console.error("Login parsing error:", error);
                }
            }
        };

        window.addEventListener("message", handleMessage);
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("auth_token");
        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
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
