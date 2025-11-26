import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cart',
        loadComponent: () =>
          import('../app/modules/cart/cart-detail/cart-detail.component').then(
            (m) => m.CartDetailComponent
          ),
      },
    ],
  },
];
