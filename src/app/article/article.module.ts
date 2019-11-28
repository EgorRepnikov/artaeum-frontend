import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { routes } from './article.route'
import { SingleArticleComponent } from './single-article/single-article.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SingleArticleComponent
  ]
})
export class ArticleModule {}
