import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { CategoryService, ArticleService, Principal, User, Article } from '../../core'

@Component({
  selector: 'ae-all-articles-author',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.css']
})
export class AllArticlesComponent implements OnInit {

  currentUser: User
  articles: Article[]
  categories = {}

  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  deleteCandidate: Article

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const { pagingParams: { page } } = await this.activatedRoute.data.toPromise()
    this.page = page
    this.previousPage = page
    this.currentUser = await this.principal.identity()
    await this.loadAll()
  }

  async loadAll() {
    const res = await this.articleService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      userId: this.currentUser.id
    }).toPromise()
    this.articles = res.body
    this.totalItems = res.headers.get('X-Total-Count')
    for (const a of res.body) {
      if (a.category) {
        const categoryRes = await this.categoryService.get(a.category).toPromise()
        this.categories[a._id] = categoryRes.body
      }
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/author/articles'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage
        }
      })
      this.loadAll()
    }
  }

  setDeleteCandidate(article: Article) {
    this.deleteCandidate = article
  }

  async deleteArticle() {
    await this.articleService.delete(this.deleteCandidate._id).toPromise()
    await this.loadAll()
  }
}
