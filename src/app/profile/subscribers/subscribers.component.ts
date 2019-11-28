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
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const params = await this.activatedRoute.parent.params.toPromise()
    const { body } = await this.subscriptionService
      .query({ profileId: params['login'] })
      .toPromise()
    this.subscriptions = body
    this.loadUsers(body)
  }

  private loadUsers(subs: Subscription[]) {
    subs.forEach(async s => {
      const { body } = await this.userService.get(s.subscriberId).toPromise()
      this.subscribers.push(body)
    })
  }
}
