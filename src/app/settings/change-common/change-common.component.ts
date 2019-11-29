import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Principal, AccountService } from '../../core'

@Component({
  selector: 'ae-change-common',
  templateUrl: './change-common.component.html'
})
export class ChangeCommonComponent implements OnInit {

  title = 'Common settings - Artaeum'

  form = new FormGroup({
    'login': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[_\'.@A-Za-z0-9-]*$')
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    'firstName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    'lastName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    'langKey': new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private principal: Principal,
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    const user = await this.principal.identity()
    this.form.setValue({
      'login': user.login,
      'email': user.email,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'langKey': user.langKey
    })
  }

  async onSubmit() {
    await this.accountService.save(this.form.value).toPromise()
  }
}
