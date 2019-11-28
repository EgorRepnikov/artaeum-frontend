import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import {
  User,
  Subscription,
  UserService,
  SubscriptionService,
  Principal,
  SmartButtonService
} from '../core'

@Component({
  selector: 'ae-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Artaeum'

  currentUser: User
  user: User
  subscription: Subscription

  constructor(
    private smartButtonService: SmartButtonService,
    private principal: Principal,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.smartButtonService.add({
      className: 'fa fa-tachometer',
      link: 'author',
      title: 'Dashboard'
    })
    const params = await this.activedRoute.params.toPromise()
    try {
      const res = await this.userService.get(params['login']).toPromise()
      this.user = res.body
      this.title = `@${res.body.login} - Artaeum`
      this.currentUser = await this.principal.identity()
      if (this.currentUser && this.user.id !== this.currentUser.id) {
        this.loadSubscription()
      }
    } catch {
      this.router.navigate(['/404'])
    }
  }

  async subscribe() {
    await this.subscriptionService.subscribe(this.user.id).toPromise()
    await this.loadSubscription()
  }

  async unsubscribe() {
    await this.subscriptionService.unsubscribe(this.user.id).toPromise()
    await this.loadSubscription()
  }

  private async loadSubscription() {
    if (this.currentUser) {
      const res = await this.subscriptionService
        .query({
          profileId: this.user.id,
          subscriberId: this.currentUser.id
        })
        .toPromise()
      this.subscription = res.body[0]
    }
  }
}
