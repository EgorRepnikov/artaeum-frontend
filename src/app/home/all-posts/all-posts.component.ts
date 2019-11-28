import { Component, OnInit } from '@angular/core'
import { environment as env } from '../../../environments/environment'

import { User, Post, PostService, UserService, Principal } from '../../core'

@Component({
  selector: 'ae-all-posts',
  templateUrl: './all-posts.component.html'
})
export class AllPostsComponent implements OnInit {

  title = 'Last posts - Artaeum'

  currentUser: User
  posts: Post[] = []
  users: User[] = []
  page = 0
  totalItems = 0

  constructor(
    private principal: Principal,
    private postService: PostService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    await this.loadPosts()
  }

  async loadPosts() {
    const res = await this.postService.query({
      page: this.page++,
      size: env.POSTS_PER_PAGE
    }).toPromise()
    this.posts = this.posts.concat(res.body)
    this.totalItems = +res.headers.get('X-Total-Count')
    this.loadUsers()
  }

  async deletePost(id: number) {
    await this.postService.delete(id).toPromise()
    this.posts = this.posts.filter(p => p.id !== id)
  }

  private loadUsers() {
    this.posts.forEach(async s => {
      if (!this.users[s.userId]) {
        const res = await this.userService.get(s.userId).toPromise()
        this.users[s.userId] = res.body
      }
    })
  }
}
