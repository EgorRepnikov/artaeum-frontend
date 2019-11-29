import { Routes } from '@angular/router'

import { ArticleComponent } from './article.component'

export const routes: Routes = [{
  path: 'articles',
  children: [
    {
      path: ':id',
      component: ArticleComponent
    }
  ]
}]
