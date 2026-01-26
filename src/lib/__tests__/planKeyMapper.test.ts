// Unit tests for PlanKeyMapper

import { PlanKeyMapper } from '../planKeyMapper';

describe('PlanKeyMapper', () => {
  describe('mapPlanKey', () => {
    it('should map Stripe plan keys correctly', () => {
      expect(PlanKeyMapper.mapPlanKey('initiate', 'stripe', 'monthly')).toBe('plan_initiate_monthly');
      expect(PlanKeyMapper.mapPlanKey('elite', 'stripe', 'yearly')).toBe('plan_elite_yearly');
      expect(PlanKeyMapper.mapPlanKey('zenith', 'stripe', 'monthly')).toBe('plan_zenith_monthly');
    });

    it('should map PayPal plan keys correctly', () => {
      expect(PlanKeyMapper.mapPlanKey('initiate', 'paypal', 'monthly')).toBe('gen_starter_monthly');
      expect(PlanKeyMapper.mapPlanKey('elite', 'paypal', 'yearly')).toBe('gen_pro_yearly');
      expect(PlanKeyMapper.mapPlanKey('zenith', 'paypal', 'monthly')).toBe('gen_studio_monthly');
    });

    it('should throw error for invalid plan key', () => {
      expect(() => PlanKeyMapper.mapPlanKey('invalid', 'stripe', 'monthly')).toThrow('Invalid plan key: invalid');
    });

    it('should throw error for invalid provider', () => {
      expect(() => PlanKeyMapper.mapPlanKey('initiate', 'invalid' as any, 'monthly')).toThrow('Unsupported payment provider: invalid');
    });
  });

  describe('isValidPlanKey', () => {
    it('should validate plan keys correctly', () => {
      expect(PlanKeyMapper.isValidPlanKey('initiate')).toBe(true);
      expect(PlanKeyMapper.isValidPlanKey('elite')).toBe(true);
      expect(PlanKeyMapper.isValidPlanKey('zenith')).toBe(true);
      expect(PlanKeyMapper.isValidPlanKey('invalid')).toBe(false);
    });
  });

  describe('getSupportedPlanKeys', () => {
    it('should return all supported plan keys', () => {
      const keys = PlanKeyMapper.getSupportedPlanKeys();
      expect(keys).toEqual(['initiate', 'elite', 'zenith']);
    });
  });
});