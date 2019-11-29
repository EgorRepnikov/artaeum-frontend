import { Component } from '@angular/core'

import { AccountService } from '../../../core'

@Component({
  selector: 'ae-password-reset-init',
  templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent {

  title = 'Password reset - Artaeum'

  error = false
  success = false
  resetAccount: any = {}

  constructor(private accountService: AccountService) {}

  async submit() {
    try {
      await this.accountService.initReset(this.resetAccount.email)
      this.success = true
    } catch {
      this.error = true
    }
  }
}
