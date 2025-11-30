import { ChangeDetectionStrategy, OnInit, Component, effect, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule, 
    // HeaderComponent, 
    // FooterComponent, 
    // SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  cartCount = signal(0);
  isSidebarOpen: boolean = true; 
  ngOnInit(): void {
    // ตรวจสอบแพลตฟอร์มที่รันอยู่
    console.log(this.renderMode);
    console.log(this.platformId);

  }
  // ตรวจสอบ Render Mode
  renderMode = isPlatformServer(this.platformId) ? 'Server (SSR)' : 'Client (CSR)';

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  syncCart(sourceSignal: Signal<number>) {
    effect(() => {
      this.cartCount.set(sourceSignal());
    });
  }
}