// Centralized payment processing logic

import { PlanKeyMapper } from './planKeyMapper';
import type { 
  PaymentMethod, 
  PaymentResult, 
  Plan, 
  PaymentError,
  StripePaymentRequest,
  PayPalPaymentRequest,
  PaymentResponse 
} from '@/types/payment';

interface User {
  googleUserId: string;
}

export class PaymentProcessor {
  /**
   * Processes payment for the selected method and plan
   */
  static async processPayment(
    method: PaymentMethod,
    plan: Plan,
    isYearly: boolean,
    user: User
  ): Promise<PaymentResult> {
    try {
      // Validate inputs
      this.validatePaymentInputs(method, plan, user);

      const cycle = isYearly ? 'yearly' : 'monthly';
      
      if (method.id === 'stripe') {
        return await this.processStripePayment(plan, cycle, user);
      } else if (method.id === 'paypal') {
        return await this.processPayPalPayment(plan, cycle, user);
      } else {
        throw new Error(`Unsupported payment method: ${method.id}`);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Processes Stripe payment
   */
  private static async processStripePayment(
    plan: Plan,
    cycle: string,
    user: User
  ): Promise<PaymentResult> {
    const planKey = PlanKeyMapper.mapPlanKey(plan.key, 'stripe', cycle as 'monthly' | 'yearly');
    
    const requestBody: StripePaymentRequest = {
      type: planKey,
      googleUserId: user.googleUserId
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/getPayUrl`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    const resData: PaymentResponse = await response.json();

    if (resData.code === 200 && resData.data) {
      return {
        success: true,
        redirectUrl: resData.data
      };
    } else {
      throw new Error(resData.msg || 'Stripe payment initialization failed');
    }
  }

  /**
   * Processes PayPal payment
   */
  private static async processPayPalPayment(
    plan: Plan,
    cycle: string,
    user: User
  ): Promise<PaymentResult> {
    const planKey = PlanKeyMapper.mapPlanKey(plan.key, 'paypal', cycle as 'monthly' | 'yearly');
    
    const requestBody: PayPalPaymentRequest = {
      type: planKey,
      googleUserId: user.googleUserId
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/createOrder`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    const resData: PaymentResponse = await response.json();

    if (resData.code === 200 && resData.msg) {
      return {
        success: true,
        redirectUrl: resData.msg
      };
    } else {
      throw new Error(resData.msg || 'PayPal payment initialization failed');
    }
  }

  /**
   * Validates payment inputs
   */
  private static validatePaymentInputs(
    method: PaymentMethod,
    plan: Plan,
    user: User
  ): void {
    if (!user?.googleUserId) {
      const error: PaymentError = {
        type: 'AUTH_ERROR',
        message: 'User session expired. Please re-login.'
      };
      throw error;
    }

    if (!PlanKeyMapper.isValidPlanKey(plan.key)) {
      const error: PaymentError = {
        type: 'VALIDATION_ERROR',
        message: `Invalid plan key: ${plan.key}`
      };
      throw error;
    }

    if (!['stripe', 'paypal'].includes(method.id)) {
      const error: PaymentError = {
        type: 'VALIDATION_ERROR',
        message: `Invalid payment method: ${method.id}`
      };
      throw error;
    }
  }

  /**
   * Converts errors to user-friendly messages
   */
  private static getErrorMessage(error: any): string {
    if (error?.type === 'AUTH_ERROR') {
      return 'Please sign in to continue with your purchase.';
    }
    
    if (error?.type === 'VALIDATION_ERROR') {
      return 'Invalid plan selection. Please refresh and try again.';
    }

    if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      return 'Connection failed. Please check your internet and try again.';
    }

    return error?.message || 'Payment initialization failed. Please try again.';
  }
}