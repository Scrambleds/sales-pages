import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LoginFormComponent } from '../login-form/login-form.component'
import { Language } from '../../../../core/enums/lanuage.enum'
import { LanguageDropdownComponent } from '../../../shared/components/language-dropdown/language-dropdown.component'

@Component({
    selector: 'app-auth',
    imports: [
        CommonModule,
        FormsModule,
        LoginFormComponent,
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    public backgroundImageUrl = signal<string>('https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')

    public langOptions = [
		{ value: Language.th, text: 'TH', imageSelection: 'assets/images/flags/flag-of-thailand.png' },
		{ value: Language.en, text: 'EN', imageSelection: 'assets/images/flags/flag-of-uk.png' }
	]

    handleLogin(identifier: string) {
        console.log('Login with:', identifier)
    }

    handleSocialLogin(provider: string) {
        console.log('Social login with:', provider)
    }
}