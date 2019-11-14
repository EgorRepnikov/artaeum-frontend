import { Component, Input, Output, EventEmitter } from '@angular/core'

import { User, Post } from '../../../core'

@Component({
  selector: 'ae-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: Post
  @Input() author: User
  @Input() currentUser: User
  @Output() aeOnDelete = new EventEmitter<void>()

  delete() {
    this.aeOnDelete.emit()
  }
}