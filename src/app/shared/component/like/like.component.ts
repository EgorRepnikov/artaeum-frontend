import { Component, Input, OnInit } from '@angular/core'

import { LikeService, Principal, User, Like } from '../../../core'

@Component({
  selector: 'ae-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() resourceType: string
  @Input() resourceId: number

  currentUser: User
  likes: Like[]
  countOfLikes: number
  isLike: boolean

  constructor(
    private likeService: LikeService,
    private principal: Principal
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    this.loadAll()
  }

  async like() {
    if (this.currentUser) {
      await this.likeService
        .saveOrRemove(this.resourceType, this.resourceId)
        .toPromise()
      await this.loadAll()
    }
  }

  async loadAll() {
    const { body } = await this.likeService
      .getAllForResource(this.resourceType, this.resourceId)
      .toPromise()
    this.likes = body
    this.countOfLikes = Object.keys(body).length || 0
    this.isLike = this.currentUser &&
      !!this.likes.find(l => l.userId === this.currentUser.id)
  }
}
