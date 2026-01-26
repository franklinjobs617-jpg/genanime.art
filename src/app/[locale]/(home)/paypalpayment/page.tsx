"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Home, XCircle, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function PayPalCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // If no token, redirect to home
    if (!token) {
      router.push("/");
      return;
    }

    // If we've already checked, don't check again
    if (hasChecked) {
      return;
    }

    // Mark as checked to prevent multiple calls
    setHasChecked(true);

    const capturePayment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/retUrl?token=${token}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();

        if (result.code === 200) {
          // Payment successful
          setStatus("success");
          
          // Wait 2 seconds then redirect to home with success flag
          setTimeout(() => {
            // Force data refresh by adding payment_success parameter
            window.location.href = '/?payment_success=true';
          }, 2000);
        } else {
          // Payment failed
          setStatus("error");
          setErrorMsg(result.msg || "Payment verification failed. Please contact support if you were charged.");
        }
      } catch (error) {
        console.error("PayPal payment capture error:", error);
        setStatus("error");
        setErrorMsg("Network error occurred while verifying payment. Please contact support if you were charged.");
      }
    };

    capturePayment();
  }, [token, router, hasChecked]);

  return (
    <div className="min-h-screen bg-[#020204] text-white flex items-center justify-center font-sans p-4">
      <div className="max-w-md w-full p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 text-center backdrop-blur-2xl shadow-2xl">
        
        {/* Processing State */}
        {status === "processing" && (
          <>
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mx-auto mb-6" />
            <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">
              Processing Payment
            </h1>
            <p className="text-zinc-400 leading-relaxed">
              We're capturing your PayPal payment and activating your credits. Please don't close this page.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <div className="relative mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 mx-auto bg-green-500/20 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase text-green-400">
              Payment Successful!
            </h1>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Your PayPal payment has been processed successfully. Your credits have been added to your account.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8">
              <p className="text-green-300 text-sm">
                🎉 Redirecting you to the dashboard in a moment...
              </p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all w-full justify-center shadow-lg hover:shadow-green-500/25"
            >
              <Home className="w-4 h-4" /> 
              Go to Dashboard
            </Link>
          </>
        )}

        {/* Error State */}
        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase text-red-400">
              Payment Verification Failed
            </h1>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
              <p className="text-red-300 text-sm">
                ⚠️ If you were charged, please contact our support team with your PayPal transaction details.
              </p>
            </div>
            <div className="space-y-3">
              <Link 
                href="/support" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all w-full justify-center shadow-lg hover:shadow-red-500/25"
              >
                <Mail className="w-4 h-4" /> 
                Contact Support
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all w-full justify-center"
              >
                <Home className="w-4 h-4" /> 
                Return Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}