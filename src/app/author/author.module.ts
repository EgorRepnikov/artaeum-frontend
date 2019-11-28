import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core'
import { SharedModule } from '../shared'
import { routes } from './author.route'
import { AuthorComponent } from './author.component'
import { AllArticlesComponent } from './all-articles/all-articles.component'
import { CategoriesComponent } from './categories/categories.component'
import { CreateUpdateArticleComponent } from './create-update-article/create-update-article.component'
import { DashboardComponent } from './dashboard/dashboard.component'

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
