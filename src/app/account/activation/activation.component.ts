import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { AccountService } from '../../core'

@Component({
  selector: 'ae-activation',
  templateUrl: './activation.component.html'
})
export class ActivationComponent implements OnInit {

  title = 'Account activation - Artaeum'

  isError: boolean

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accountService.activate(params['key']).subscribe(
        () => this.isError = false,
        () => this.isError = true
      )
    })
  }
}
