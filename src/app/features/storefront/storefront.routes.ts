import { Routes } from '@angular/router';
import { storefrontAuthGuard } from './auth/storefront-auth.guard';
import { StorefrontLayoutComponent } from './storefront-layout.component';

export const storefrontRoutes: Routes = [
  {
    path: '',
    component: StorefrontLayoutComponent,
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./products/pages/products-page/products-page.component').then((m) => m.ProductsPageComponent),
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu-page/menu-page.component').then((m) => m.MenuPageComponent),
      },
      {
        path: 'offers',
        loadComponent: () => import('./offers/offers-page/offers-page.component').then((m) => m.OffersPageComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
      },
      {
        path: 'checkout',
        canActivate: [storefrontAuthGuard],
        loadComponent: () => import('./checkout/checkout-page/checkout-page.component').then((m) => m.CheckoutPageComponent),
      },
      {
        path: 'orders',
        canActivate: [storefrontAuthGuard],
        loadComponent: () => import('./orders/orders-page/orders-page.component').then((m) => m.OrdersPageComponent),
      },
      {
        path: 'profile',
        canActivate: [storefrontAuthGuard],
        loadComponent: () =>
          import('./account/profile/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
      },
      {
        path: 'addresses',
        canActivate: [storefrontAuthGuard],
        loadComponent: () =>
          import('./account/addresses/addresses-page/addresses-page.component').then((m) => m.AddressesPageComponent),
      },
      {
        path: 'wishlist',
        canActivate: [storefrontAuthGuard],
        loadComponent: () =>
          import('./account/wishlist/wishlist-page/wishlist-page.component').then((m) => m.WishlistPageComponent),
      },
      {
        path: 'notifications',
        canActivate: [storefrontAuthGuard],
        loadComponent: () =>
          import('./account/notifications/notifications-page/notifications-page.component').then((m) => m.NotificationsPageComponent),
      },
      {
        path: 'settings',
        canActivate: [storefrontAuthGuard],
        loadComponent: () =>
          import('./account/settings/settings-page/settings-page.component').then((m) => m.SettingsPageComponent),
      },
      {
        path: 'help',
        loadComponent: () => import('./help/help-page/help-page.component').then((m) => m.HelpPageComponent),
      },
    ],
  },
];
