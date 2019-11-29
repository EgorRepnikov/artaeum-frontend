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
    const { queryParams } = this.route.snapshot.queryParams
    try {
      await this.accountService.activate(queryParams['key']).toPromise()
      this.isError = false
    } catch {
      this.isError = true
    }
  }
}
