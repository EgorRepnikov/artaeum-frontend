import { Routes } from '@angular/router'
import { UserRouteAccessService, ResolvePagingParamsService } from '../core'

import { AuthorComponent } from './author.component'
import { AllArticlesComponent } from './all-articles/all-articles.component'
import { CategoriesComponent } from './categories/categories.component'
import { CreateUpdateArticleComponent } from './create-update-article/create-update-article.component'
import { DashboardComponent } from './dashboard/dashboard.component'

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