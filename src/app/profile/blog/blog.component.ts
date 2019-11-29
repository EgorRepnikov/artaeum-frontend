import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import {
  User,
  UserService,
  Principal,
  SmartButtonService,
  Category,
  CategoryService
} from '../../core'

@Component({
  selector: 'ae-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {

  user: User
  categories: Category[]

  constructor(
    private smartButtonService: SmartButtonService,
    private userService: UserService,
    private categoryService: CategoryService,
    private principal: Principal,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const { params } = this.route.parent.snapshot
    const res = await this.userService.get(params['login']).toPromise()
    this.user = res.body
    const categoriesRes = await this.categoryService.getAll(res.body.id).toPromise()
    this.categories = categoriesRes.body
    const user = await this.principal.identity()
    if (user && params['login'] === user.login) {
      this.smartButtonService.add({
        className: 'fa fa-pencil',
        link: 'author/articles',
        title: 'Create article'
      })
    }
  }
}
