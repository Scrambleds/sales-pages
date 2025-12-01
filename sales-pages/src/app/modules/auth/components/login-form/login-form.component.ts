import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from '@angular/forms'

@Component({
    selector: 'app-login-form',
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    @Output() submitForm = new EventEmitter<string>()
    @Output() socialLogin = new EventEmitter<string>()

    public logoUrl = signal<string>('https://png.pngtree.com/png-vector/20220207/ourmid/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png')
    public shopName = signal<string>('Sales Pages')
    // public loginTitle = computed(() => this.getLoginTitle())

    // public loginForm = new UntypedFormGroup({
    //     username: new UntypedFormControl('', [ValidatorsRequiredField()])
    // })

    // private getLoginTitle(): string {
    //     const text = this.phraseService.translate('salespage_sign_in_header', this.appConfigService.getLanguage())
    //     if(text){
    //         return text.replace(/\{Shop_name\}/i, this.shopName())
    //     }

    //     return ''
    // }
    
    // public onSubmit() {
    //     if(!this.loginForm.valid){
    //         return
    //     }

    //     const username = this.loginForm.get('username')?.value || ''
    //     this.submitForm.emit(username)
    // }

    public onSocialLogin(provider: string) {
        this.socialLogin.emit(provider)
    }
}