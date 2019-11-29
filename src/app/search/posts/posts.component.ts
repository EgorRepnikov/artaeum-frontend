import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { UserService, User, Post, PostService, Principal } from '../../core'

@Component({
  selector: 'ae-search-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  currentUser: User
  posts: Post[]
  users = {}
  query: string
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
    const { pagingParams: { page } } = await this.activatedRoute.data.toPromise()
    this.page = page
    this.previousPage = page
    const params = await this.activatedRoute.parent.queryParams.toPromise()
    this.query = params['query']
    this.currentUser = await this.principal.identity()
    await this.loadAll()
  }

  async loadAll() {
    const res = await this.postService
      .search({
        page: this.page - 1,
        size: this.postsPerPage,
        query: this.query
      })
      .toPromise()
    this.posts = res.body
    this.totalItems = res.headers.get('X-Total-Count')
    this.loadUsers()
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

  async deletePost(id: number) {
    await this.postService.delete(id).toPromise()
    this.posts = this.posts.filter(p => p.id !== id)
  }

  private async loadUsers() {
    for (const s of this.posts) {
      if (!this.users[s.userId]) {
        const res = await this.userService.get(s.userId).toPromise()
        this.users[s.userId] = res.body
      }
    }
  }
}
