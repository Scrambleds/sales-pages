import {
  Product,
  ProductListResponse,
} from '../../../core/models/product/productlist.model';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'assets/data/default/mockup-prod.json';

  constructor(private http: HttpClient) {}

  // getProducts(limit: number, skip: number): Observable<ProductListResponse> {

  //         let params = new HttpParams()
  //             .set('limit', limit.toString())
  //             .set('skip', skip.toString());

  //         return this.http.get<ProductListResponse>(this.productsUrl, { params: params });
  //     }

  getProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.productsUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((response: ProductListResponse) =>
        response.products.find((p) => p.id === id)
      )
    );
  }
}
