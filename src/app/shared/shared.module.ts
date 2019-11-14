import { NgModule } from '@angular/core'

import { SharedLibsModule } from './shared-libs.module'
import {
  CommentComponent, LikeComponent,
  CommentButtonComponent, PostComponent,
  ArticleComponent, LoaderComponent,
  ImageEditorComponent
} from './component'
import { HasAuthorityDirective } from './directive'
import { DateConverterPipe, ImageAppenderPipe } from './pipe'

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ArticleComponent,
    LoaderComponent,
    ImageEditorComponent,
    HasAuthorityDirective,
    DateConverterPipe,
    ImageAppenderPipe
  ],
  exports: [
    CommentComponent,
    LikeComponent,
    CommentButtonComponent,
    PostComponent,
    ArticleComponent,
    LoaderComponent,
    ImageEditorComponent,
    HasAuthorityDirective,
    DateConverterPipe,
    ImageAppenderPipe
  ]
})
export class SharedModule {}
