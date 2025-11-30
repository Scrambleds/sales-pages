import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { LayoutComponent } from '../../core/components/layout/layout.component';
import { CurrencyPipe } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

@Component({
  selector: 'app-test',
  imports: [CurrencyPipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  private layoutComponent = inject(LayoutComponent);
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  // Checkout Logic
  products = signal<Product[]>([
    { id: 1, name: 'iPhone 15', price: 32900, quantity: 1, selected: false },
    { id: 2, name: 'Samsung S24', price: 30900, quantity: 1, selected: false },
    { id: 3, name: 'iPad Air', price: 23900, quantity: 1, selected: false },
  ]);

  allSelected = computed(() => this.products().length > 0 && this.products().every(p => p.selected));
  
  // Total Price ไม่ขึ้นกับ Selection (รวมทั้งหมด)
  totalPrice = computed(() => 
    this.products()
      .reduce((sum, p) => sum + (p.price * p.quantity), 0)
  );

  // คำนวณจำนวนสินค้าที่เลือกจากตาราง
  selectedQty = computed(() => 
    this.products()
      .reduce((sum, p) => sum + p.quantity, 0)
  );

  totalCartItems = computed(() => this.count() + this.selectedQty());

  constructor() {
    // Map จำนวนสินค้า (Manual + Selected) ไปยังตะกร้า
    this.layoutComponent.syncCart(this.totalCartItems);
  }

  ngOnInit(): void {
    // ตัวอย่าง: กำหนดค่าเริ่มต้นให้กับ count เป็น 10 เมื่อหน้าเว็บโหลดเสร็จ
    
    console.log('TestComponent initialized. Start count at:', this.count());
  }


  // Checkout Methods
  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.products.update(products => 
      products.map(p => ({ ...p, selected: isChecked }))
    );
  }

  toggleProduct(id: number) {
    this.products.update(products => 
      products.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    );
  }

  updateQuantity(id: number, delta: number) {
    this.products.update(products => 
      products.map(p => {
        if (p.id === id) {
          const newQty = Math.max(0, p.quantity + delta);
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  }

  removeProduct(id: number) {
    this.products.update(products => products.filter(p => p.id !== id));
  }
}
