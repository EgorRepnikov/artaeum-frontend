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

  async ngOnInit() {
    const params = await this.route.queryParams.toPromise()
    try {
      await this.accountService.activate(params['key']).toPromise()
      this.isError = false
    } catch {
      this.isError = true
    }
  }
}
