"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CreditCard, 
  Loader2,
  Check,
  Zap,
  Shield,
  Sparkles
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
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg mx-auto"
          >
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 blur-3xl rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl" />
            
            {/* Main Modal */}
            <div className="relative bg-white/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/30 to-purple-50/50 pointer-events-none" />
              
              {/* Header */}
              <div className="relative p-8 pb-6 border-b border-gray-200/50">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="absolute top-6 right-6 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
                    <p className="text-sm text-gray-600 mt-1">Choose your preferred payment method</p>
                  </div>
                </div>
              </div>

              {/* Plan Summary */}
              <div className="relative p-8 py-6 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">{selectedPlan?.name} Plan</h3>
                    <p className="text-sm text-gray-600 capitalize font-medium">{billingCycle} billing</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">${price}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>

                {isYearly && savings > 0 && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-100/80 border border-emerald-200/50 rounded-xl mb-4">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700 font-medium">
                      Save ${savings}/month with yearly billing
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 px-4 py-3 bg-white/60 rounded-xl border border-gray-200/50">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    {selectedPlan?.credits} credits monthly (~{Math.floor((selectedPlan?.credits || 0) / 2)} images)
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="relative p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h4>
                
                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleMethodSelect(method)}
                      disabled={isLoading}
                      className={`
                        w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left group relative overflow-hidden
                        ${selectedMethod?.id === method.id
                          ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg shadow-indigo-500/10'
                          : 'border-gray-200 bg-white/60 hover:border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 hover:shadow-md'
                        }
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                      `}
                    >
                      {/* Loading overlay for selected method */}
                      {isLoading && selectedMethod?.id === method.id && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-medium">Processing...</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`
                          p-4 rounded-xl transition-all duration-200
                          ${selectedMethod?.id === method.id
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white'
                          }
                        `}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`
                            font-semibold transition-colors text-lg
                            ${selectedMethod?.id === method.id ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'}
                          `}>
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {method.description}
                          </div>
                        </div>
                        <div className={`
                          w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                          ${selectedMethod?.id === method.id
                            ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/25'
                            : 'border-gray-300 group-hover:border-indigo-400'
                          }
                        `}>
                          {selectedMethod?.id === method.id && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <Shield className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700 font-medium">
                    Secure 256-bit SSL encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}