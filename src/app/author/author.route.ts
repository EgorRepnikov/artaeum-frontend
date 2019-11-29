import { Routes } from '@angular/router'
import { UserRouteAccessService, ResolvePagingParamsService } from '../core'

import { AuthorComponent } from './author.component'
import { AllArticlesComponent } from './all-articles'
import { CategoriesComponent } from './categories'
import { CreateUpdateArticleComponent } from './create-update-article'
import { DashboardComponent } from './dashboard'

export const routes: Routes = [{
  path: 'author',
  component: AuthorComponent,
  data: {
    authorities: ['user']
  },
  canActivate: [UserRouteAccessService],
  children: [
    {
      path: 'articles',
      component: AllArticlesComponent,
      resolve: { 'pagingParams': ResolvePagingParamsService }
    },
    {
      path: 'categories',
      component: CategoriesComponent
    },
    {
      path: 'article',
      component: CreateUpdateArticleComponent
    },
    {
      path: 'article/:id',
      component: CreateUpdateArticleComponent
    },
    {
      path: '',
      component: DashboardComponent
    }
  ]
}]