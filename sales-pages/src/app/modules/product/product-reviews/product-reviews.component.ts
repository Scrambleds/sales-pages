import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../core/models/product/productlist.model';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-reviews.component.html',
})
export class ProductReviewsComponent {
  @Input() reviews: Review[] = [];
}
