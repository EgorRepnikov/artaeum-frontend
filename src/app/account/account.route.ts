import { Routes } from '@angular/router'

import { ActivationComponent } from './activation'
import { LoginComponent } from './login'
import {
  PasswordResetFinishComponent,
  PasswordResetInitComponent
} from './password-reset'
import { RegisterComponent } from './register'

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
