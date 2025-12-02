import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product/productlist.model';
import { ProductService } from '../../../core/services/product/productservice';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity = signal<number>(1);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  getSalePrice(product: Product): number {
    return product.price * (1 - product.discountPercentage / 100);
  }

  incrementQuantity() {
    this.quantity.update((q) => q + 1);
  }

  decrementQuantity() {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity());
    }
  }
}
