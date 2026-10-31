import { MenuItem } from '../mock-commerce.service';
import { CustomerAddress, CustomerPreferences } from './auth/customer-account.models';
import { CustomerAuthService } from './auth/customer-auth.service';

export function filterStorefrontProducts(products: MenuItem[], category: string, search: string): MenuItem[] {
  const query = search.toLowerCase().trim();
  return products.filter((product) =>
    product.status !== 'Unavailable' &&
    (category === 'All' || product.category === category) &&
    (!query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)),
  );
}

export function storefrontCategoryCount(products: MenuItem[], category: string): number {
  return category === 'All'
    ? products.length
    : products.filter((product) => product.category === category).length;
}

export function emptyPreferences(): CustomerPreferences {
  return { orderUpdates: true, offers: false, smsAlerts: true, shareActivity: false };
}

export function emptyProfileForm(): { fullName: string; email: string; preferences: CustomerPreferences } {
  return { fullName: '', email: '', preferences: emptyPreferences() };
}

export function emptyAddressForm(auth: CustomerAuthService, addressCount: number): CustomerAddress {
  const user = auth.currentUser();
  return {
    id: '',
    label: 'Home',
    fullName: user?.fullName || '',
    phone: user?.mobileNumber || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    instructions: '',
    isDefault: addressCount === 0,
  };
}
