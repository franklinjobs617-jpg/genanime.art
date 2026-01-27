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

    console.log('PayPal Payment Request:', {
      planKey,
      originalPlanKey: plan.key,
      cycle,
      userId: user.googleUserId
    });

    const requestBody: PayPalPaymentRequest = {
      type: planKey,
      googleUserId: user.googleUserId
    };

    console.log('Sending request to:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/createOrder`);
    console.log('Request body:', JSON.stringify(requestBody));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/createOrder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // 先获取响应文本，然后尝试解析 JSON
      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      let resData: PaymentResponse;
      try {
        resData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      console.log('Parsed PayPal API Response:', {
        code: resData.code,
        msg: resData.msg,
        id: resData.id,
        status: resData.status,
        links: resData.links,
        fullResponse: resData
      });

      if (resData.code === 200) {
        let redirectUrl: string | undefined;

        // 方法1：从 links 数组中找到支付链接（推荐）
        if (resData.links && Array.isArray(resData.links)) {
          const approvalLink = resData.links.find(link =>
            link.rel === 'payer-action' ||
            link.rel === 'approve' ||
            link.href.includes('paypal.com/checkoutnow')
          );
          if (approvalLink) {
            redirectUrl = approvalLink.href;
          }
        }

        // 方法2：如果 links 中没找到，尝试从 msg 字段获取
        if (!redirectUrl && resData.msg) {
          redirectUrl = resData.msg;
        }

        console.log('Final PayPal Redirect URL:', redirectUrl);

        if (redirectUrl) {
          // 检查返回的 URL 是否是有效的 PayPal URL
          if (!redirectUrl.includes('paypal.com')) {
            console.warn('Warning: PayPal redirect URL does not appear to be a PayPal URL:', redirectUrl);
          }

          return {
            success: true,
            redirectUrl: redirectUrl
          };
        } else {
          throw new Error('No PayPal approval URL found in response');
        }
      } else {
        throw new Error(resData.msg || 'PayPal payment initialization failed');
      }
    } catch (error) {
      console.error('PayPal payment request failed:', error);
      throw error;
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