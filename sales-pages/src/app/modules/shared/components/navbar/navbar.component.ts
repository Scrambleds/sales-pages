import { Component, computed, Inject, Injector, PLATFORM_ID, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Language } from '../../../../core/enums/lanuage.enum';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class StoreNavbarComponent {
    public cartItemCount = signal<number>(9)
    public loginText = signal<string>('เข้าสู่ระบบ')
    public isBrowser = computed(() => isPlatformBrowser(this.platformId))

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private injector: Injector,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
    }

    async ngOnInit(): Promise<void> {
        //initialize app only in browser
    }

    onClick(){
        this.router.navigate(['/auth'])
        this.cdr.detectChanges();
    }
}
