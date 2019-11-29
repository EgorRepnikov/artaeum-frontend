import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core'
import { SharedModule } from '../shared'
import { routes } from './author.route'
import { AuthorComponent } from './author.component'
import { AllArticlesComponent } from './all-articles'
import { CategoriesComponent } from './categories'
import { CreateUpdateArticleComponent } from './create-update-article'
import { DashboardComponent } from './dashboard'

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AuthorComponent,
    AllArticlesComponent,
    CategoriesComponent,
    CreateUpdateArticleComponent,
    DashboardComponent,
  ]
})
export class AuthorModule {}
