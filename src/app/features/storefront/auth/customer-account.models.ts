export interface CustomerProfile {
  userId: string;
  fullName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  defaultAddressId: string | null;
  createdAt: string;
  membershipTier?: string;
  preferences: CustomerPreferences;
}

export interface CustomerPreferences {
  orderUpdates: boolean;
  offers: boolean;
  smsAlerts: boolean;
  shareActivity: boolean;
}

export interface CustomerAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  instructions: string;
  isDefault: boolean;
}

export interface CustomerOrder {
  id: string;
  date: string;
  items: string;
  itemCount: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  deliveryStatus: 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
}

export interface CustomerNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  type: 'order' | 'delivery' | 'account';
}

export interface CustomerAccountState {
  profile: CustomerProfile;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  wishlistIds: number[];
  notifications: CustomerNotification[];
}

export interface CustomerSession {
  userId: string;
  accessToken: string | null;
  expiresAt: string;
  mock: boolean;
  profile: CustomerProfile;
}
