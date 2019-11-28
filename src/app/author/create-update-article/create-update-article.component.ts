import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'
import { environment as env} from '../../../environments/environment'

import {
  ArticleService,
  Article,
  CategoryService,
  Category,
  Principal
} from '../../core'

@Component({
  selector: 'ae-create-update-article',
  templateUrl: './create-update-article.component.html'
})
export class CreateUpdateArticleComponent implements OnInit {

  article: Article
  categories: Category[]
  toolbar = env.QUILL_TOOLBAR

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private principal: Principal
  ) {}

  async ngOnInit() {
    const params = await this.route.params.toPromise()
    const user = await this.principal.identity()
    if (params['id']) {
      const articleRes = await this.articleService.get(params['id']).toPromise()
      if (user.id !== articleRes.body.userId) {
        this.router.navigate(['/'])
      } else {
        this.article = articleRes.body
      }
    } else {
      this.article = new Article()
    }
    const categoriesRes = await this.categoryService.getAll(user.id).toPromise()
    this.categories = categoriesRes.body
  }

  setImage(image: string) {
    this.article.image = image
  }

  async onSave() {
    const res = await this.save()
    this.router.navigate(['/author/article', res.body._id])
  }

  private save(): Promise<HttpResponse<Article>> {
    const observable = this.article._id ?
      this.articleService.update(this.article) :
      this.articleService.create(this.article)
    return observable.toPromise()
  }
}
