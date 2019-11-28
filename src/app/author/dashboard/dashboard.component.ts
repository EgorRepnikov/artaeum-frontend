import { Component, OnInit } from '@angular/core'

import {
  SubscriptionService,
  ArticleService,
  PostService,
  LikeService,
  Principal
} from '../../core'

@Component({
  selector: 'ae-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subsCount: number
  articlesCount: number
  postsCount: number
  likesCount: number

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private articleService: ArticleService,
    private postService: PostService,
    private likeService: LikeService
  ) {}

  async ngOnInit() {
    const user = await this.principal.identity()
    this.subsCount = this.getCount(
      await this.subscriptionService
        .query({ profileId: user.id })
        .toPromise()
    )
    this.articlesCount = this.getCount(
      await this.articleService
        .query({ userId: user.id })
        .toPromise()
    )
    this.postsCount = this.getCount(
      await this.postService
        .query({ userId: user.id })
        .toPromise()
    )
    this.likesCount = this.getCount(
      await this.likeService
        .getAllForUser(user.id)
        .toPromise()
    )
  }

  private getCount(param: { body: any[] }): number {
    return Object.keys(param.body).length || 0
  }
}
