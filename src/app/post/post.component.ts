import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { User, Post, PostService, UserService, Principal } from '../core'

@Component({
  selector: 'ae-single-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  title = 'Artaeum'

  currentUser: User
  post: Post
  author: User

  constructor(
    private principal: Principal,
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
    const { params } = this.route.snapshot
    try {
      const { body } = await this.postService.get(params['id']).toPromise()
      this.post = body
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
    const { body } = await this.userService.get(this.post.userId).toPromise()
    this.author = body
    this.title = `@${body.login}'s post - Artaeum`
  }
}
