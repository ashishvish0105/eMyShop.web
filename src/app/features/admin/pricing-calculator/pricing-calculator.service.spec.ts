import { calculatePricing, PricingCalculatorInput } from './pricing-calculator.service';

const input: PricingCalculatorInput = {
  costs: [100, 20, 10],
  marketplaceRate: 0.1,
  paymentRate: 0.03,
  affiliateRate: 0,
  advertisingRate: 0,
  transactionFee: 0,
  platformFee: 0,
  advertisingCost: 0,
  codFee: 0,
  returnsCost: 0,
  reverseShippingCost: 0,
  deliveryFailureCost: 0,
  warrantyCost: 0,
  taxRate: 0.18,
  feeTaxRate: 0,
  taxInclusive: false,
  taxExempt: false,
  discountRate: 0,
  couponRate: 0,
  strategy: 'margin',
  targetMargin: 0.2,
  targetProfit: 0,
  markupRate: 0,
  customPrice: 0,
};

describe('calculatePricing', () => {
  it('calculates break-even, margin, fees, sales tax, and profit on the same pre-tax base', () => {
    const result = calculatePricing(input);

    expect(result.error).toBeNull();
    expect(result.totalCost).toBe(130);
    expect(result.breakEvenPrice).toBe(149.43);
    expect(result.recommendedListPrice).toBe(194.03);
    expect(result.discountedCustomerPrice).toBe(228.96);
    expect(result.netRevenue).toBe(194.03);
    expect(result.taxAmount).toBe(34.93);
    expect(result.fees).toBe(25.22);
    expect(result.profit).toBeCloseTo(38.81, 2);
    expect(result.margin).toBeCloseTo(0.2, 2);
  });

  it('solves the same target for tax-inclusive pricing', () => {
    const result = calculatePricing({ ...input, taxInclusive: true });

    expect(result.recommendedListPrice).toBe(228.96);
    expect(result.netRevenue).toBeCloseTo(194.03, 2);
  });

  it('excludes product tax for an exempt product while keeping fee tax independent', () => {
    const result = calculatePricing({ ...input, taxExempt: true, feeTaxRate: 0.1 });

    expect(result.taxAmount).toBe(0);
    expect(result.discountedCustomerPrice).toBe(result.netRevenue);
    expect(result.feeTax).toBeGreaterThan(0);
  });

  it('applies stacked discounts sequentially and keeps tax out of profit', () => {
    const result = calculatePricing({
      ...input,
      strategy: 'fixed',
      targetProfit: 25,
      discountRate: 0.1,
      couponRate: 0.05,
    });

    expect(result.error).toBeNull();
    expect(result.netRevenue).toBeCloseTo(178.16, 2);
    expect(result.profit).toBeCloseTo(25, 2);
  });

  it('applies fixed profit, markup, break-even, and custom price strategies', () => {
    expect(calculatePricing({ ...input, strategy: 'fixed', targetProfit: 25 }).profit).toBeCloseTo(25, 2);
    expect(calculatePricing({ ...input, strategy: 'markup', markupRate: 0.25 }).profit).toBeCloseTo(32.5, 2);
    expect(calculatePricing({ ...input, strategy: 'breakEven' }).profit).toBeCloseTo(0, 2);
    expect(calculatePricing({ ...input, strategy: 'custom', customPrice: 150 }).profit).toBeCloseTo(0.5, 2);
  });

  it('includes tax on variable platform fees in price and fee totals', () => {
    const result = calculatePricing({ ...input, feeTaxRate: 0.1 });

    expect(result.error).toBeNull();
    expect(result.feeTax).toBeGreaterThan(0);
    expect((result.fees ?? 0) + (result.feeTax ?? 0)).toBeCloseTo((result.netRevenue ?? 0) * 0.143, 2);
    expect(result.margin).toBeCloseTo(0.2, 2);
  });

  it('rejects impossible targets and protects zero-denominator discounts', () => {
    expect(calculatePricing({ ...input, marketplaceRate: 1 }).error).toContain('below 100%');
    expect(calculatePricing({ ...input, targetMargin: 0.9 }).error).toContain('not achievable');
    expect(calculatePricing({ ...input, discountRate: 1 }).error).toContain('below 100%');
  });
});
