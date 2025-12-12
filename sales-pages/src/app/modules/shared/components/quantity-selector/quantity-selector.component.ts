import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss',
})
export class QuantitySelectorComponent {
  @Input() quantity: number = 1;

  @Output() quantityChange = new EventEmitter<number>();

  qtyChange(newQuantity: number) {
    this.quantityChange.emit(newQuantity);
  }
}
