import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core'
import { SharedModule } from '../shared'
import { routes } from './article.route'
import { ArticleComponent } from './article.component'

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule {}
