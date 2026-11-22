export type PaymentMethodType = 'card' | 'upi' | 'wallet';
export type PaymentFilter = 'all' | PaymentMethodType;

interface PaymentMethodBase {
  id: string;
  type: PaymentMethodType;
  holderName: string;
  nickname: string;
  isDefault: boolean;
  isVerified: boolean;
}

export interface CardPaymentMethod extends PaymentMethodBase {
  type: 'card';
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
  description: string;
  cardType: string;
  extra?: string;
}

export interface UpiPaymentMethod extends PaymentMethodBase {
  type: 'upi';
  upiId: string;
  bankName: string;
  gateway: string;
  refundRouting: string;
}

export interface WalletPaymentMethod extends PaymentMethodBase {
  type: 'wallet';
  provider: string;
  email: string;
  preAuthLimit: string;
  lastUsed: string;
  protection: string;
}

export type PaymentMethod =
  | CardPaymentMethod
  | UpiPaymentMethod
  | WalletPaymentMethod;

export interface NewPaymentMethod {
  type: PaymentMethodType;
  holderName: string;
  nickname: string;
  last4?: string;
  expiry?: string;
  upiId?: string;
  walletProvider?: string;
  walletEmail?: string;
}
