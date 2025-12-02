import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../../core/models/product/productlist.model';
import { ProductService } from '../../../core/services/product/productservice';
import { ProductlistComponent } from '../product-list/productlist.component';
import { PageSettingComponent } from '../page-setting/page-setting.component';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, NgxPaginationModule, ProductlistComponent, PageSettingComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  allProducts: Product[] = [];
  // productsOnPage: Product[] = [];
  pageSizeOptions: number[] = [10, 20, 50, 100];
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  pagedItemsId: string = 'serverPaging';

  constructor(private productService: ProductService){
    
  }

  ngOnInit(): void {
          this.loadAllProducts(); 
      }

  loadAllProducts(): void {
    this.productService.getProducts().subscribe(response => {
    this.allProducts = response.products;
    this.totalItems = response.products.length; 
    this.currentPage = 1;
    });
  }

  handlePageChange(newPage: number) {
    this.currentPage = newPage;
}

  handleItemsPerPageChange(newLimit: number) {
  this.itemsPerPage = newLimit;
  this.currentPage = 1;
  }
}