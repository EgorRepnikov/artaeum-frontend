import { Routes } from '@angular/router'

import { ResolvePagingParamsService } from '../core'

import { SearchComponent } from './search.component'
import { ArticlesComponent } from './articles'
import { PostsComponent } from './posts'
import { ProfilesComponent } from './profiles'

export const routes: Routes = [{
  path: 'search',
  component: SearchComponent,
  children: [
    {
      path: 'articles',
      component: ArticlesComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService }
    },
    {
      path: '',
      component: PostsComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService }
    },
    {
      path: 'profiles',
      component: ProfilesComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService }
    }
  ]
}]
