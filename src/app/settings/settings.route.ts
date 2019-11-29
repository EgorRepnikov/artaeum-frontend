import { Routes } from '@angular/router'

import { UserRouteAccessService } from '../core'

import { SettingsComponent } from './settings.component'
import { ChangeAvatarComponent } from './change-avatar'
import { ChangeBackgroundComponent } from './change-background'
import { ChangeCommonComponent } from './change-common'
import { ChangePasswordComponent } from './change-password'

export const settingsRoutes: Routes = [{
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    {
      path: 'change-avatar',
      component: ChangeAvatarComponent
    },
    {
      path: 'change-background',
      component: ChangeBackgroundComponent
    },
    {
      path: '',
      component: ChangeCommonComponent
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent
    }
  ]
}]
