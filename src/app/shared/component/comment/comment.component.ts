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
    'text': new FormControl('', [
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

  async createComment() {
    const comment = {
      text: this.form.value.text,
      resourceType: this.resourceType,
      resourceId: this.resourceId
    }
    this.form.reset()
    await this.commentService.create(comment).toPromise()
    this.loadAll()
  }

  async deleteComment(id: number) {
    await this.commentService.delete(id).toPromise()
    this.loadAll()
  }

  private async loadAll() {
    const { body } = await this.commentService
      .query(this.resourceType, this.resourceId)
      .toPromise()
    this.comments = body
    this.loadUsers()
  }

  private async loadUsers() {
    for (const c of this.comments) {
      const { body } = await this.userService.get(c.userId).toPromise()
      this.users.push(body)
    }
  }
}