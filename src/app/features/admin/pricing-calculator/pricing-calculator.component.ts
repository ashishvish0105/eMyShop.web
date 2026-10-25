import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  calculatePricing,
  PricingCalculatorInput,
  PricingCalculatorResult,
  PricingStrategy,
} from './pricing-calculator.service';

interface CostField {
  key: string;
  label: string;
  value: number;
  enabled: boolean;
}

interface PricingScenario {
  id: string;
  name: string;
  createdAt: string;
  product: {
    name: string;
    sku: string;
    category: string;
    quantity: number;
    currency: string;
    weight: number | null;
    dimensions: string;
  };
  input: PricingCalculatorInput;
  costs: CostField[];
  result: PricingCalculatorResult;
}

const STORAGE_KEY = 'emyshop-pricing-scenarios';

@Component({
  selector: 'app-pricing-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing-calculator.component.html',
})
export class PricingCalculatorComponent implements OnInit {
  readonly Math = Math;
  readonly currencies = ['USD', 'INR', 'EUR', 'GBP', 'AED'];
  readonly strategies: { value: PricingStrategy; label: string }[] = [
    { value: 'margin', label: 'Target profit margin' },
    { value: 'fixed', label: 'Fixed profit per unit' },
    { value: 'markup', label: 'Markup on cost' },
    { value: 'breakEven', label: 'Break-even (zero profit)' },
    { value: 'custom', label: 'Custom selling price' },
  ];
  costs: CostField[] = this.defaultCosts();
  product = {
    name: '',
    sku: '',
    category: '',
    quantity: 1,
    currency: 'USD',
    weight: null as number | null,
    dimensions: '',
  };
  productWeight: number | null = null;
  productDimensions = '';
  input: PricingCalculatorInput = this.defaultInput();
  scenarios: PricingScenario[] = [];
  scenarioName = '';
  notice = '';
  noticeIsError = false;

  ngOnInit(): void {
    this.loadScenarios();
  }

  get result(): PricingCalculatorResult {
    const activeCosts = this.costs.filter((cost) => cost.enabled).map((cost) => cost.value);
    return calculatePricing({ ...this.input, costs: activeCosts });
  }

  get totalDiscountRate(): number {
    return 1 - (1 - this.input.discountRate) * (1 - this.input.couponRate);
  }

  get currencySymbol(): string {
    return new Intl.NumberFormat('en', { style: 'currency', currency: this.product.currency })
      .formatToParts(0)
      .find((part) => part.type === 'currency')?.value ?? this.product.currency;
  }

  get isFormValid(): boolean {
    const percentages = [
      this.input.marketplaceRate, this.input.paymentRate, this.input.affiliateRate,
      this.input.advertisingRate, this.input.taxRate, this.input.feeTaxRate,
      this.input.discountRate, this.input.couponRate, this.input.targetMargin,
      this.input.markupRate,
    ];
    const fixedAmounts = [
      ...this.costs.filter((cost) => cost.enabled).map((cost) => cost.value), this.input.transactionFee,
      this.input.platformFee, this.input.advertisingCost, this.input.codFee,
      this.input.returnsCost, this.input.reverseShippingCost, this.input.deliveryFailureCost,
      this.input.warrantyCost, this.input.targetProfit, this.input.customPrice,
    ];
    return Number.isInteger(this.product.quantity) && this.product.quantity > 0 &&
      (this.productWeight === null || (Number.isFinite(this.productWeight) && this.productWeight >= 0)) &&
      percentages.every((value) => Number.isFinite(value) && value >= 0 && value < 1) &&
      fixedAmounts.every((value) => Number.isFinite(value) && value >= 0);
  }

  get costBreakdown(): { label: string; amount: number }[] {
    const rows = this.costs
      .filter((cost) => cost.enabled && cost.value > 0)
      .map((cost) => ({ label: cost.label, amount: cost.value }));
    const fixedFees = [
      ['Fixed transaction fee', this.input.transactionFee],
      ['Platform fee allocation', this.input.platformFee],
      ['Fixed advertising cost', this.input.advertisingCost],
      ['COD fee', this.input.codFee],
      ['Expected returns & refund reserve', this.input.returnsCost],
      ['Reverse-shipping cost', this.input.reverseShippingCost],
      ['Damaged / lost / failed-delivery reserve', this.input.deliveryFailureCost],
      ['Warranty & after-sales reserve', this.input.warrantyCost],
    ] as const;
    return [...rows, ...fixedFees
      .filter(([, amount]) => amount > 0)
      .map(([label, amount]) => ({ label, amount }))];
  }

  get distribution(): { label: string; amount: number; tone: string }[] {
    const result = this.result;
    if (result.error || result.profit === null || result.profit < 0) return [];
    return [
      { label: 'Product & operating costs', amount: result.totalCost, tone: 'cost' },
      { label: 'Marketplace & payment fees', amount: (result.fees ?? 0) + (result.feeTax ?? 0), tone: 'fees' },
      { label: 'Sales tax', amount: result.taxAmount ?? 0, tone: 'tax' },
      { label: 'Estimated profit', amount: result.profit, tone: 'profit' },
    ];
  }

  get distributionTotal(): number {
    return this.distribution.reduce((total, item) => total + Math.max(0, item.amount), 0);
  }

  get sellerPayout(): number | null {
    const result = this.result;
    if (
      result.error || result.netRevenue === null || result.fees === null || result.feeTax === null
    ) return null;
    return Math.round((
      result.netRevenue - result.fees - result.feeTax -
      this.input.transactionFee - this.input.platformFee + Number.EPSILON
    ) * 100) / 100;
  }

  get discountAmount(): number {
    const result = this.result;
    if (result.recommendedListPrice === null || result.discountedCustomerPrice === null) return 0;
    const salesTaxRate = this.input.taxExempt ? 0 : this.input.taxRate;
    const listCustomerPrice = result.recommendedListPrice * (this.input.taxInclusive ? 1 : 1 + salesTaxRate);
    return Math.max(0, listCustomerPrice - result.discountedCustomerPrice);
  }

  money(value: number | null): string {
    if (value === null || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.product.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  scenarioMoney(value: number | null, currency: string): string {
    if (value === null || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  percent(value: number): number {
    return Number((value * 100).toFixed(2));
  }

  setRate(
    key: 'marketplaceRate' | 'paymentRate' | 'affiliateRate' | 'advertisingRate' |
      'taxRate' | 'feeTaxRate' | 'discountRate' | 'couponRate' | 'targetMargin' | 'markupRate',
    value: number,
  ): void {
    this.input = { ...this.input, [key]: Number(value) / 100 };
  }

  addCost(): void {
    this.costs = [...this.costs, { key: `custom-${Date.now()}`, label: 'Additional cost', value: 0, enabled: true }];
  }

  removeCost(key: string): void {
    this.costs = this.costs.filter((cost) => cost.key !== key);
  }

  roundToEnding(ending: string): void {
    const currentPrice = this.result.recommendedListPrice;
    if (currentPrice === null || ending === 'none') return;
    const cents = ending === '.95' ? 95 : 99;
    const whole = Math.floor(currentPrice);
    const rounded = whole + cents / 100;
    const next = rounded < currentPrice ? whole + 1 + cents / 100 : rounded;
    const salesTaxRate = this.input.taxExempt ? 0 : this.input.taxRate;
    const taxFactor = this.input.taxInclusive ? 1 : 1 + salesTaxRate;
    const discountedPreTax = (next * (1 - this.input.discountRate) * (1 - this.input.couponRate)) / taxFactor;
    if (discountedPreTax <= 0) return;
    this.input = { ...this.input, strategy: 'custom', customPrice: discountedPreTax };
  }

  async copyPrice(): Promise<void> {
    const price = this.result.recommendedListPrice;
    if (price === null || this.result.error) return;
    try {
      await navigator.clipboard.writeText(price.toFixed(2));
      this.setNotice('Recommended price copied to clipboard.');
    } catch {
      this.setNotice('Could not access the clipboard. Check browser permissions and try again.', true);
    }
  }

  saveScenario(): void {
    const result = this.result;
    if (!this.isFormValid || result.error) {
      this.setNotice(result.error ?? 'Fix the highlighted values before saving this scenario.', true);
      return;
    }
    const scenario: PricingScenario = {
      id: `${Date.now()}`,
      name: this.scenarioName.trim() || this.product.name.trim() || `Scenario ${this.scenarios.length + 1}`,
      createdAt: new Date().toISOString(),
      product: {
        ...this.product,
        weight: this.productWeight,
        dimensions: this.productDimensions,
      },
      input: { ...this.input, costs: this.costs.filter((cost) => cost.enabled).map((cost) => cost.value) },
      costs: this.costs.map((cost) => ({ ...cost })),
      result,
    };
    this.persistScenarios([scenario, ...this.scenarios]);
  }

  duplicateScenario(scenario: PricingScenario): void {
    const duplicate = {
      ...scenario,
      id: `${Date.now()}`,
      name: `${scenario.name} (copy)`,
      createdAt: new Date().toISOString(),
      product: { ...scenario.product },
      input: { ...scenario.input, costs: [...scenario.input.costs] },
      costs: scenario.costs.map((cost) => ({ ...cost })),
      result: { ...scenario.result },
    };
    this.persistScenarios([duplicate, ...this.scenarios]);
  }

  loadScenario(scenario: PricingScenario): void {
    this.product = {
      name: scenario.product.name,
      sku: scenario.product.sku,
      category: scenario.product.category,
      quantity: scenario.product.quantity,
      currency: scenario.product.currency,
      weight: scenario.product.weight,
      dimensions: scenario.product.dimensions,
    };
    this.productWeight = scenario.product.weight;
    this.productDimensions = scenario.product.dimensions;
    this.input = { ...scenario.input, costs: [...scenario.input.costs] };
    this.costs = scenario.costs.map((cost) => ({ ...cost }));
    this.setNotice(`Loaded "${scenario.name}" into the calculator.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteScenario(id: string): void {
    this.persistScenarios(this.scenarios.filter((scenario) => scenario.id !== id));
  }

  reset(): void {
    this.product = {
      name: '', sku: '', category: '', quantity: 1, currency: 'USD', weight: null, dimensions: '',
    };
    this.productWeight = null;
    this.productDimensions = '';
    this.input = this.defaultInput();
    this.costs = this.defaultCosts();
    this.scenarioName = '';
    this.setNotice('Calculator reset.');
  }

  exportCsv(): void {
    const result = this.result;
    if (result.error || result.recommendedListPrice === null) return;
    const rows = [
      ['Metric', 'Amount'],
      ['Product', this.product.name || 'Untitled product'],
      ['Currency', this.product.currency],
      ['Quantity', String(this.product.quantity)],
      ['Total cost per unit', result.totalCost.toFixed(2)],
      ['Break-even price', result.breakEvenPrice?.toFixed(2) ?? ''],
      ['Recommended list price', result.recommendedListPrice.toFixed(2)],
      ['Discounted customer price', result.discountedCustomerPrice?.toFixed(2) ?? ''],
      ['Sales tax', result.taxAmount?.toFixed(2) ?? ''],
      ['Marketplace commission', result.marketplaceFee?.toFixed(2) ?? ''],
      ['Payment processing fees', result.paymentFee?.toFixed(2) ?? ''],
      ['Affiliate and advertising fees', result.otherVariableFees?.toFixed(2) ?? ''],
      ['Fee tax', result.feeTax?.toFixed(2) ?? ''],
      ['Seller payout before product costs', this.sellerPayout?.toFixed(2) ?? ''],
      ['Net revenue excluding sales tax', result.netRevenue?.toFixed(2) ?? ''],
      ['Profit per unit', result.profit?.toFixed(2) ?? ''],
      ['Profit margin', `${((result.margin ?? 0) * 100).toFixed(2)}%`],
      ['Markup', `${((result.markup ?? 0) * 100).toFixed(2)}%`],
      ['Tax exempt', this.input.taxExempt ? 'Yes' : 'No'],
      ['Total profit for quantity', ((result.profit ?? 0) * this.product.quantity).toFixed(2)],
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product-pricing-calculation.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  private loadScenarios(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      this.scenarios = stored ? JSON.parse(stored) as PricingScenario[] : [];
      if (!Array.isArray(this.scenarios)) throw new Error('Saved pricing scenarios are not a list.');
    } catch {
      this.scenarios = [];
      this.setNotice('Saved scenarios could not be read from this browser.', true);
    }
  }

  private persistScenarios(scenarios: PricingScenario[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
      this.scenarios = scenarios;
      this.setNotice('Scenario saved in this browser only. It is not synced to the server.');
    } catch {
      this.setNotice('Could not save the scenario in this browser. Check available storage and try again.', true);
    }
  }

  private setNotice(message: string, isError = false): void {
    this.notice = message;
    this.noticeIsError = isError;
  }

  private defaultInput(): PricingCalculatorInput {
    return {
      costs: [],
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
      taxRate: 0,
      feeTaxRate: 0,
      taxInclusive: false,
      taxExempt: false,
      discountRate: 0,
      couponRate: 0,
      strategy: 'margin',
      targetMargin: 0.2,
      targetProfit: 0,
      markupRate: 0.3,
      customPrice: 0,
    };
  }

  private defaultCosts(): CostField[] {
    return [
      { key: 'purchase', label: 'Purchase / raw materials', value: 0, enabled: true },
      { key: 'manufacturing', label: 'Manufacturing / labor', value: 0, enabled: true },
      { key: 'packaging', label: 'Packaging & labeling', value: 0, enabled: true },
      { key: 'inbound', label: 'Inbound transportation', value: 0, enabled: true },
      { key: 'quality', label: 'Quality inspection', value: 0, enabled: true },
      { key: 'warehousing', label: 'Warehousing & storage', value: 0, enabled: true },
      { key: 'picking', label: 'Picking & packing', value: 0, enabled: true },
      { key: 'shipping', label: 'Shipping & fulfillment subsidy', value: 0, enabled: true },
      { key: 'insurance', label: 'Insurance & handling', value: 0, enabled: true },
      { key: 'other', label: 'Other operating costs', value: 0, enabled: true },
      { key: 'overhead', label: 'Overhead allocation', value: 0, enabled: true },
    ];
  }
}
