import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product/productlist.model';
import { ProductService } from '../../../core/services/product/productservice';
import { CartService } from '../../../core/services/cart/cart.service';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductGalleryComponent } from '../product-gallery/product-gallery.component';
import { SalePricePipe } from '../../shared/pipes/sale-price.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    QuantitySelectorComponent,
    ProductReviewsComponent,
    ProductGalleryComponent,
    SalePricePipe,
  ],
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
