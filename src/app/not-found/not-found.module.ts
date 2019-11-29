import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../shared/shared.module'

import { NotFoundComponent } from './not-found.component'
import { routes } from './not-found.route'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule {}