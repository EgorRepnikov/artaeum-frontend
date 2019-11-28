import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User, PostService } from '../../../core'

@Component({
  selector: 'ae-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent {

  @Input() currentUser: User
  @Output() updateWall = new EventEmitter<void>()

  form = new FormGroup({
    'text': new FormControl(null, [
      Validators.required,
      Validators.minLength(1)
    ])
  })

  constructor(private postService: PostService) {}

  async onSubmit() {
    const post = { text: this.form.value.text }
    this.form.reset()
    await this.postService.create(post)
    this.updateWall.emit()
  }
}
