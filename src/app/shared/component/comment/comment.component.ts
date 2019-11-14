import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User, Comment, CommentService, UserService, Principal } from '../../../core'

@Component({
  selector: 'ae-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: string

  form = new FormGroup({
    'text': new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  currentUser: User
  comments: Comment[]
  users: User[] = []

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private principal: Principal
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    this.loadAll()
  }

  getUser(id: number): User {
    return this.users.find(u => u.id === id)
  }

  createComment() {
    const comment = {
      text: this.form.value.text,
      resourceType: this.resourceType,
      resourceId: this.resourceId
    }
    this.form.reset()
    this.commentService.create(comment).subscribe(() => this.loadAll())
  }

  deleteComment(id: number) {
    this.commentService.delete(id).subscribe(() => this.loadAll())
  }

  private loadAll() {
    this.commentService.query(this.resourceType, this.resourceId)
      .subscribe(comments => {
        this.comments = comments.body
        this.loadUsers()
      })
  }

  private loadUsers() {
    this.comments.map(comment => {
      this.userService
        .get(comment.userId)
        .subscribe(res => this.users.push(res.body))
    })
  }
}