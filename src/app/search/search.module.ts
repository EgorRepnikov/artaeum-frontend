import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { routes } from './search.route'
import { SearchComponent } from './search.component'
import { ArticlesComponent } from './articles'
import { PostsComponent } from './posts'
import { ProfilesComponent } from './profiles'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SearchComponent,
    ArticlesComponent,
    PostsComponent,
    ProfilesComponent
  ]
})
export class SearchModule {}
