import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Post, PostService, Principal } from '../../core'

@Component({
  selector: 'ae-wall',
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {

  currentUser: User
  user: User
  posts: Post[]
  page: any
  previousPage: any
  totalItems: any
  postsPerPage = env.POSTS_PER_PAGE

  constructor(
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private principal: Principal
  ) {}

  async ngOnInit() {
    const data = await this.activatedRoute.data.toPromise()
    this.page = data.pagingParams.page
    this.previousPage = data.pagingParams.page
    const params = await this.activatedRoute.parent.params.toPromise()
    const userRes = await this.userService.get(params['login']).toPromise()
    this.user = userRes.body
    this.loadAll()
    this.currentUser = await this.principal.identity()
  }

  async loadAll() {
    const res = await this.postService
      .query({
        page: this.page - 1,
        size: this.postsPerPage,
        userId: this.user.id
      })
      .toPromise()
    this.posts = res.body
    this.totalItems = res.headers.get('X-Total-Count')
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page
      this.router.navigate(['/u', this.user.login], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage
        }
      })
      this.loadAll()
    }
  }

  async deletePost(id: number) {
    await this.postService.delete(id)
    this.posts = this.posts.filter(p => p.id !== id)
  }
}
