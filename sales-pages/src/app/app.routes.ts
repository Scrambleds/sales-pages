import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

export const routes: Routes = [
  {
      path: 'auth',
      loadComponent: () => import('../app/modules/auth/components/login/auth.component').then(m => m.AuthComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../app/modules/cart/cart-detail/cart-detail.component').then(
            (m) => m.CartDetailComponent
          ),
      },
      {
        path: 'product',
        loadComponent: () =>
          import(
            '../app/modules/product/product-form/product-form.component'
          ).then((m) => m.ProductFormComponent),
      },
    ],
  },
];