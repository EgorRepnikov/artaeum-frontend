import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import {
  User, Article,
  ArticleService, UserService,
  SmartButtonService, Principal,
  CategoryService, Category
} from '../core'

@Component({
  selector: 'ae-single-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

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

  async deleteArticle() {
    await this.articleService.delete(this.article._id).toPromise()
    this.router.navigate(['/'])
  }

  private async checkUserAndInitSmartButton() {
    this.currentUser = await this.principal.identity()
    if (this.currentUser && this.article.userId === this.currentUser.id) {
      this.smartButtonService.add({
        className: 'fa fa-edit',
        link: `author/article/${this.article._id}`,
        title: 'Edit'
      })
    }
  }
}
