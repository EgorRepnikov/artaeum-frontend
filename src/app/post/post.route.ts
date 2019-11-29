import { Routes } from '@angular/router'

import { PostComponent } from './post.component'

export const routes: Routes = [{
  path: 'posts',
  children: [{
    path: ':id',
    component: PostComponent
  }]
}]
