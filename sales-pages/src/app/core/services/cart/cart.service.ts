import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/product/productlist.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  totalItems = () => {};

  totalPrice = () => {};

  loadCart() {}

  addToCart(product: Product, quantity: number = 1) {}

  removeFromCart(productId: number) {}

  updateQuantity(productId: number, quantity: number) {}
}
