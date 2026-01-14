"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Home } from "lucide-react";
import Link from "next/link";

export default function StripeCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            router.push("/");
            return;
        }
        const timer = setTimeout(() => setVerifying(false), 2000);
        return () => clearTimeout(timer);
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-[#020204] text-white flex items-center justify-center font-sans">
            <div className="max-w-md w-full p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 text-center backdrop-blur-2xl">
                {verifying ? (
                    <>
                        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mx-auto mb-6" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Verifying Order</h1>
                        <p className="text-zinc-500">We're finalizing your high-speed credits. Don't close this page.</p>
                    </>
                ) : (
                    <>
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Payment Success!</h1>
                        <p className="text-zinc-500 mb-10">Your Zenith Vision has been activated. The credits have been added to your account.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all">
                            <Home className="w-4 h-4" /> Back to Workspace
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}