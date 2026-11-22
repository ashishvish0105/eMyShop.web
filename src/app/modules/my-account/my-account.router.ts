import { Routes } from "@angular/router";
import { MyAccountComponent } from "./my-account.component";
import { PersonalProfileComponent } from "./components/personal-profile/personal-profile.component";
import { OrderComponent } from "./components/order/order.component";

export const myAccountRouter:Routes=[
  // {
  // path:'',
  // component:MyAccountComponent,

  // children:[
  //   // Child route configuration is loaded on demand.
  //   // Creates a separate lazy-loaded JavaScript chunk when supported by the build.
  //   // Improves initial application loading by avoiding unnecessary downloads.
  // ]
  // }

  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/personal-profile/personal-profile.component')
        .then(m => m.PersonalProfileComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/order/order.component')
        .then(m => m.OrderComponent),
  },
  {
    path: 'wishlist',
      loadComponent: () =>
      import('./components/wishlist/wishlist.component')
        .then(m => m.WishlistComponent),
  },
  {
    path: 'save-address',
      loadComponent: () =>
      import('./components/wishlist/wishlist.component')
        .then(m => m.WishlistComponent),
  },
    {
    path: 'payments',
      loadComponent: () =>
      import('./components/payment/payment.component')
        .then(m => m.PaymentComponent),
  },
]
