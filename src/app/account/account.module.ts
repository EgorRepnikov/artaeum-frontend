import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core'
import { SharedModule } from '../shared'
import { routes } from './account.route'
import { ActivationComponent } from './activation'
import { LoginComponent } from './login'
import {
  PasswordResetFinishComponent,
  PasswordResetInitComponent
} from './password-reset'
import { RegisterComponent } from './register'

@NgModule({
  imports: [
    CoreModule,
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
