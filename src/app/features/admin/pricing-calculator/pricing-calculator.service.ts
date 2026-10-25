export type PricingStrategy = 'margin' | 'fixed' | 'markup' | 'breakEven' | 'custom';

export interface PricingCalculatorInput {
  costs: number[];
  marketplaceRate: number;
  paymentRate: number;
  affiliateRate: number;
  advertisingRate: number;
  transactionFee: number;
  platformFee: number;
  advertisingCost: number;
  codFee: number;
  returnsCost: number;
  reverseShippingCost: number;
  deliveryFailureCost: number;
  warrantyCost: number;
  taxRate: number;
  feeTaxRate: number;
  taxInclusive: boolean;
  taxExempt: boolean;
  discountRate: number;
  couponRate: number;
  strategy: PricingStrategy;
  targetMargin: number;
  targetProfit: number;
  markupRate: number;
  customPrice: number;
}

export interface PricingCalculatorResult {
  error: string | null;
  totalCost: number;
  breakEvenPrice: number | null;
  recommendedListPrice: number | null;
  discountedCustomerPrice: number | null;
  taxAmount: number | null;
  fees: number | null;
  feeTax: number | null;
  marketplaceFee: number | null;
  paymentFee: number | null;
  otherVariableFees: number | null;
  netRevenue: number | null;
  profit: number | null;
  margin: number | null;
  markup: number | null;
}

const roundMoney = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculatePricing(input: PricingCalculatorInput): PricingCalculatorResult {
  const fixedCost =
    input.costs.reduce((total, cost) => total + cost, 0) +
    input.transactionFee +
    input.platformFee +
    input.advertisingCost +
    input.codFee +
    input.returnsCost +
    input.reverseShippingCost +
    input.deliveryFailureCost +
    input.warrantyCost;
  const feeRate =
    (input.marketplaceRate + input.paymentRate + input.affiliateRate + input.advertisingRate) *
    (1 + input.feeTaxRate);
  const breakEvenDenominator = 1 - feeRate;
  const totalCost = roundMoney(fixedCost);

  const invalidResult = (error: string): PricingCalculatorResult => ({
    error,
    totalCost,
    breakEvenPrice: null,
    recommendedListPrice: null,
    discountedCustomerPrice: null,
    taxAmount: null,
    fees: null,
    feeTax: null,
    marketplaceFee: null,
    paymentFee: null,
    otherVariableFees: null,
    netRevenue: null,
    profit: null,
    margin: null,
    markup: null,
  });

  const percentageInputs = [
    input.marketplaceRate,
    input.paymentRate,
    input.affiliateRate,
    input.advertisingRate,
    input.taxRate,
    input.feeTaxRate,
    input.discountRate,
    input.couponRate,
    input.targetMargin,
    input.markupRate,
  ];
  const fixedInputs = [
    ...input.costs,
    input.transactionFee,
    input.platformFee,
    input.advertisingCost,
    input.codFee,
    input.returnsCost,
    input.reverseShippingCost,
    input.deliveryFailureCost,
    input.warrantyCost,
    input.targetProfit,
    input.customPrice,
  ];
  if (
    percentageInputs.some((value) => !Number.isFinite(value) || value < 0 || value >= 1) ||
    fixedInputs.some((value) => !Number.isFinite(value) || value < 0)
  ) {
    return invalidResult('Enter non-negative costs and percentages below 100%.');
  }
  if (!Number.isFinite(fixedCost) || fixedCost < 0 || !Number.isFinite(feeRate) || feeRate < 0) {
    return invalidResult('Costs and fees must be valid non-negative amounts.');
  }
  if (breakEvenDenominator <= 0) {
    return invalidResult('Combined percentage fees, including fee tax, must be below 100%.');
  }

  const breakEvenPrice = fixedCost / breakEvenDenominator;
  let requiredNetRevenue: number;
  switch (input.strategy) {
    case 'margin': {
      const denominator = 1 - feeRate - input.targetMargin;
      if (denominator <= 0) {
        return invalidResult('This profit margin is not achievable with the selected fees.');
      }
      requiredNetRevenue = fixedCost / denominator;
      break;
    }
    case 'fixed':
      requiredNetRevenue = (fixedCost + input.targetProfit) / breakEvenDenominator;
      break;
    case 'markup':
      requiredNetRevenue = (fixedCost * (1 + input.markupRate)) / breakEvenDenominator;
      break;
    case 'breakEven':
      requiredNetRevenue = breakEvenPrice;
      break;
    case 'custom':
      requiredNetRevenue = input.customPrice;
      break;
  }

  const discountFactor = (1 - input.discountRate) * (1 - input.couponRate);
  if (discountFactor <= 0) {
    return invalidResult('Combined discounts must leave a positive customer price.');
  }

  const salesTaxRate = input.taxExempt ? 0 : input.taxRate;
  const taxFactor = 1 + salesTaxRate;
  const undiscountedListPrice =
    (requiredNetRevenue * (input.taxInclusive ? taxFactor : 1)) / discountFactor;
  const listPrice = roundMoney(undiscountedListPrice);
  const customerPrice = roundMoney(
    listPrice * discountFactor * (input.taxInclusive ? 1 : taxFactor),
  );
  const discountedNetRevenue = roundMoney(customerPrice / taxFactor);
  const salesTax = roundMoney(customerPrice - discountedNetRevenue);
  const baseFeeRate =
    input.marketplaceRate + input.paymentRate + input.affiliateRate + input.advertisingRate;
  const percentageFees = discountedNetRevenue * feeRate;
  const totalRoundedPercentageFees = roundMoney(percentageFees);
  const marketplaceFee = roundMoney(discountedNetRevenue * input.marketplaceRate);
  const paymentFee = roundMoney(discountedNetRevenue * input.paymentRate);
  const fees = roundMoney(discountedNetRevenue * baseFeeRate);
  const otherVariableFees = roundMoney(fees - marketplaceFee - paymentFee);
  const feeTax = roundMoney(totalRoundedPercentageFees - fees);
  const profit = roundMoney(discountedNetRevenue - fixedCost - percentageFees);

  return {
    error: null,
    totalCost,
    breakEvenPrice: roundMoney(breakEvenPrice),
    recommendedListPrice: listPrice,
    discountedCustomerPrice: customerPrice,
    taxAmount: salesTax,
    fees,
    feeTax,
    marketplaceFee,
    paymentFee,
    otherVariableFees,
    netRevenue: discountedNetRevenue,
    profit,
    margin: discountedNetRevenue > 0 ? profit / discountedNetRevenue : 0,
    markup: fixedCost > 0 ? profit / fixedCost : 0,
  };
}
