import { Component, OnInit } from '@angular/core'
import { environment as env} from '../../../environments/environment'

import {
  Principal,
  SubscriptionService,
  ArticleService,
  UserService,
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
  users: User[] = []

  private page = 0
  private userIds: string

  constructor(
    private principal: Principal,
    private subscriptionService: SubscriptionService,
    private articleService: ArticleService,
    private userService: UserService
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
    await this.loadUsers()
  }

  private async loadUsers() {
    for (const a of this.articles) {
      if (!this.users[a.userId]) {
        const res = await this.userService.get(a.userId).toPromise()
        this.users[a.userId] = res.body
      }
    }
  }
}
