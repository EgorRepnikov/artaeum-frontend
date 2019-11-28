import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../../environments/environment'

import {
  User,
  Article,
  UserService,
  ArticleService,
  Principal,
  Category,
  CategoryService
} from '../../../core'

@Component({
  selector: 'ae-articles-by-category',
  templateUrl: './articles-by-category.component.html'
})
export class ArticlesByCategoryComponent implements OnInit {

  currentUser: User
  user: User
  category: Category
  articles: Article[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const { pagingParams: { page } } = await this.activatedRoute.data.toPromise()
    this.page = page
    this.previousPage = page
    //
    const parentParams = await this.activatedRoute.parent.parent.params.toPromise()
    const params = await this.activatedRoute.params.toPromise()
    const userRes = await this.userService.get(parentParams['login']).toPromise()
    this.user = userRes.body
    const categoryRes = await this.categoryService.getAll(userRes.body.id).toPromise()
    this.category = categoryRes.body.find(c => c.name === params['category'])
    this.currentUser = await this.principal.identity()
    this.loadAll()
  }

  async loadAll() {
    const { body, headers } = await this.articleService
      .query({
        page: this.page - 1,
        size: this.postsPerPage,
        category: this.category._id
      })
      .toPromise()
    this.articles = body
    this.totalItems = headers.get('X-Total-Count')
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login, 'blog', this.category.name], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage
        }
      })
      this.loadAll()
    }
  }
}
