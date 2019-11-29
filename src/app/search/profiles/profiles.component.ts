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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const { page } = await this.route.snapshot.data.pagingParams
    this.page = page
    this.previousPage = page
    const { queryParams } = await this.route.parent.snapshot.queryParams
    this.query = queryParams['query']
    await this.loadAll()
  }

  async loadAll() {
    const { body, headers } = await this.userService
      .search({
        page: this.page - 1,
        size: this.postsPerPage,
        query: this.query
      })
      .toPromise()
    this.users = body
    this.totalItems = headers.get('X-Total-Count')
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
