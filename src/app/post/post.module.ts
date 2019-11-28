import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared'
import { routes } from './post.route'
import { SinglePostComponent } from './single-post/single-post.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SinglePostComponent]
})
export class PostModule {}
