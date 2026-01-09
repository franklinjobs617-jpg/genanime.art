"use client";

import { useState } from "react";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, contact }),
            });

            if (res.ok) {
                toast.success("Feedback sent! Thank you.");
                setMessage("");
                setContact("");
                setIsOpen(false);
            } else {
                toast.error("Failed to send feedback. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5 fade-in zoom-in-95 origin-bottom-right">

                    {/* Header */}
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 text-sm">Send Feedback</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md p-1 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
                        <textarea
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none resize-none h-28 transition-all"
                            placeholder="Report a bug or suggest a feature..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            autoFocus
                        />

                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition-all"
                            placeholder="Email (optional, for reply)"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full bg-slate-900 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-slate-200"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    Send <Send size={14} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
            group flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300
            ${isOpen ? "bg-slate-200 rotate-90" : "bg-slate-900 hover:scale-110 hover:shadow-blue-200/50"}
        `}
            >
                {isOpen ? (
                    <X size={24} className="text-slate-500" />
                ) : (
                    <MessageSquarePlus size={24} className="text-white" />
                )}
            </button>
        </div>
    );
}