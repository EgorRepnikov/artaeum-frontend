import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { AccountService } from '../../../core'

@Component({
  selector: 'ae-password-reset-finish',
  templateUrl: './password-reset-finish.component.html'
})
export class PasswordResetFinishComponent implements OnInit {

  title = 'Password reset - Artaeum'

  error = false
  success = false
  keyMissing: boolean
  resetAccount: any = {}
  key: string

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const { queryParams } = this.route.snapshot
    this.key = queryParams['key']
    this.keyMissing = !this.key
  }

  async submit() {
    try {
      await this.accountService.save({
        resetKey: this.key,
        password: this.resetAccount.password
      })
      this.success = true
    } catch {
      this.error = true
    }
  }
}
