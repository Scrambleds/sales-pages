import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product/productlist.model';
import { ProductService } from '../../../core/services/product/productservice';

@Component({
  selector: 'app-productlist',
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
})
export class ProductlistComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products.forEach((p) => {
      if (p.minimumOrderQuantity === undefined) {
        p.minimumOrderQuantity = 1;
      }
    });
  }

  changeQuantity(product: any, change: number) {
    const newQuantity = (product.quantity || 1) + change;

    if (newQuantity >= 1) {
      product.quantity = newQuantity;
    }
  }

  addToCart(product: any) {
    const quantity = product.quantity || 1;

    console.log(`เพิ่มสินค้า ${product.title} จำนวน ${quantity} ลงตะกร้า`);

    // this.cartService.addItem(product.id, quantity);
  }

  getSalePrice(product: Product): number {
    return product.price * (1 - product.discountPercentage / 100);
  }

  viewDetail(id: number) {
    this.router.navigate(['/product-detail', id]);
  }
}
