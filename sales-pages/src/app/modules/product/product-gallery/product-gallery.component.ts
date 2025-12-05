import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-gallery.component.html',
})
export class ProductGalleryComponent {
  @Input() images: string[] = [];
  @Input() title: string = '';
}
