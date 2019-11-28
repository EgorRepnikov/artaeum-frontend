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
    const res = await this.articleService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE
    }).toPromise()
    this.articles = this.articles.concat(res.body)
    this.totalItems = +res.headers.get('X-Total-Count')
    this.loadUsers()
  }

  private loadUsers() {
    this.articles.forEach(async a => {
      if (!this.users[a.userId]) {
        this.users[a.userId] = await this.userService.get(a.userId).toPromise()
      }
    })
  }
}
