import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  cartService = inject(CartService);

  subtotal = computed(() => {
    return this.cartService
      .CartItems()
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  });

  tax = computed(() => {
    return this.subtotal() * 0.07; // 7% VAT
  });

  total = computed(() => {
    return this.subtotal() + this.tax();
  });
}
