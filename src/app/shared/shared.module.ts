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
    ImageEditorComponent
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
    ImageEditorComponent
  ]
})
export class SharedModule {}
