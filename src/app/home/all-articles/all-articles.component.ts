import { Component, OnInit } from '@angular/core'
import { environment as env } from '../../../environments/environment'

import { User, ArticleService, UserService, Principal, Article } from '../../core'

@Component({
  selector: 'ae-all-articles',
  templateUrl: './all-articles.component.html'
})
export class AllArticlesComponent implements OnInit {

  title = 'Last articles - Artaeum'

  currentUser: User
  articles: Article[] = []
  users: User[] = []
  page = 0
  totalItems = 0

  constructor(
    private principal: Principal,
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    await this.loadArticles()
  }

  async loadArticles() {
    const { body, headers } = await this.articleService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE
    }).toPromise()
    this.articles = this.articles.concat(body)
    this.totalItems = +headers.get('X-Total-Count')
    await this.loadUsers()
  }

  private async loadUsers() {
    for (const a of this.articles) {
      if (!this.users[a.userId]) {
        const { body } = await this.userService.get(a.userId).toPromise()
        this.users[a.userId] = body
      }
    }
  }
}
