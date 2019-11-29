import { Component, OnInit } from '@angular/core'

import { CategoryService, Principal, Category, User } from '../../core'

@Component({
  selector: 'ae-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  currentUser: User
  categories: Category[]

  updateCandidate: Category
  deleteCandidate: Category

  constructor(
    private categoryService: CategoryService,
    private principal: Principal
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    this.loadAll()
  }

  async createCategory(name: string) {
    const category = new Category()
    category.name = name
    await this.categoryService.create(category).toPromise()
    await this.loadAll()
  }

  async updateCategory(name: string) {
    this.updateCandidate.name = name
    await this.categoryService.update(this.updateCandidate).toPromise()
    await this.loadAll()
  }

  async deleteCategory() {
    await this.categoryService.delete(this.deleteCandidate._id).toPromise()
    await this.loadAll()
  }

  setUpdateCandidate() {
    this.updateCandidate = new Category()
  }

  setDeleteCandidate(category: Category) {
    this.deleteCandidate = category
  }

  private async loadAll() {
    const { body } = await this.categoryService
      .getAll(this.currentUser.id)
      .toPromise()
    this.categories = body
  }
}
