import { Routes } from '@angular/router'

import { SinglePostComponent } from './single-post/single-post.component'

export const routes: Routes = [{
  path: 'posts',
  children: [{
    path: ':id',
    component: SinglePostComponent
  }]
}]
