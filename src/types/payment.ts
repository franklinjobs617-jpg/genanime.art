// Payment-related type definitions

export interface PaymentMethod {
  id: 'stripe' | 'paypal';
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface PaymentResult {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

export interface PaymentState {
  selectedPlan: Plan | null;
  isModalOpen: boolean;
  isProcessing: boolean;
  selectedPaymentMethod: PaymentMethod | null;
  error: string | null;
}

export interface Plan {
  name: string;
  key: string;
  price: { monthly: number; yearly: number };
  desc: string;
  credits: number;
  badge?: string;
  isPopular?: boolean;
  features: PlanFeatures[];
  icon: React.ReactNode;
  themeColor: string;
  themeBg: string;
  borderColor: string;
  buttonStyle: string;
}

export interface PlanFeatures {
  text: string;
  highlight?: boolean;
}

// API Request/Response interfaces
export interface StripePaymentRequest {
  type: string;
  googleUserId: string;
}

export interface PayPalPaymentRequest {
  type: string;
  googleUserId: string;
}

export interface PaymentResponse {
  code: number;
  data?: string; // Stripe redirect URL
  msg?: string;  // PayPal redirect URL or error message
}

// Error handling
export interface PaymentError {
  type: 'AUTH_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'PROVIDER_ERROR';
  message: string;
  originalError?: any;
}

export interface UserFriendlyError {
  message: string;
  action: 'LOGIN' | 'RETRY' | 'REFRESH' | 'CONTACT_SUPPORT';
}