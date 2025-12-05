import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../core/models/product/productlist.model';

@Pipe({
  name: 'salePrice',
  standalone: true,
})
export class SalePricePipe implements PipeTransform {
  transform(product: Product): number {
    return product.price * (1 - product.discountPercentage / 100);
  }
}
