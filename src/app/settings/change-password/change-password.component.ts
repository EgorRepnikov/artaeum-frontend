import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AccountService } from '../../core'

@Component({
  selector: 'ae-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

  title = 'Change password - Artaeum'

  form = new FormGroup({
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ])
  })

  constructor(private accountService: AccountService) {}

  async onSubmit() {
    await this.accountService.changePassword(this.form.value.password).toPromise()
    this.form.reset()
  }
}
