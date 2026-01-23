"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Coins, Calendar, Sparkles, Crown, Star, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { trackDailyReward } from "@/lib/analytics";

interface DailyRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAILY_REWARDS = [
  { day: 1, credits: 2, title: "Welcome Back!", desc: "Start your creative journey", icon: Gift },
  { day: 2, credits: 3, title: "Keep Going!", desc: "Consistency pays off", icon: Zap },
  { day: 3, credits: 4, title: "On Fire!", desc: "You're building a habit", icon: Star },
  { day: 4, credits: 5, title: "Amazing!", desc: "Almost there...", icon: Sparkles },
  { day: 5, credits: 8, title: "Streak Master!", desc: "Big bonus for dedication", icon: Crown },
  { day: 6, credits: 6, title: "Weekend Warrior!", desc: "Keep the momentum", icon: Gift },
  { day: 7, credits: 10, title: "Weekly Champion!", desc: "Ultimate reward!", icon: Crown },
];

export default function DailyRewardModal({ isOpen, onClose }: DailyRewardModalProps) {
  const { user, refreshUser } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(1);
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // 添加键盘ESC关闭功能
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && user) {
      // Calculate consecutive check-in days
      const lastVisit = localStorage.getItem(`lastVisit_${user.googleUserId}`);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastVisit === yesterday) {
        // Consecutive check-in
        const streak = parseInt(localStorage.getItem(`streak_${user.googleUserId}`) || "1");
        setCurrentStreak(Math.min(streak + 1, 7));
      } else if (lastVisit !== today) {
        // New check-in cycle
        setCurrentStreak(1);
      }
    }
  }, [isOpen, user]);

  const handleClaimReward = async () => {
    if (!user || isClaimingReward) return;

    setIsClaimingReward(true);
    const reward = DAILY_REWARDS[currentStreak - 1];

    try {
      const response = await fetch('/api/claim-daily-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleUserId: user.googleUserId,
          credits: reward.credits,
          streak: currentStreak
        })
      });

      if (response.ok) {
        // Update local storage
        const today = new Date().toDateString();
        localStorage.setItem(`lastVisit_${user.googleUserId}`, today);
        localStorage.setItem(`lastRewardClaim_${user.googleUserId}`, today);
        localStorage.setItem(`streak_${user.googleUserId}`, currentStreak.toString());

        // Refresh user data
        await refreshUser();

        // Show celebration effect
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        // Record reward claim event
        trackDailyReward.claim(currentStreak, reward.credits, user.googleUserId);

        toast.success(`🎉 Earned ${reward.credits} credits!`);

        // Delay closing modal
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to claim reward, please try again");
      }
    } catch (error) {
      console.error('Claim reward error:', error);
      toast.error("Network error, please try again");
    } finally {
      setIsClaimingReward(false);
    }
  };

  const currentReward = DAILY_REWARDS[currentStreak - 1];
  const RewardIcon = currentReward.icon;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 优化的背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              duration: 0.3,
              stiffness: 300,
              damping: 30
            }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Simplified confetti effect */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none z-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 1,
                      y: -10,
                      x: 150 + Math.random() * 100 - 50,
                      rotate: 0,
                      scale: 1
                    }}
                    animate={{
                      opacity: 0,
                      y: 300,
                      rotate: 180,
                      scale: 0
                    }}
                    transition={{
                      duration: 1.5,
                      delay: Math.random() * 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  />
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simplified header gradient */}
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-center text-white">
              {/* Simplified background decoration */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-white rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
                  className="flex justify-center mb-3"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <RewardIcon className="w-7 h-7 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold mb-2"
                >
                  {currentReward.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/90 text-sm mb-3"
                >
                  {currentReward.desc}
                </motion.p>

                {/* Streak display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Day {currentStreak}</span>
                </motion.div>
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 bg-white">
              {/* Reward display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-5"
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                  <Coins className="w-6 h-6 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      +{currentReward.credits}
                    </div>
                    <div className="text-xs text-gray-600">Credits</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Generate {Math.floor(currentReward.credits / 2)} images
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-5"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
                  <span className="text-sm text-gray-500">{currentStreak}/7</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStreak / 7) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  />
                </div>

                {/* Reward points */}
                <div className="flex justify-between">
                  {DAILY_REWARDS.map((reward, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${index < currentStreak
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : index === currentStreak - 1
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse"
                          : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {reward.credits}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Claim button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onClick={handleClaimReward}
                disabled={isClaimingReward}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isClaimingReward ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Claim Reward
                  </>
                )}
              </motion.button>

              {/* Tomorrow hint */}
              {currentStreak < 7 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-xs text-gray-500 mt-3"
                >
                  Come back tomorrow for {DAILY_REWARDS[currentStreak]?.credits} credits! 🎁
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}