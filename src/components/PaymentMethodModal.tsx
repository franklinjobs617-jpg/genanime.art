"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CreditCard, 
  ArrowRight, 
  Loader2,
  Check,
  Zap
} from "lucide-react";
import type { PaymentMethod, Plan } from "@/types/payment";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan;
  isYearly: boolean;
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  isLoading: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Credit Card',
    description: 'Pay with Visa, Mastercard, or American Express',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account or linked cards',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.641.641 0 0 0 .633.74h3.94a.563.563 0 0 0 .556-.479l.035-.22.671-4.25.043-.28a.563.563 0 0 1 .556-.479h.35c3.73 0 6.65-1.514 7.499-5.895.354-1.83.172-3.357-.785-4.539z"/>
      </svg>
    )
  }
];

export default function PaymentMethodModal({
  isOpen,
  onClose,
  selectedPlan,
  isYearly,
  onPaymentMethodSelect,
  isLoading
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    if (isLoading) return; // 防止在加载时重复点击
    setSelectedMethod(method);
    // 直接触发支付流程，不需要额外的Continue按钮
    onPaymentMethodSelect(method);
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedMethod(null);
      onClose();
    }
  };

  const price = isYearly ? selectedPlan?.price.yearly : selectedPlan?.price.monthly;
  const billingCycle = isYearly ? 'yearly' : 'monthly';
  const savings = isYearly ? selectedPlan?.price.monthly - selectedPlan?.price.yearly : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Gradient overlay for extra visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/20 bg-white/5">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                <X className="w-4 h-4 text-zinc-300 hover:text-white transition-colors" />
              </button>

              <h2 className="text-xl font-bold text-white mb-2">Choose Payment Method</h2>
              <p className="text-sm text-zinc-300">Select how you'd like to pay for your plan</p>
            </div>

            {/* Plan Summary */}
            <div className="relative p-6 pb-4 bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedPlan?.name} Plan</h3>
                  <p className="text-xs text-zinc-300 capitalize font-medium">{billingCycle} billing</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">${price}</div>
                  <div className="text-xs text-zinc-300">per month</div>
                </div>
              </div>

              {isYearly && savings > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg backdrop-blur-sm">
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span className="text-xs text-emerald-200 font-medium">
                    Save ${savings}/month with yearly billing
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm text-zinc-200 font-medium">
                  {selectedPlan?.credits} credits monthly (~{Math.floor((selectedPlan?.credits || 0) / 2)} images)
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="relative p-6">
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleMethodSelect(method)}
                    disabled={isLoading}
                    className={`
                      w-full p-4 rounded-xl border transition-all text-left group relative overflow-hidden
                      ${selectedMethod?.id === method.id
                        ? 'border-indigo-400/50 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 shadow-lg shadow-indigo-500/20'
                        : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15 hover:shadow-lg'
                      }
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                    `}
                  >
                    {/* Loading overlay for selected method */}
                    {isLoading && selectedMethod?.id === method.id && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm font-medium">Processing...</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className={`
                        p-3 rounded-lg transition-colors backdrop-blur-sm
                        ${selectedMethod?.id === method.id
                          ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/30'
                          : 'bg-white/15 text-zinc-300 group-hover:text-white group-hover:bg-white/20 border border-white/20'
                        }
                      `}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`
                          font-semibold transition-colors text-base
                          ${selectedMethod?.id === method.id ? 'text-white' : 'text-zinc-200 group-hover:text-white'}
                        `}>
                          {method.name}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          {method.description}
                        </div>
                      </div>
                      <div className={`
                        w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center
                        ${selectedMethod?.id === method.id
                          ? 'border-indigo-400 bg-indigo-500 shadow-lg shadow-indigo-500/30'
                          : 'border-zinc-500 group-hover:border-zinc-400'
                        }
                      `}>
                        {selectedMethod?.id === method.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-zinc-400 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                  🔒 Click to pay securely with your preferred method
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}