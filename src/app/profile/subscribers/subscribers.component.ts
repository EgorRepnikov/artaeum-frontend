import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { UserService, User, SubscriptionService, Subscription } from '../../core'

@Component({
  selector: 'ae-subscribers',
  templateUrl: './subscribers.component.html'
})
export class SubscribersComponent implements OnInit {

  currentUser: User
  user: User
  subscriptions: Subscription[]
  subscribers: User[] = []
  page: any
  previousPage: any
  totalItems: any
  postsPerPage: number

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const { params } = this.route.parent.snapshot
    const { body } = await this.subscriptionService
      .query({ profileId: params['login'] })
      .toPromise()
    this.subscriptions = body
    this.loadUsers(body)
  }

  private async loadUsers(subs: Subscription[]) {
    for (const s of subs) {
      const { body } = await this.userService.get(s.subscriberId).toPromise()
      this.subscribers.push(body)
    }
  }
}
