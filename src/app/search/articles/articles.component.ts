import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Article, ArticleService, Principal } from '../../core'

@Component({
  selector: 'ae-search-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[]
  users = {}
  query: string
  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private principal: Principal
  ) {}

  async ngOnInit() {
    const { pagingParams: { page } } = await this.activatedRoute.data.toPromise()
    this.page = page
    this.previousPage = page
    const params = await this.activatedRoute.parent.queryParams.toPromise()
    this.query = params['query']
    this.currentUser = await this.principal.identity()
    await this.loadAll()
  }

  async loadAll() {
    const { body, headers } = await this.articleService
      .search({
        page: this.page - 1,
        size: this.postsPerPage,
        query: this.query
      })
      .toPromise()
    this.articles = body
    this.totalItems = headers.get('X-Total-Count')
    await this.loadUsers()
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/search'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          query: this.query
        }
      })
      this.loadAll()
    }
  }

  private async loadUsers() {
    for (const s of this.articles) {
      if (!this.users[s.userId]) {
        const res = await this.userService.get(s.userId).toPromise()
        this.users[s.userId] = res.body
      }
    }
  }
}
