import { Routes } from '@angular/router'

import { SingleArticleComponent } from './single-article/single-article.component'

export const routes: Routes = [{
  path: 'articles',
  children: [
    {
      path: ':id',
      component: SingleArticleComponent
    }
  ]
}]
