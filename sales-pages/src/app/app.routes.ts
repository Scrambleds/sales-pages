import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Cart',
        loadComponent: () =>
          import('../app/modules/cart/cart-detail/cart-detail.component').then(
            (m) => m.CartDetailComponent
          ),
      },
      {
        path: 'ProductDetail',
        loadComponent: () =>
          import(
            '../app/modules/product/product-detail/product-detail.component'
          ).then((m) => m.ProductDetailComponent),
      },
    ],
  },
];
