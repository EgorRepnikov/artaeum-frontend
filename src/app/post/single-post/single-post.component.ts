import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { User, Post, PostService, UserService, Principal } from '../../core'

@Component({
  selector: 'ae-single-post',
  templateUrl: './single-post.component.html'
})
export class SinglePostComponent implements OnInit {

  title = 'Artaeum'

  currentUser: User
  post: Post
  author: User

  constructor(
    private principal: Principal,
    private postService: PostService,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    const params = await this.activedRoute.params
    try {
      const postRes = await this.postService.get(params['id']).toPromise()
      this.post = postRes.body
      this.loadAuthorAndSetTitle()
    } catch {
      this.router.navigate(['/404'])
    }
  }

  async deletePost(id: number) {
    await this.postService.delete(id).toPromise()
    this.router.navigate(['/u', this.currentUser.login])
  }

  private async loadAuthorAndSetTitle() {
    const res = await this.userService.get(this.post.userId).toPromise()
    this.author = res.body
    this.title = `@${res.body.login}'s post - Artaeum`
  }
}
