import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import {
  CommentComponent, LikeComponent,
  CommentButtonComponent, PostComponent,
  ArticleComponent, LoaderComponent,
  ImageEditorComponent
} from './component'
import { HasAuthorityDirective } from './directive'
import { DateConverterPipe, ImageAppenderPipe } from './pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
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
