"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Home, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function StripeCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");

    const [status, setStatus] = useState<"verifying" | "success" | "error" | "timeout">("verifying");
    const [errorMsg, setErrorMsg] = useState("");

    const checkCountRef = useRef(0);
    const maxChecks = 15;

    useEffect(() => {
        if (!sessionId) {
            router.push("/");
            return;
        }

        const checkOrderStatus = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/check-order-status?sessionId=${sessionId}`);
                const result = await res.json();

                if (result.data === 'paid') {
                    setStatus("success");
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.error("Verification error:", err);
                return false;
            }
        };

        const timer = setInterval(async () => {
            checkCountRef.current += 1;
            const isDone = await checkOrderStatus();

            if (isDone) {
                clearInterval(timer);
            } else if (checkCountRef.current >= maxChecks) {
                clearInterval(timer);
                setStatus("timeout");
            }
        }, 2000); // 每 2 秒查一次

        return () => clearInterval(timer);
    }, [sessionId, router]);

    return (
        <div className="min-h-screen bg-[#020204] text-white flex items-center justify-center font-sans p-4">
            <div className="max-w-md w-full p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 text-center backdrop-blur-2xl">

                {/* 校验中状态 */}
                {status === "verifying" && (
                    <>
                        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mx-auto mb-6" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Verifying Order</h1>
                        <p className="text-zinc-500">We&apos;re finalizing your high-speed credits. Don&apos;t close this page.</p>
                        <p className="text-zinc-700 text-xs mt-4">Attempt {checkCountRef.current} of {maxChecks}...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Payment Success!</h1>
                        <p className="text-zinc-500 mb-10">Your Zenith Vision has been activated. The credits have been added to your account.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all w-full justify-center">
                            <Home className="w-4 h-4" /> Back to Workspace
                        </Link>
                    </>
                )}

                {status === "timeout" && (
                    <>
                        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Still Processing</h1>
                        <p className="text-zinc-500 mb-10">Your payment is confirmed, but it&apos;s taking a moment to update your credits. Please check back in a minute.</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all w-full justify-center">
                            <Home className="w-4 h-4" /> Go to Dashboard
                        </Link>
                    </>
                )}

                {/* 错误状态 */}
                {status === "error" && (
                    <>
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">Verification Failed</h1>
                        <p className="text-zinc-500 mb-10">{errorMsg || "We couldn't verify your payment. If you were charged, please contact support."}</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all w-full justify-center">
                            Return Home
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}