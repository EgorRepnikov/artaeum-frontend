import { Component, OnInit } from '@angular/core'
import { environment as env} from '../../../environments/environment'

import {
  Principal,
  SubscriptionService,
  ArticleService,
  User,
  Article
} from '../../core'

@Component({
  selector: 'ae-last-articles',
  templateUrl: './last-articles.component.html'
})
export class LastArticlesComponent implements OnInit {

  title = 'Articles from your subscriptions - Artaeum'

  currentUser: User
  articles: Article[] = []

  private page = 0
  private userIds: string

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private articleService: ArticleService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    if (this.currentUser) {
      const res = await this.subscriptionService
        .query({ subscriberId: this.currentUser.id })
        .toPromise()
      this.userIds = res.body.map(s => s.profileId).join(',')
    }
  }

  async loadArticles() {
    const { body } = await this.articleService
      .queryByUsers({
        page: this.page++,
        size: env.POSTS_PER_PAGE,
        users: this.userIds
      })
      .toPromise()
    this.articles = this.articles.concat(body)
  }
}
