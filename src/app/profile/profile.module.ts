import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CoreModule } from '../core'
import { SharedModule } from '../shared'
import { profileRoutes } from './profile.route'
import { ProfileComponent } from './profile.component'
import { WallComponent, CreatePostComponent } from './wall'
import { BlogComponent, AllArticlesComponent, ArticlesByCategoryComponent } from './blog'
import { SubscribersComponent } from './subscribers'

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(profileRoutes)
  ],
  declarations: [
    ProfileComponent,
    WallComponent,
    CreatePostComponent,
    BlogComponent,
    AllArticlesComponent,
    ArticlesByCategoryComponent,
    SubscribersComponent
  ]
})
export class ProfileModule {}
