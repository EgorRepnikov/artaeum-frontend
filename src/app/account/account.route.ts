import { Routes } from '@angular/router'

import { ActivationComponent } from './activation/activation.component'
import { LoginComponent } from './login/login.component'
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component'
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component'
import { RegisterComponent } from './register/register.component'

export const routes: Routes = [
  {
    path: 'activate',
    component: ActivationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset/finish',
    component: PasswordResetFinishComponent
  },
  {
    path: 'reset/request',
    component: PasswordResetInitComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]
