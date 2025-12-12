import { Component, OnInit } from '@angular/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart-detail',
  imports: [CartListComponent, CartSummaryComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss',
})
export class CartDetailComponent {}
