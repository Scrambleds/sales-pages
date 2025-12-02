import {
  Component,
  computed,
  Inject,
  Injector,
  PLATFORM_ID,
  signal,
  ChangeDetectorRef,
  Signal,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Language } from '../../../../core/enums/lanuage.enum';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class StoreNavbarComponent {
  public cartItemCount;
  public loginText = signal<string>('เข้าสู่ระบบ');
  public isBrowser = computed(() => isPlatformBrowser(this.platformId));

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {
    this.cartItemCount = this.cartService.totalItems;
  }

  async ngOnInit(): Promise<void> {
    //initialize app only in browser
  }

  onClick() {
    this.router.navigate(['/auth']);
    this.cdr.detectChanges();
  }
}
