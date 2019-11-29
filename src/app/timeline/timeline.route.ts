import { Routes } from '@angular/router'

import { UserRouteAccessService } from '../core'

import { TimelineComponent } from './timeline.component'
import { LastArticlesComponent } from './last-articles'

export const timelineRoutes: Routes = [{
  path: 'timeline',
  component: TimelineComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [{
    path: 'articles',
    component: LastArticlesComponent
  }]
}]
