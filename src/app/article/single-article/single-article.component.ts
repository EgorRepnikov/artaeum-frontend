import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import {
  User, Article,
  ArticleService, UserService,
  SmartButtonService, Principal,
  CategoryService, Category
} from '../../core'

@Component({
  selector: 'ae-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  title = 'Artaeum'

  article: Article
  articleBody: SafeHtml
  category: Category
  author: User
  currentUser: User

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const params = await this.activedRoute.params.toPromise()
    try {
      const res = await this.articleService.get(params['id']).toPromise()
      this.articleBody = this.sanitizer.bypassSecurityTrustHtml(res.body.body)
      this.article = res.body
      this.title = `${res.body.title} - Artaeum`
      await this.checkUserAndInitSmartButton()
      const authorRes = await this.userService.get(this.article.userId).toPromise()
      this.author = authorRes.body
      const categoryRes = await this.categoryService.get(this.article.category).toPromise()
      this.category = categoryRes.body
    } catch {
      this.router.navigate(['/404'])
    }
  }

  deleteArticle() {
    this.articleService
      .delete(this.article._id)
      .subscribe(() => this.router.navigate(['/']))
  }

  private async checkUserAndInitSmartButton() {
    const user = this.currentUser = await this.principal.identity()
    if (user && this.article.userId === user.id) {
      this.smartButtonService.add({
        className: 'fa fa-edit',
        link: `author/article/${this.article._id}`,
        title: 'Edit'
      })
    }
  }
}
