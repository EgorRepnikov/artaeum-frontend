import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../../environments/environment'

import {
  User,
  Article,
  UserService,
  ArticleService,
  Principal
} from '../../../core'

@Component({
  selector: 'ae-all-articles-blog',
  templateUrl: './all-articles.component.html'
})
export class AllArticlesComponent implements OnInit {

  currentUser: User
  user: User
  articles: Article[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private principal: Principal,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const { data } = this.route.snapshot
    this.page = data.pagingParams.page
    this.previousPage = data.pagingParams.page
    //
    const { params } = this.route.parent.snapshot
    const { body } = await this.userService.get(params['login']).toPromise()
    this.user = body
    this.currentUser = await this.principal.identity()
    this.loadAll()
  }

  async loadAll() {
    const { body, headers } = await this.articleService
      .query({
        page: this.page - 1,
        size: this.postsPerPage,
        userId: this.user.id
      })
      .toPromise()
    this.articles = body
    this.totalItems = headers.get('X-Total-Count')
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login, 'blog'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage
        }
      })
      this.loadAll()
    }
  }
}
