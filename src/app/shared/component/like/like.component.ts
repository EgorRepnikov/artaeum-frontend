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

  like() {
    if (this.currentUser) {
      this.likeService
        .saveOrRemove(this.resourceType, this.resourceId)
        .subscribe(() => this.loadAll())
    }
  }

  loadAll() {
    this.likeService
      .getAllForResource(this.resourceType, this.resourceId)
      .subscribe(res => {
        this.likes = res.body
        this.countOfLikes = Object.keys(res.body).length || 0
        this.isLike = this.currentUser &&
          !!this.likes.find(like => like.userId === this.currentUser.id)
      })
  }
}
