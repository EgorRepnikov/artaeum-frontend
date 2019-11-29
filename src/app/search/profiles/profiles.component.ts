import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User } from '../../core'

@Component({
  selector: 'ae-search-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  currentUser: User
  users: User[]
  query: string
  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const { pagingParams: { page } } = await this.activatedRoute.data.toPromise()
    this.page = page
    this.previousPage = page
    const params = await this.activatedRoute.parent.queryParams.toPromise()
    this.query = params['query']
    await this.loadAll()
  }

  async loadAll() {
    const res = await this.userService
      .search({
        page: this.page - 1,
        size: this.postsPerPage,
        query: this.query
      })
      .toPromise()
    this.users = res.body
    this.totalItems = res.headers.get('X-Total-Count')
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
}
