import { Component, Input, OnInit } from '@angular/core'

import { CommentService } from '../../../core'

@Component({
  selector: 'ae-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.css']
})
export class CommentButtonComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: string

  commentsCount: number

  constructor(private commentService: CommentService) {}

  async ngOnInit() {
    const { body } = await this.commentService
      .query(this.resourceType, this.resourceId)
      .toPromise()
    this.commentsCount = Object.keys(body).length || 0
  }
}