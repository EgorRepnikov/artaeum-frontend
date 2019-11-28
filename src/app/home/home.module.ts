import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './home.route'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared'
import { HomeComponent } from './home.component'
import { AllArticlesComponent } from './all-articles/all-articles.component'
import { AllPostsComponent } from './all-posts/all-posts.component'

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    AllArticlesComponent,
    AllPostsComponent
  ]
})
export class HomeModule {}
