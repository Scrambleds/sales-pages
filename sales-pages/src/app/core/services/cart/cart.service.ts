import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../../models/product/productlist.model';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartItems = signal<CartItem[]>([]);
  CartItemsSelected = signal<CartItem[]>([]);
  private http = inject(HttpClient);

  startAutoReloadCart(intervalMs = 30000) {
    setInterval(() => {
      this.getCart();
    }, intervalMs);
  }

  totalItemsQty = computed(() => {
    return this.CartItems().reduce((total, item) => total + item.quantity, 0);
  });
  totalItemsId = computed(() => {
    return new Set(this.CartItems().map((item) => item.product.id)).size;
  });

  totalPrice = () => {};

  getCart() {
    // Load cart from backend and store into local storage
  }

  addToCart(product: Product, quantity: number = 1) {
    this.CartItems.update((items) => {
      const isExisting = items.find((item) => item.product.id === product.id);
      if (isExisting) {
        return items.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: number) {}

  updateQuantity(productId: number, quantity: number) {
    this.CartItems.update((items) => {
      return items.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });
    });
  }
}
