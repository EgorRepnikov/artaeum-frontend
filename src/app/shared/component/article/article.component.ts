import { Component, Input, OnInit } from '@angular/core'

import { User, Article, Category, CategoryService } from '../../../core'

@Component({
  selector: 'ae-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article
  @Input() author: User
  @Input() currentUser: User

  category: Category

  constructor(private categoryService: CategoryService) {}

  async ngOnInit() {
    if (this.article.category) {
      const { body } = await this.categoryService
        .get(this.article.category)
        .toPromise()
      this.category = body
    }
  }
}