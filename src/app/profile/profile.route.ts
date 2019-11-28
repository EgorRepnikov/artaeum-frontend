import { Routes } from '@angular/router'

import { ResolvePagingParamsService } from '../core'
import { ProfileComponent } from './profile.component'
import { BlogComponent, AllArticlesComponent, ArticlesByCategoryComponent } from './blog'
import { SubscribersComponent } from './subscribers'
import { WallComponent } from './wall'

export const profileRoutes: Routes = [{
  path: 'u/:login',
  component: ProfileComponent,
  children: [
    {
      path: 'blog',
      component: BlogComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService },
      children: [
        {
          path: '',
          component: AllArticlesComponent,
          resolve: { 'pagingParams': ResolvePagingParamsService }
        },
        {
          path: ':category',
          component: ArticlesByCategoryComponent,
          resolve: { 'pagingParams': ResolvePagingParamsService }
        }
      ]
    },
    {
      path: 'subscribers',
      component: SubscribersComponent
    },
    {
      path: '',
      component: WallComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService }
    }
  ]
}]
