import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Language } from '../../../../core/enums/lanuage.enum';

// Define a strict interface for language options
interface LangOption {
    value: Language;
    text: string;
    imageSelection: string;
}

@Component({
  selector: 'app-language-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    NgOptimizedImage, // Use NgOptimizedImage for performance
  ], 
  // Use a host binding for better accessibility/control
  host: {
    'class': 'language-dropdown-host',
    'tabindex': '0', // Makes the host element focusable
    '(document:click)': 'handleOutsideClick($event)',
  },
  template: `
    <div class="custom-language-dropdown">
        <button 
            class="dropdown-toggle" 
            (click)="toggleDropdown()" 
            [style.width]="width()"
            aria-controls="language-options-list"
        >
            @if (selectedOption(); as option) {
                <div class="go5-dropdown-item-label-infomation">
                    <img 
                        ngSrc="{{ option.imageSelection }}" 
                        width="24" 
                        height="16" 
                        priority 
                        alt="Flag of {{ option.text }}"
                        class="go5-dropdown-item-image-label"
                    >
                    <p class="go5-text-body"> {{ option.text }} </p>
                </div>
            }
        </button>

        @if (isOpen()) {
            <ul class="dropdown-options" id="language-options-list" role="listbox">
                @for (option of langOptions; track option.value) {
                    <li 
                        (click)="selectLanguage(option.value)"
                        role="option"
                        [attr.aria-selected]="option.value === currentLanguage()"
                        [class]="option.value === currentLanguage() ? 'selected' : ''"
                    >
                        <div class="go5-dropdown-item-label-infomation">
                            <img 
                                ngSrc="{{ option.imageSelection }}" 
                                width="24" 
                                height="16" 
                                alt="Flag of {{ option.text }}"
                                class="go5-dropdown-item-image-label"
                            >
                            <p class="go5-text-body"> {{ option.text }} </p>
                        </div>
                    </li>
                }
            </ul>
        }
    </div>
  `,
  styleUrl: './language-dropdown.component.scss',
})
export class LanguageDropdownComponent {
    // 1. Input using the input() function
    public width = input<string>('71px');

    // 2. Signals for local state management
    public currentLanguage = signal<Language>(Language.en);
    public isOpen = signal<boolean>(false); 

    public langOptions: LangOption[] = [
        { value: Language.th, text: 'TH', imageSelection: 'assets/images/flags/flag-of-thailand.png' },
        { value: Language.en, text: 'EN', imageSelection: 'assets/images/flags/flag-of-uk.png' }
    ];

    // 3. Computed signal for derived state
    public selectedOption = computed(() => {
        return this.langOptions.find(option => option.value === this.currentLanguage());
    });
    
    // (Optional: Re-add service injection using inject() if needed)
    // private readonly appConfigService = inject(AppConfigService);

    ngOnInit() {
        // Initialization logic for the current language
        // const currentLanguage = this.appConfigService.getLanguage() as Language;
        // this.currentLanguage.set(currentLanguage);
    }

    public toggleDropdown() {
        this.isOpen.update(open => !open);
    }

    /**
     * Selects a language, updates the state, and closes the dropdown.
     * @param selectedLang The language to select.
     */
    public selectLanguage(selectedLang: string) {
        // const selectedLangEnum = selectedLang as Language;
        // this.appConfigService.setLanguage(selectedLangEnum);
        
        // 4. Use set() or update() on signals (not mutate())
        this.currentLanguage.set(selectedLang as Language); 
        this.isOpen.set(false); // Close the dropdown after selection
    }

    /**
     * Closes the dropdown when a click occurs outside the component.
     * Uses a host binding (document:click) instead of @HostListener.
     */
    public handleOutsideClick(event: MouseEvent) {
        const hostElement = event.currentTarget as HTMLElement;
        if (!hostElement.contains(event.target as Node) && this.isOpen()) {
            this.isOpen.set(false);
        }
    }
}