import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'page-settings',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './page-setting.component.html',
  styleUrl: './page-setting.component.scss'
})
export class PageSettingComponent {
  @Input() selectedLimit: number = 10;
  @Input() limits: number[] = [10, 20, 50, 100];

  @Output() itemsPerPageChanged = new EventEmitter<number>();

  onLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newLimit = Number(target.value);
    if (newLimit !== this.selectedLimit) {
        this.itemsPerPageChanged.emit(newLimit);
    }
  }
}