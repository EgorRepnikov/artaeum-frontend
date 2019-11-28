import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { routes } from './account.route'
import { ActivationComponent } from './activation/activation.component'
import { LoginComponent } from './login/login.component'
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component'
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component'
import { RegisterComponent } from './register/register.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivationComponent,
    LoginComponent,
    PasswordResetFinishComponent,
    PasswordResetInitComponent,
    RegisterComponent
  ]
})
export class AccountModule {}
