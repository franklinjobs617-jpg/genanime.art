// Plan key mapping utility for different payment providers

interface PlanKeyMapping {
  format: (key: string, cycle: string) => string;
  keyMap: Record<string, string>;
}

const PLAN_KEY_MAPPING: Record<'stripe' | 'paypal', PlanKeyMapping> = {
  stripe: {
    format: (key: string, cycle: string) => `plan_${key}_${cycle}`,
    keyMap: {
      initiate: 'initiate',
      elite: 'elite',
      zenith: 'zenith'
    }
  },
  paypal: {
    format: (key: string, cycle: string) => `gen_${key}_${cycle}`,
    keyMap: {
      initiate: 'starter',
      elite: 'pro',
      zenith: 'studio'
    }
  }
};

export class PlanKeyMapper {
  /**
   * Maps a plan key according to the specified payment provider
   * @param originalKey - The original plan key (initiate, elite, zenith)
   * @param provider - The payment provider (stripe or paypal)
   * @param cycle - The billing cycle (monthly or yearly)
   * @returns The formatted plan key for the provider
   */
  static mapPlanKey(
    originalKey: string, 
    provider: 'stripe' | 'paypal', 
    cycle: 'monthly' | 'yearly'
  ): string {
    const mapping = PLAN_KEY_MAPPING[provider];
    
    if (!mapping) {
      throw new Error(`Unsupported payment provider: ${provider}`);
    }

    const mappedKey = mapping.keyMap[originalKey];
    if (!mappedKey) {
      throw new Error(`Invalid plan key: ${originalKey}`);
    }

    return mapping.format(mappedKey, cycle);
  }

  /**
   * Validates if a plan key is supported
   * @param planKey - The plan key to validate
   * @returns True if the plan key is valid
   */
  static isValidPlanKey(planKey: string): boolean {
    return Object.keys(PLAN_KEY_MAPPING.stripe.keyMap).includes(planKey);
  }

  /**
   * Gets all supported plan keys
   * @returns Array of supported plan keys
   */
  static getSupportedPlanKeys(): string[] {
    return Object.keys(PLAN_KEY_MAPPING.stripe.keyMap);
  }
}