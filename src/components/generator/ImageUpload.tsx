
"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
    image: File | null;
    setImage: (file: File | null) => void;
    previewUrl: string | null;
    setPreviewUrl: (url: string | null) => void;
}

export default function ImageUpload({
    image,
    setImage,
    previewUrl,
    setPreviewUrl,
}: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                processFile(files[0]);
            }
        },
        []
    );

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    }, []);

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImage(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            <AnimatePresence mode="wait">
                {!previewUrl ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => inputRef.current?.click()}
                        className={`
              relative group cursor-pointer
              h-24 w-full rounded-xl border-2 border-dashed transition-all duration-300
              flex flex-col items-center justify-center gap-2
              ${isDragOver
                                ? "border-indigo-500 bg-indigo-500/10"
                                : "border-white/10 hover:border-white/20 hover:bg-white/5"
                            }
            `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Upload className={`w-5 h-5 ${isDragOver ? 'text-indigo-400' : 'text-zinc-400'}`} />
                        </div>
                        <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            Drop image or click
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative h-24 w-full rounded-xl overflow-hidden border border-white/10 group bg-black/40"
                    >
                        <img
                            src={previewUrl}
                            alt="Reference"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                        <div className="absolute top-1 right-1 flex gap-1">
                            <button
                                onClick={removeImage}
                                className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-all backdrop-blur-sm"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center gap-1.5">
                                <div className="p-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
                                    <ImageIcon className="w-3 h-3 text-indigo-400" />
                                </div>
                                <span className="text-[10px] font-medium text-white/90">Reference</span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
