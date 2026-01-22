"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, Info, Image as ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadSectionProps {
  image: File | null;
  setImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  strength: number;
  setStrength: (val: number) => void;
  isAvatar?: boolean;
}

export default function ImageUploadSection({
  image,
  setImage,
  imagePreview,
  setImagePreview,
  strength,
  setStrength,
  isAvatar = false,
}: ImageUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      // Could add toast here
      return;
    }
    setImage(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
      <AnimatePresence mode="wait">
        {!imagePreview ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative w-full min-h-[64px] flex items-center justify-between gap-4
              rounded-lg border border-zinc-800 transition-all cursor-pointer px-4 py-3
              ${
                isDragging
                  ? "border-zinc-500 bg-zinc-800/50"
                  : isAvatar
                  ? "bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700"
                  : "bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700"
              }
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-zinc-800 bg-zinc-900 text-zinc-400`}
              >
                <Upload className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-zinc-300 truncate">
                  {isAvatar ? "Upload face" : "Upload reference"}
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <div
                className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-[10px] font-medium transition-colors ring-1 ring-inset ${
                  isDragging
                    ? "bg-zinc-800 text-zinc-200 ring-zinc-700"
                    : "bg-transparent text-zinc-500 ring-zinc-800 hover:text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                Select
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview-zone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-2 bg-zinc-900/30 border border-zinc-800 rounded-lg flex items-center gap-3"
          >
            {/* Thumbnail */}
            <div className="relative group shrink-0">
              <div className="w-12 h-12 rounded-md overflow-hidden border border-zinc-800 bg-black/50">
                <img
                  src={imagePreview}
                  alt="Reference"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute -top-1.5 -right-1.5 p-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Influence
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums">
                  {strength.toFixed(2)}
                </span>
              </div>

              <div className="relative w-full h-4 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={strength}
                  onChange={(e) => setStrength(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-zinc-500 hover:accent-zinc-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
