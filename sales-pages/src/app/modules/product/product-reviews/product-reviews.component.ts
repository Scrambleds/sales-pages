import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../core/models/product/productlist.model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  @Input() reviews: Review[] = [];

  getStars(count: number): number[] {
    return Array.from({ length: Math.floor(count) }, (_, i) => i);
  }
}
